-- =============================================================
-- Migration 02 — 매칭 로직 (DB 트리거 기반, 원자적 처리)
-- 핵심: 상호 좋아요 감지 → 방 생성 → 이벤트 적재를 트랜잭션으로 묶어
--       동시성(race condition) 하에서도 방 중복 생성/이벤트 누락을 방지
-- =============================================================

-- ---------- 헬퍼: 이벤트 적재 ----------
create or replace function log_event(
  p_event_name text,
  p_user_id    uuid,
  p_group_id   uuid,
  p_session_id text,
  p_props      jsonb default '{}'
) returns void language sql as $$
  insert into events (event_name, user_id, group_id, session_id, props)
  values (p_event_name, p_user_id, p_group_id, coalesce(p_session_id,'system'), p_props);
$$;

-- ---------- 트리거 1: 좋아요 발송 시 이벤트 적재 ----------
create or replace function on_like_inserted()
returns trigger language plpgsql as $$
declare
  v_owner uuid;
begin
  select owner_id into v_owner from groups where id = NEW.from_group_id;
  -- 발송측: like_sent
  perform log_event('like_sent', v_owner, NEW.from_group_id, 'system',
                    jsonb_build_object('target_group_id', NEW.to_group_id, 'like_id', NEW.id));
  -- 수신측: like_received
  select owner_id into v_owner from groups where id = NEW.to_group_id;
  perform log_event('like_received', v_owner, NEW.to_group_id, 'system',
                    jsonb_build_object('from_group_id', NEW.from_group_id, 'like_id', NEW.id));
  return NEW;
end;
$$;

create trigger trg_like_inserted
  after insert on likes
  for each row execute function on_like_inserted();

-- ---------- 트리거 2: 좋아요 수락 시 → 상호 여부 확인 → 매칭 성사 ----------
create or replace function on_like_accepted()
returns trigger language plpgsql as $$
declare
  v_reverse   likes%rowtype;
  v_room_id   uuid;
  v_a uuid; v_b uuid;
  v_owner_a uuid; v_owner_b uuid;
  v_latency  numeric;
begin
  -- 상태가 pending → accepted 로 바뀐 경우에만 동작
  if NEW.status = 'accepted' and OLD.status = 'pending' then

    -- 응답 지연 이벤트 (방장 의사결정 속도 = 선행 지표)
    v_latency := extract(epoch from (now() - NEW.created_at)) * 1000;
    select owner_id into v_owner_a from groups where id = NEW.to_group_id;
    perform log_event('like_responded', v_owner_a, NEW.to_group_id, 'system',
              jsonb_build_object('like_id', NEW.id, 'decision','accepted','latency_ms', v_latency));

    -- 반대 방향 좋아요가 이미 'accepted' 인지 확인 (= 상호 수락)
    select * into v_reverse from likes
      where from_group_id = NEW.to_group_id
        and to_group_id   = NEW.from_group_id
        and status        = 'accepted'
      for update;   -- 동시성: 반대편 행을 잠가 중복 매칭 방지

    if found then
      -- 방 식별을 안정적으로: 항상 (작은 uuid, 큰 uuid) 순서로 저장 → 중복 방 원천 차단
      if NEW.from_group_id < NEW.to_group_id then
        v_a := NEW.from_group_id; v_b := NEW.to_group_id;
      else
        v_a := NEW.to_group_id;   v_b := NEW.from_group_id;
      end if;

      insert into match_rooms (group_a_id, group_b_id)
        values (v_a, v_b)
        on conflict (group_a_id, group_b_id) do nothing   -- 경쟁 상태 2차 방어
        returning id into v_room_id;

      if v_room_id is not null then
        update groups set status='matched' where id in (v_a, v_b);
        select owner_id into v_owner_a from groups where id = v_a;
        select owner_id into v_owner_b from groups where id = v_b;
        perform log_event('match_created', v_owner_a, v_a, 'system',
                  jsonb_build_object('room_id', v_room_id, 'counterpart_group_id', v_b));
        perform log_event('match_created', v_owner_b, v_b, 'system',
                  jsonb_build_object('room_id', v_room_id, 'counterpart_group_id', v_a));
      end if;
    end if;

  elsif NEW.status = 'rejected' and OLD.status = 'pending' then
    v_latency := extract(epoch from (now() - NEW.created_at)) * 1000;
    select owner_id into v_owner_a from groups where id = NEW.to_group_id;
    perform log_event('like_responded', v_owner_a, NEW.to_group_id, 'system',
              jsonb_build_object('like_id', NEW.id, 'decision','rejected','latency_ms', v_latency));
  end if;

  NEW.responded_at := now();
  return NEW;
end;
$$;

create trigger trg_like_accepted
  before update on likes
  for each row execute function on_like_accepted();

-- ---------- 트리거 3: 단톡 첫 메시지 → 이벤트 적재 ----------
create or replace function on_message_inserted()
returns trigger language plpgsql as $$
declare
  v_is_first boolean;
  v_matched_at timestamptz;
begin
  select count(*) = 1 into v_is_first from messages where room_id = NEW.room_id;
  if v_is_first then
    select matched_at into v_matched_at from match_rooms where id = NEW.room_id;
    perform log_event('room_first_message', NEW.sender_id, null, 'system',
              jsonb_build_object('room_id', NEW.room_id,
                'latency_from_match_ms', extract(epoch from (now()-v_matched_at))*1000));
  end if;
  return NEW;
end;
$$;

create trigger trg_message_inserted
  after insert on messages
  for each row execute function on_message_inserted();

-- ---------- 만남 인증 RPC (앱에서 호출) ----------
create or replace function confirm_meetup(p_room_id uuid, p_user_id uuid)
returns void language plpgsql as $$
begin
  update match_rooms set status='met', met_at=now()
    where id = p_room_id and status='active';
  perform log_event('meetup_confirmed', p_user_id, null, 'system',
            jsonb_build_object('room_id', p_room_id));
end;
$$;

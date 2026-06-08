-- =============================================================
-- 그룹 대 그룹 소개팅 — 데이터 모델 + 이벤트 트래킹 스키마
-- 설계 원칙: "측정을 먼저 설계한다"
--   - 모든 상태 변화는 events 테이블에 행동 로그로 남는다
--   - 비즈니스 테이블(정답 상태) + 이벤트 테이블(행동 이력)을 분리
--   - 퍼널: 그룹생성 → 노출 → 좋아요발송 → 상호수락(매칭) → 단톡활성 → 만남
-- =============================================================

-- ---------- 1. 유저 / 그룹 ----------

create table users (
  id            uuid primary key default gen_random_uuid(),
  nickname      text not null,
  gender        text not null check (gender in ('M','F')),
  birth_year    int  not null,
  region        text,
  created_at    timestamptz not null default now()
);

create table groups (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,                 -- 그룹명 (예: "강남직장인3인방")
  owner_id      uuid not null references users(id),  -- 방장 = 액션 결정권자
  gender        text not null check (gender in ('M','F')),  -- 그룹 성별(동성 그룹 가정)
  member_count  int  not null default 1,
  region        text,
  intro         text,
  status        text not null default 'recruiting'
                  check (status in ('recruiting','ready','matched','closed')),
  created_at    timestamptz not null default now()
);

-- 그룹 멤버 (방장 포함 N명)
create table group_members (
  group_id      uuid not null references groups(id),
  user_id       uuid not null references users(id),
  role          text not null default 'member' check (role in ('owner','member')),
  joined_at     timestamptz not null default now(),
  primary key (group_id, user_id)
);

-- ---------- 2. 매칭 (그룹 → 그룹 단위 액션) ----------

-- 한 그룹이 다른 그룹에게 보내는 "좋아요"(=매칭 제안)
-- 액션 주체는 from_group의 방장
create table likes (
  id            uuid primary key default gen_random_uuid(),
  from_group_id uuid not null references groups(id),
  to_group_id   uuid not null references groups(id),
  status        text not null default 'pending'
                  check (status in ('pending','accepted','rejected','expired')),
  created_at    timestamptz not null default now(),
  responded_at  timestamptz,
  unique (from_group_id, to_group_id)          -- 같은 그룹에 중복 좋아요 방지
);

-- 매칭 성사 단위 = 상호 수락된 두 그룹의 단톡방
create table match_rooms (
  id            uuid primary key default gen_random_uuid(),
  group_a_id    uuid not null references groups(id),
  group_b_id    uuid not null references groups(id),
  matched_at    timestamptz not null default now(),
  status        text not null default 'active'
                  check (status in ('active','met','ghosted','closed')),
  met_at        timestamptz,                   -- 실제 만남 인증 시각 (노쇼/성사 측정)
  unique (group_a_id, group_b_id)
);

create table messages (
  id            uuid primary key default gen_random_uuid(),
  room_id       uuid not null references match_rooms(id),
  sender_id     uuid not null references users(id),
  body          text not null,
  created_at    timestamptz not null default now()
);

-- ---------- 3. 이벤트 트래킹 (행동 로그의 단일 진실 원천) ----------
-- 제품 의사결정의 근거가 되는 모든 유저 행동을 여기 적재.
-- props(JSONB)로 이벤트별 가변 속성 수용 → 스키마 변경 없이 새 이벤트 추가 가능.

create table events (
  id            bigint generated always as identity primary key,
  event_name    text not null,                 -- 아래 'event catalog' 참고
  user_id       uuid references users(id),
  group_id      uuid references groups(id),
  session_id    text not null,                 -- 익명 세션 단위 퍼널 추적
  props         jsonb not null default '{}',
  created_at    timestamptz not null default now()
);

create index idx_events_name_time on events (event_name, created_at);
create index idx_events_session   on events (session_id, created_at);
create index idx_events_props_gin on events using gin (props);

-- =============================================================
-- EVENT CATALOG (찍어야 할 핵심 이벤트 — 퍼널 순서대로)
-- -------------------------------------------------------------
--  group_created        그룹 생성             props: {member_count, region}
--  group_listed         탐색 목록에 노출됨     props: {position, list_session}
--  group_profile_viewed 상대 그룹 상세 조회    props: {target_group_id, dwell_ms}
--  like_sent            좋아요 발송           props: {target_group_id}
--  like_received        좋아요 수신(상대측)    props: {from_group_id}
--  like_responded       수락/거절 응답        props: {like_id, decision, latency_ms}
--  match_created        상호수락→매칭 성사     props: {room_id, counterpart_group_id}
--  room_first_message   단톡 첫 메시지        props: {room_id, latency_from_match_ms}
--  meetup_confirmed     실제 만남 인증        props: {room_id}
--  room_ghosted         매칭 후 무응답/노쇼    props: {room_id, last_activity_at}
-- =============================================================

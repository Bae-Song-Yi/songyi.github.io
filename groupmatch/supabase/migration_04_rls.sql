-- =============================================================
-- Migration 04 — RLS (Row Level Security)
-- 목적: 익명 신청은 허용하되, 신청자 목록(카톡 ID 포함)은 아무도 못 읽게.
--       이벤트는 적재만 허용.
-- Supabase SQL Editor에서 실행.
-- =============================================================

-- ---------- applicants: insert만 허용, select/update/delete 차단 ----------
alter table applicants enable row level security;

-- 익명 사용자(anon)가 신청서를 넣는 것만 허용
create policy "anyone can apply"
  on applicants for insert
  to anon
  with check (true);

-- (select 정책을 만들지 않음 = anon은 읽기 불가)
-- 운영자는 Supabase 대시보드(service_role)로 보면 됨 → RLS 우회되므로 조회 가능

-- ---------- events: insert만 허용 ----------
alter table events enable row level security;

create policy "anyone can log events"
  on events for insert
  to anon
  with check (true);

-- ---------- log_event RPC가 RLS 아래서도 동작하도록 ----------
-- log_event는 SECURITY DEFINER로 만들어 호출자 권한과 무관하게 insert 가능하게 함
create or replace function log_event(
  p_event_name text,
  p_user_id    uuid,
  p_group_id   uuid,
  p_session_id text,
  p_props      jsonb default '{}'
) returns void
language sql
security definer            -- ← 함수 소유자 권한으로 실행 (RLS 우회)
set search_path = public
as $$
  insert into events (event_name, user_id, group_id, session_id, props)
  values (p_event_name, p_user_id, p_group_id, coalesce(p_session_id,'system'), p_props);
$$;

-- anon이 이 함수를 호출할 수 있도록 권한 부여
grant execute on function log_event(text, uuid, uuid, text, jsonb) to anon;

-- =============================================================
-- 확인 방법:
--  1) 폼에서 신청 → Supabase 대시보드 Table Editor에서 applicants에 행이 보이면 OK
--  2) 브라우저 콘솔에서 anon 키로 select 시도 → 빈 배열이 와야 정상 (= 못 읽음)
-- =============================================================

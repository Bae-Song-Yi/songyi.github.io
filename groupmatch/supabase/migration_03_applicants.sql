-- =============================================================
-- Migration 03 — 개인 신청 폼 (컨시어지 MVP 단계)
-- 개인이 신청 → 운영자가 그룹 구성 → 그룹 매칭 → 만남
-- =============================================================

create table applicants (
  id            uuid primary key default gen_random_uuid(),
  session_id    text not null,                 -- events 테이블과 조인 키
  gender        text not null check (gender in ('M','F')),
  birth_year    int  not null,
  region        text not null,
  job           text,
  meet_style    text,                          -- 술/카페/액티비티
  available     text,                          -- 가능 요일/시간대
  intro         text,
  kakao_id      text not null,
  wtp           text,                          -- 참가비 지불의사
  utm_source    text,
  variant       text,                          -- A/B 배정
  status        text not null default 'applied'
                  check (status in ('applied','group_proposed','group_accepted',
                                    'group_declined','matched','met','churned')),
  created_at    timestamptz not null default now()
);

-- 운영 단계 추적: status 변경마다 events에 수기/수동 기록해도 되고,
-- 아래 트리거로 자동 적재
create or replace function on_applicant_status_change()
returns trigger language plpgsql as $$
begin
  if NEW.status is distinct from OLD.status then
    perform log_event('applicant_status_changed', null, null, NEW.session_id,
      jsonb_build_object('applicant_id', NEW.id, 'from', OLD.status, 'to', NEW.status));
  end if;
  return NEW;
end;
$$;

create trigger trg_applicant_status
  before update on applicants
  for each row execute function on_applicant_status_change();

-- 핵심 운영 지표: 그룹 제안 수락률 (이 모델의 1번 가설)
-- select round(100.0 * count(*) filter (where status in ('group_accepted','matched','met'))
--        / nullif(count(*) filter (where status != 'applied'),0), 1) as group_accept_rate
-- from applicants;

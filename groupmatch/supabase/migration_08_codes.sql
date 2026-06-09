-- =============================================================
-- Migration 08 — 참가자 숫자코드
-- 신청 시 고유 숫자코드 발급 → 오프라인 자리 안내 / 대화주제 조회 키로 사용
-- =============================================================

alter table applicants add column if not exists code text;

-- 코드 중복 방지 (중복이면 폼이 재시도하도록 409 유발)
create unique index if not exists idx_applicants_code on applicants (code);

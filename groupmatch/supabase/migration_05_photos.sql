-- =============================================================
-- Migration 05 — 프로필 사진 첨부 (선택)
-- 신청자가 프로필 사진을 업로드 → Storage에 저장 → URL을 applicants에 기록
-- =============================================================

-- ---------- applicants에 사진 URL 컬럼 추가 ----------
alter table applicants add column if not exists photo_url text;

-- ---------- 사진 저장용 버킷 (공개 읽기) ----------
-- public=true: 파일 경로(UUID 기반)를 아는 경우에만 접근 → 목록 노출은 없음.
insert into storage.buckets (id, name, public)
values ('applicant-photos', 'applicant-photos', true)
on conflict (id) do nothing;

-- ---------- 익명(anon) 업로드만 허용 ----------
-- 읽기는 public 버킷이라 공개 URL로 가능, 목록/수정/삭제는 막음.
drop policy if exists "anon upload applicant photos" on storage.objects;
create policy "anon upload applicant photos"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'applicant-photos');

-- =============================================================
-- 확인:
--  폼에서 사진 첨부 후 제출 → Storage > applicant-photos 에 파일 생성,
--  applicants.photo_url 에 공개 URL 기록되면 정상.
-- =============================================================

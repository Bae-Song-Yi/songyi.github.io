# 두근 — 코드 기반 소개팅 + AI 대화주제 (MVP)

개인이 신청하면 **고유 숫자코드**를 받고, 오프라인 자리에서 그 코드로 상대와 마주 앉아,
앱에 코드를 입력하면 **AI가 두 사람 프로필 기반 대화주제**를 추천해 주는 서비스.

수요 검증 단계로, **신청 폼 + 행동 트래킹 + 코드 발급**부터 시작하고
AI 매칭은 신청이 쌓인 뒤 붙인다.

## 전체 플로우

```
1. 개인이 신청 폼 작성  →  2. 고유 숫자코드 발급(예: 4821) + DB 저장 + 슬랙 알림
3. (운영) AI/수동 매칭 랭킹 산정 → 자리 배치
4. 오프라인 카페 테이블에 코드 안내 → 사람들이 마주 앉음
5. 앱(topics)에서 두 코드 입력 → AI가 단계별 대화주제 추천
```

## 폴더 구조

```
.
├─ index.html        # 랜딩 + 신청 폼 (한 페이지, 폰 목업 안에서 대화형 스텝 작성)
├─ apply.html        # 신청 폼 단독 페이지 (스텝형)
├─ topics.html       # 코드 2개 입력 → AI 단계별 대화주제 추천
├─ mockup.html       # 매칭 플로우 인터랙티브 목업 (포폴 데모용)
├─ api.ts            # 프론트 API 레이어 (추후 확장용)
├─ metrics.md        # 지표 정의서 (북극성 + 퍼널 + SQL)
└─ supabase/
   ├─ schema.sql                    # 1. 기본 테이블(users/groups/likes/match_rooms/messages/events)
   ├─ migration_02_matching.sql     # 2. 매칭 트리거 + log_event
   ├─ migration_03_applicants.sql   # 3. 신청자(applicants) 테이블
   ├─ migration_04_rls.sql          # 4. 보안 정책(RLS) + anon insert 권한
   ├─ migration_05_photos.sql       # 5. 프로필 사진(photo_url + Storage 버킷/정책)
   ├─ migration_07_drop_phone.sql   # 7. 전화번호 컬럼 제거
   ├─ migration_08_codes.sql        # 8. 숫자코드(code) 컬럼 + 유니크 인덱스
   ├─ seed_demo.sql                 # 데모 신청자 10명
   ├─ reset_and_seed.sql            # 기존 데이터 전체 삭제 + 데모 10명
   └─ functions/
      ├─ notify-new-applicant/      # 새 신청 → 슬랙 알림 (Edge Function)
      └─ conversation-topics/       # 코드 2개 → Gemini 대화주제 (Edge Function)
```

## 디자인 / UX

- 핑크 로맨스(연애프로그램) 무드, **Pretendard** 폰트, 떠다니는 하트·펄스 애니메이션
- 랜딩에서 폰 목업이 1/3쯤 보이다가 **"신청 시작하기"** 누르면 위로 올라오며 그 안에서 작성
- **대화형(스택) 스텝**: 답하면 이전 질문은 위에 남고 다음 질문이 아래에 나타나며 포커스
- 작은 폰(아이폰 미니)·태블릿·데스크톱·가로모드까지 반응형 대응

## 셋업 순서

### 1. Supabase
1. supabase.com 에서 프로젝트 생성
2. SQL Editor에서 **순서대로** 실행:
   `schema.sql` → `migration_02` → `migration_03` → `migration_04` → `migration_05` → `migration_07` → `migration_08`
3. Edge Function(대화주제)이 신청자를 읽을 수 있도록 권한 부여:
   ```sql
   grant select on table applicants to service_role;
   ```
4. Project Settings > API 에서 **Project URL** 과 **publishable(anon) key** 확인

> 폼/페이지에는 이미 Project URL과 publishable key가 들어가 있다. 다른 프로젝트로 바꾸려면
> `index.html` / `apply.html` / `topics.html` 상단의 `SUPABASE_URL`, `SUPABASE_ANON_KEY` 교체.

### 2. 배포 (GitHub Pages)
- 레포 연결 후 Settings > Pages 에서 `main` / `(root)` 지정
- 정적 페이지라 빌드 설정 불필요
- 주소 예: `https://<user>.github.io/<repo>/groupmatch/`

### 3. 새 신청 슬랙 알림 (선택)
1. 슬랙 Incoming Webhook URL 생성
2. Supabase > Edge Functions > Secrets 에 `SLACK_WEBHOOK_URL` 등록
3. `notify-new-applicant` 함수 배포
4. Database > Webhooks: `applicants` INSERT → `notify-new-applicant` 연결

### 4. AI 대화주제 (선택)
1. Google AI Studio(aistudio.google.com/apikey)에서 **Gemini API 키** 발급
   - ⚠️ 무료 티어 할당량이 `limit: 0` 으로 나오면, 직접 만든 GCP 프로젝트가 아니라
     **AI Studio가 자동 생성한 프로젝트**로 키를 발급하거나 결제를 등록해야 한다.
2. Supabase Secrets 에 `GEMINI_API_KEY` 등록
3. `conversation-topics` 함수 배포 — **Verify JWT 끄기**(공개 페이지에서 호출)
4. `topics.html` 에서 코드 2개 입력해 테스트

### 5. 데모 데이터
- `seed_demo.sql` 또는 `reset_and_seed.sql` 실행 → 코드 10개 생성
- 코드: 1234, 5678, 4321, 8090, 2468, 1357, 7777, 3939, 6262, 5151
- 예) `1234 + 5678`(둘 다 홍대·카페) → 잘 맞는 대화주제

## 보안

- `applicants` 는 RLS로 **익명(anon) insert만 허용, select 차단** → 외부에서 신청자 명단 못 봄
- 대화주제 함수는 `service_role`로 프로필을 읽고, **카톡ID 등 식별정보는 AI에 보내지 않음**(취향만)
- 매칭 결과/신청자 조회는 관리자(Supabase 대시보드)만

## 채널별 링크 (UTM)

```
https://배포주소/groupmatch/?utm_source=everytime
https://배포주소/groupmatch/?utm_source=instagram
```
A/B 카피는 자동 랜덤 배정 (강제 시 `?v=A` 또는 `?v=B`).

## 분석

`metrics.md` 참고. 핵심:
- 문항별 생존율(어디서 이탈하는가) — `events` 의 `question_answered` / `form_abandoned`
- 채널별 제출 전환율 — `form_submitted`
- 코드 발급 수 — `code_issued`

## 운영 (현재 단계)

1. 신청 들어오면 슬랙 알림 수신
2. `applicants` 에서 지역·시간대·성별 보고 매칭 검토(수동 또는 추후 AI)
3. 오프라인 장소·시간 통보, 카페 자리에 코드 배치
4. 만난 두 사람은 `topics` 페이지에 코드 입력해 대화주제 받기

## 로드맵

- [x] 신청 폼 + 코드 발급 + Supabase 저장 + 슬랙 알림
- [x] 프로필 사진 첨부 / 개인정보 동의 / 행동 트래킹
- [x] AI 대화주제 추천 (Gemini)
- [ ] AI 매칭 랭킹(코드A↔코드B + 매칭율) + 관리자 조회 화면
- [ ] 신청자 자동 알림(알림톡/문자)

# 두근 — 그룹 소개팅 (컨시어지 MVP)

개인이 신청 → 운영자가 그룹 구성 → 그룹 대 그룹 매칭 → 만남.
수요 검증 단계로, 신청 폼 + 행동 트래킹부터 시작한다.

## 폴더 구조

```
.
├─ index.html              # 개인 신청 폼 (배포 대상, 트래킹 내장)
├─ mockup.html             # 매칭 플로우 인터랙티브 목업 (포폴 데모용)
├─ api.ts                  # 프론트 API 레이어 (추후 사이트 확장 시)
├─ metrics.md              # 지표 정의서 (북극성 + 퍼널 + SQL)
└─ supabase/
   ├─ schema.sql                  # 1. 기본 테이블
   ├─ migration_02_matching.sql   # 2. 매칭 트리거
   ├─ migration_03_applicants.sql # 3. 신청자 테이블
   └─ migration_04_rls.sql        # 4. 보안 정책 (필수)
```

## 셋업 순서

### 1. Supabase
1. supabase.com 에서 프로젝트 생성
2. SQL Editor에서 **순서대로** 실행 (순서 중요 — 04가 log_event 최종본):
   `schema.sql` → `migration_02` → `migration_03` → `migration_04`
3. Project Settings > API 에서 **Project URL** 과 **anon public key** 복사

### 2. 폼에 키 넣기
`index.html` 상단의 두 줄 교체:
```js
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = '여기에 anon key';
```

### 3. 배포 (Vercel)
- GitHub 레포 연결 후 자동 배포, 또는 폴더 드래그앤드롭
- 정적 페이지라 빌드 설정 불필요

### 4. 동작 확인
- 폼에서 테스트 신청 → Supabase Table Editor의 `applicants`에 행이 뜨면 OK
- 브라우저 콘솔에서 anon 키로 `applicants` select → 빈 배열이면 보안 정상

## 채널별 링크 (UTM)

배포 주소 뒤에 붙여서 유입 채널 비교:
```
https://배포주소/?utm_source=everytime
https://배포주소/?utm_source=instagram
https://배포주소/?utm_source=karrot
```
A/B 카피는 자동 랜덤 배정 (강제 시 `?v=A` 또는 `?v=B`).

## 분석 쿼리

`metrics.md` 참고. 핵심:
- 문항별 생존율 (어디서 이탈하는가)
- 채널별 제출 전환율
- 그룹 제안 수락률 (이 모델의 1번 가설)

## 운영 (수동 매칭)

1. `applicants`에서 같은 지역/시간대/성별 묶어 그룹 구성
2. 카톡으로 연락, 그룹 제안
3. 신청자 `status` 갱신: `applied` → `group_proposed` → `group_accepted` → `matched` → `met`
   (status 변경 시 이벤트 자동 적재 → 수락률 측정됨)

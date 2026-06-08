# 그룹 소개팅 — 지표 정의서 (Metrics Spec)

> 설계 원칙: **북극성 지표 1개 → 이를 떠받치는 퍼널 지표 → 진단 지표** 순으로 정의.
> 모든 지표는 `events` 테이블에서 SQL로 직접 산출 가능하도록 설계됨.

---

## 0. 북극성 지표 (North Star)

**주간 성사된 만남 수 (Weekly Confirmed Meetups)**

데이팅 서비스의 본질 가치는 "가입자 수"도 "매칭 수"도 아니라 **실제로 만났는가**다.
매칭만 늘리는 건 허영 지표(vanity metric)가 되기 쉬움 — 그래서 `meetup_confirmed`를 정점에 둠.

```sql
select date_trunc('week', created_at) as week,
       count(*) as confirmed_meetups
from events
where event_name = 'meetup_confirmed'
group by 1 order by 1;
```

---

## 1. 핵심 퍼널 (Activation Funnel)

각 단계 전환율 = 그룹 소개팅이 어디서 새는지 진단.

| 단계 | 이벤트 | 측정 질문 |
|---|---|---|
| 1. 그룹 형성 | `group_created` | 혼자 와서 그룹을 꾸리는가? |
| 2. 노출 | `group_listed` | 만들어진 그룹이 탐색에 노출되는가? |
| 3. 관심 | `group_profile_viewed` | 상대 그룹을 들여다보는가? |
| 4. 액션 | `like_sent` | 좋아요까지 가는가? |
| 5. 성사 | `match_created` | 상호 수락되는가? |
| 6. 대화 | `room_first_message` | 매칭이 대화로 이어지는가? |
| 7. 만남 | `meetup_confirmed` | 대화가 실제 만남이 되는가? |

```sql
-- 퍼널 단계별 도달 그룹 수 + 직전 단계 대비 전환율
with funnel as (
  select 'group_created'        as step, 1 as ord, count(distinct group_id) as n from events where event_name='group_created'
  union all select 'group_profile_viewed',2, count(distinct group_id) from events where event_name='group_profile_viewed'
  union all select 'like_sent',           3, count(distinct group_id) from events where event_name='like_sent'
  union all select 'match_created',        4, count(distinct group_id) from events where event_name='match_created'
  union all select 'room_first_message',   5, count(distinct group_id) from events where event_name='room_first_message'
  union all select 'meetup_confirmed',     6, count(distinct group_id) from events where event_name='meetup_confirmed'
)
select step, n,
       round(100.0 * n / lag(n) over (order by ord), 1) as step_conv_pct
from funnel order by ord;
```

---

## 2. 매칭 품질 지표

### 2-1. 좋아요 → 매칭 전환율
```sql
select round(100.0 * count(*) filter (where status='accepted') / nullif(count(*),0), 1) as accept_rate_pct
from likes;
```

### 2-2. 응답 지연 (방장이 좋아요에 응답하기까지)
긴 응답 지연 = 매칭 실패의 선행 지표. 푸시/리마인드 설계 근거가 됨.
```sql
select percentile_cont(0.5) within group (order by (props->>'latency_ms')::numeric)/1000/60 as median_minutes
from events where event_name='like_responded';
```

### 2-3. 노쇼/고스팅율 (매칭 후 만남으로 안 이어진 비율)
```sql
select round(100.0 * count(*) filter (where status='ghosted') / nullif(count(*),0), 1) as ghost_rate_pct
from match_rooms;
```

---

## 3. 진단 지표 (왜 새는지 파고들 때)

- **상세조회 체류시간 분포** (`dwell_ms`): 어떤 프로필이 오래 보게 만드나 → 프로필 항목 개선 근거
- **그룹 규모별 매칭율**: 2인 vs 3인 vs 4인 그룹 중 어디가 잘 매칭되나 → 권장 그룹 크기 결정
- **성비/지역별 노출 불균형**: 특정 세그먼트가 노출/매칭에서 소외되는가 → 추천 로직 개입 근거

```sql
-- 그룹 규모별 매칭 성사율 (제품 의사결정 직결 쿼리 예시)
select g.member_count,
       count(distinct g.id) as groups,
       count(distinct mr.id) as matched_rooms,
       round(100.0 * count(distinct mr.id) / nullif(count(distinct g.id),0), 1) as match_rate_pct
from groups g
left join match_rooms mr on mr.group_a_id = g.id or mr.group_b_id = g.id
group by g.member_count order by g.member_count;
```

---

## 4. 포폴 서사 연결

이 지표 체계가 증명하는 PE 역량:
1. **허영 지표를 거부** — 매칭 수가 아니라 만남 수를 북극성으로 (제품 판단력)
2. **측정을 설계에 내장** — 사후 분석이 아니라 이벤트 스키마 단계부터 (엔지니어링+제품 통합)
3. **지표 → 의사결정 루프** — 각 지표마다 "그래서 무슨 결정을 하나"가 붙어있음 (PE의 본질)

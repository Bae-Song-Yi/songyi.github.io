// =============================================================
// api.ts — 그룹 소개팅 프론트 API 레이어 (React + TypeScript)
// Supabase 클라이언트 래핑. 매칭/좋아요/이벤트를 타입 안전하게 호출.
// =============================================================
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// ---------- 타입 ----------
export type Group = {
  id: string;
  name: string;
  owner_id: string;
  gender: 'M' | 'F';
  member_count: number;
  region: string | null;
  intro: string | null;
  status: 'recruiting' | 'ready' | 'matched' | 'closed';
  created_at: string;
};

export type LikeDecision = 'accepted' | 'rejected';

// ---------- 탐색: 우리 그룹에 노출할 상대 그룹 목록 ----------
// 노출 이벤트(group_listed)를 함께 적재해 퍼널 1단계를 측정
export async function fetchCandidateGroups(myGroup: Group, sessionId: string) {
  const oppositeGender = myGroup.gender === 'M' ? 'F' : 'M';
  const { data, error } = await supabase
    .from('groups')
    .select('*')
    .eq('gender', oppositeGender)
    .eq('status', 'ready')
    .neq('id', myGroup.id)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;

  // 노출 이벤트 적재 (position 포함 → 노출 순서별 클릭률 분석 가능)
  await Promise.all(
    (data ?? []).map((g, i) =>
      logEvent('group_listed', myGroup.owner_id, myGroup.id, sessionId, {
        target_group_id: g.id,
        position: i,
        list_session: sessionId,
      })
    )
  );
  return data as Group[];
}

// ---------- 상세 조회 (체류시간 측정) ----------
export async function viewGroupProfile(
  myGroup: Group, targetGroupId: string, dwellMs: number, sessionId: string
) {
  await logEvent('group_profile_viewed', myGroup.owner_id, myGroup.id, sessionId, {
    target_group_id: targetGroupId,
    dwell_ms: dwellMs,
  });
}

// ---------- 좋아요 발송 (트리거가 like_sent/like_received 자동 적재) ----------
export async function sendLike(fromGroupId: string, toGroupId: string) {
  const { data, error } = await supabase
    .from('likes')
    .insert({ from_group_id: fromGroupId, to_group_id: toGroupId })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------- 좋아요 응답 (수락 시 트리거가 상호여부 판정 → 매칭 생성) ----------
export async function respondToLike(likeId: string, decision: LikeDecision) {
  const { data, error } = await supabase
    .from('likes')
    .update({ status: decision })
    .eq('id', likeId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ---------- 매칭 실시간 구독 (방장이 매칭 성사를 즉시 알림받음) ----------
export function subscribeToMatches(myGroupId: string, onMatch: (roomId: string) => void) {
  return supabase
    .channel(`matches:${myGroupId}`)
    .on('postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'match_rooms' },
      (payload) => {
        const r = payload.new as { id: string; group_a_id: string; group_b_id: string };
        if (r.group_a_id === myGroupId || r.group_b_id === myGroupId) onMatch(r.id);
      })
    .subscribe();
}

// ---------- 만남 인증 ----------
export async function confirmMeetup(roomId: string, userId: string) {
  const { error } = await supabase.rpc('confirm_meetup', {
    p_room_id: roomId, p_user_id: userId,
  });
  if (error) throw error;
}

// ---------- 이벤트 적재 ----------
export async function logEvent(
  eventName: string, userId: string | null, groupId: string | null,
  sessionId: string, props: Record<string, unknown> = {}
) {
  await supabase.rpc('log_event', {
    p_event_name: eventName, p_user_id: userId, p_group_id: groupId,
    p_session_id: sessionId, p_props: props,
  });
}

export { supabase };

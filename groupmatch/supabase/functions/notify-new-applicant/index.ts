// =============================================================
// Edge Function: notify-new-applicant
// applicants 테이블에 새 신청이 들어오면(Database Webhook) 슬랙으로 알림 발송.
//
// 필요한 secret (Supabase > Edge Functions > Secrets 에 등록):
//   SLACK_WEBHOOK_URL  — 슬랙 Incoming Webhook URL
// =============================================================

const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL") ?? "";

const GENDER: Record<string, string> = { M: "남성", F: "여성" };

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const r = payload?.record ?? {};

    const lines = [
      "🔔 *새 신청이 들어왔어요!*",
      "",
      `• 성별: ${GENDER[r.gender] ?? "-"}`,
      `• 출생연도: ${r.birth_year ?? "-"}`,
      `• 지역: ${r.region ?? "-"}`,
      `• 직업: ${r.job ?? "-"}`,
      `• 만남 스타일: ${r.meet_style ?? "-"}`,
      `• 가능 시간: ${r.available ?? "-"}`,
      `• 참가비 의향: ${r.wtp ?? "-"}`,
      `• 소개: ${r.intro ?? "-"}`,
      `• 카톡ID: ${r.kakao_id ?? "-"}`,
      `• 전화번호: ${r.phone ?? "-"}`,
      `• 유입: ${r.utm_source ?? "-"} / 카피 ${r.variant ?? "-"}`,
      r.photo_url ? `• 사진: ${r.photo_url}` : null,
    ].filter(Boolean).join("\n");

    const res = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: lines }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("slack error:", detail);
      return new Response(JSON.stringify({ ok: false, detail }), { status: 500 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false, error: String(e) }), { status: 500 });
  }
});

// =============================================================
// Edge Function: conversation-topics  (Gemini 버전)
// 두 참가자의 숫자코드를 받아 → 프로필 조회 → Gemini로 단계별 대화주제 생성.
//
// 필요한 secret (Supabase > Edge Functions > Secrets):
//   GEMINI_API_KEY  — Google AI Studio 무료 API 키
// (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 는 자동 주입)
//
// 배포 시 JWT 검증 끄기 (공개 페이지에서 호출):
//   supabase functions deploy conversation-topics --no-verify-jwt
//
// ※ 개인정보 보호: 이름/카톡ID/연락처는 AI에 보내지 않음 (취향 정보만).
// =============================================================

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const MODEL = "gemini-2.0-flash";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });

const GENDER: Record<string, string> = { M: "남성", F: "여성" };

function profileText(p: any): string {
  return [
    `성별: ${GENDER[p.gender] ?? "-"}`,
    `출생연도: ${p.birth_year ?? "-"}`,
    `지역: ${p.region ?? "-"}`,
    `직업: ${p.job ?? "-"}`,
    `만남 선호: ${p.meet_style ?? "-"}`,
    `가능 시간: ${p.available ?? "-"}`,
    `자기소개: ${p.intro ?? "-"}`,
  ].join(", ");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const { code_a, code_b } = await req.json();
    if (!code_a || !code_b) return json({ ok: false, error: "두 코드를 모두 입력해 주세요." }, 400);

    // 서비스 롤로 두 프로필 조회 (RLS 우회) — 식별정보(카톡ID 등)는 select에서 제외
    const url = `${SUPABASE_URL}/rest/v1/applicants?code=in.(${encodeURIComponent(code_a)},${encodeURIComponent(code_b)})` +
      `&select=code,gender,birth_year,region,job,meet_style,available,intro`;
    const r = await fetch(url, { headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` } });
    const rows = await r.json();
    if (!Array.isArray(rows) || rows.length < 2) {
      return json({ ok: false, error: "코드에 해당하는 참가자를 찾지 못했어요. 코드를 확인해 주세요." }, 404);
    }
    const a = rows.find((x: any) => String(x.code) === String(code_a));
    const b = rows.find((x: any) => String(x.code) === String(code_b));
    if (!a || !b) return json({ ok: false, error: "코드를 확인해 주세요." }, 404);

    const prompt =
      `너는 오프라인 소개팅 자리의 다정한 진행 도우미야. 처음 만난 두 사람이 어색하지 않게 ` +
      `대화를 이어갈 수 있도록, 두 사람의 프로필을 바탕으로 "단계별" 대화 주제를 추천해줘.\n\n` +
      `참가자 A — ${profileText(a)}\n참가자 B — ${profileText(b)}\n\n` +
      `아래 JSON 형식으로만 답해:\n` +
      `{"summary":"두 사람의 공통점이나 잘 맞을 포인트 한 줄(따뜻한 말투)",` +
      `"stages":[` +
      `{"title":"1단계 · 가볍게 시작","topics":["질문1","질문2","질문3"]},` +
      `{"title":"2단계 · 취향과 일상","topics":["...","...","..."]},` +
      `{"title":"3단계 · 가치관과 진솔한 이야기","topics":["...","...","..."]}` +
      `]}\n` +
      `각 topic은 실제로 입 밖에 꺼내기 좋은 구체적인 한국어 질문 문장으로. 두 사람의 공통 관심사를 적극 활용해줘.`;

    const gr = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.85, responseMimeType: "application/json" },
        }),
      },
    );
    if (!gr.ok) {
      const detail = await gr.text();
      console.error("gemini error:", detail);
      return json({ ok: false, error: "AI 호출에 실패했어요.", detail }, 500);
    }
    const data = await gr.json();
    let text = (data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();
    text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let parsed: any;
    try { parsed = JSON.parse(text); }
    catch { return json({ ok: false, error: "AI 응답 파싱 실패", raw: text }, 500); }

    return json({ ok: true, ...parsed });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});

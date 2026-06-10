// =============================================================
// Edge Function: faq-chat
// 신청 폼 챗봇 — 사용자의 자유 질문을 Gemini가 서비스 안내 기반으로 답변.
//
// 필요한 secret: GEMINI_API_KEY
// 배포 시 Verify JWT 끄기 (공개 페이지에서 호출).
// =============================================================

const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") ?? "";
const MODEL = "gemini-2.5-flash";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });

const SYSTEM = `너는 '두근' 그룹 소개팅 서비스의 친절하고 다정한 안내 챗봇이야.
아래 정보를 바탕으로 사용자의 질문에 짧고 따뜻하게 한국어로 답해(2~4문장).
정보에 없는 내용은 지어내지 말고 "정확한 건 운영팀에 문의해 주세요 🙏"라고 안내해.

[두근 서비스 정보]
- 혼자 신청해도 AI가 잘 맞는 사람을 찾아 오프라인 소개팅을 잡아주는 서비스예요. 혼자 신청해도 전혀 문제없어요.
- 신청하면 고유 숫자코드를 받아요. 소개팅 당일 그 코드로 자리를 찾고, 코드를 입력하면 AI 대화주제도 받을 수 있어요.
- 참가비: 매칭이 성사되면 1만원이에요. 신청 단계에선 지불 의향만 물어봐요(부담 없이 솔직하게).
- 매칭: 지역·활동 시간대·만남 취향을 바탕으로 잘 맞는 상대를 연결해요.
- 개인정보: 신청 정보는 매칭과 연락에만 사용하고, 신청자 명단은 외부에 공개되지 않아요. 요청 시 즉시 파기해요.
- 연락 방법: 매칭되면 입력한 카카오톡 ID로 안내드려요. 보통 신청 후 며칠 내 연락해요.
- 신청은 폼을 끝까지 작성하면 완료돼요. 프로필 사진은 선택이에요.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const { message } = await req.json();
    if (!message || !String(message).trim()) return json({ ok: false, error: "메시지를 입력해 주세요." }, 400);

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents: [{ role: "user", parts: [{ text: String(message).slice(0, 500) }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 400 },
        }),
      },
    );
    if (!r.ok) {
      const detail = await r.text();
      console.error("gemini error", r.status, detail);
      return json({ ok: false, error: "지금은 답변이 어려워요. 잠시 후 다시 시도해 주세요.", detail: detail.slice(0, 300) }, 500);
    }
    const data = await r.json();
    const text = (data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "").trim();
    return json({ ok: true, reply: text || "잘 이해하지 못했어요. 다시 한 번 물어봐 주세요 🙏" });
  } catch (e) {
    console.error(e);
    return json({ ok: false, error: String(e) }, 500);
  }
});

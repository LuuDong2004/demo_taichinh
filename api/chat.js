// POST /api/chat – trợ lý Moni Yo dùng Claude.
// Body: { messages: [{ role: 'user' | 'assistant', content: string }] } (tin cuối là của khách)
// Chưa có ANTHROPIC_API_KEY → 503 { error: 'AI_OFF' }, trang web tự dùng câu trả lời có sẵn.
import Anthropic from '@anthropic-ai/sdk';
import { fail, handler, readJson, send } from './_lib/http.js';
import { SYSTEM_PROMPT } from './_lib/knowledge.js';

const MODEL = 'claude-opus-5-5';
const MAX_TURNS = 12; // chỉ gửi 12 tin gần nhất
const MAX_CHARS = 1200; // mỗi tin của khách

let client = null;
const getClient = () => (client ??= new Anthropic());

// Giới hạn đơn giản theo IP trong một phiên chạy (Vercel có thể chạy nhiều bản, nên đây chỉ là chặn cơ bản)
const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 5 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 30;
}

function readMessages(body) {
  const raw = Array.isArray(body?.messages) ? body.messages.slice(-MAX_TURNS) : [];
  const msgs = raw
    .filter(m => (m?.role === 'user' || m?.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .map(m => ({ role: m.role, content: m.content.trim().slice(0, m.role === 'user' ? MAX_CHARS : 3000) }));
  while (msgs.length && msgs[0].role !== 'user') msgs.shift(); // tin đầu phải là của khách
  return msgs.length && msgs.at(-1).role === 'user' ? msgs : null;
}

export default handler({
  async POST(req, res) {
    if (!process.env.ANTHROPIC_API_KEY) return fail(res, 503, 'AI_OFF');
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
    if (tooMany(ip)) return fail(res, 429, 'Bạn hỏi nhanh quá, đợi một chút rồi hỏi tiếp nhé');
    const messages = readMessages(await readJson(req));
    if (!messages) return fail(res, 400, 'Thiếu câu hỏi');

    let response;
    try {
      response = await getClient().beta.messages.create({
        model: MODEL,
        max_tokens: 4000,
        // Hỏi đáp ngắn → effort thấp cho nhanh và rẻ; thinking để mặc định (adaptive)
        output_config: { effort: 'low' },
        // Model từ chối vì bộ lọc an toàn → máy chủ Anthropic tự chạy lại bằng model dự phòng
        betas: ['server-side-fallback-2026-07-01'],
        fallbacks: 'default',
        // Phần hướng dẫn + kiến thức cố định → cache, các lượt sau rẻ và nhanh hơn
        system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
        messages,
      });
    } catch (e) {
      if (e instanceof Anthropic.RateLimitError) return fail(res, 503, 'Trợ lý đang bận, bạn thử lại sau ít phút nhé');
      if (e instanceof Anthropic.AuthenticationError) { console.error('[chat] sai ANTHROPIC_API_KEY'); return fail(res, 503, 'AI_OFF'); }
      if (e instanceof Anthropic.APIError) { console.error('[chat] API', e.status, e.message); return fail(res, 502, 'Trợ lý đang gặp sự cố, bạn thử lại nhé'); }
      throw e;
    }

    if (response.stop_reason === 'refusal') {
      return send(res, 200, { reply: 'Câu này mình không trả lời được. Bạn có thể hỏi mình về Moni Yo hoặc cách dạy con về tiền nhé.' });
    }
    const reply = response.content.filter(b => b.type === 'text').map(b => b.text).join('').trim();
    const u = response.usage;
    console.log(`[chat] in=${u.input_tokens} cache_read=${u.cache_read_input_tokens ?? 0} cache_write=${u.cache_creation_input_tokens ?? 0} out=${u.output_tokens}`);
    send(res, 200, { reply: reply || 'Mình chưa hiểu câu hỏi, bạn nói rõ hơn giúp mình nhé.' });
  },
});

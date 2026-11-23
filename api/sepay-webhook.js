// POST /api/sepay-webhook – SePay gọi khi tài khoản nhận tiền có giao dịch.
// Theo tài liệu SePay (https://developer.sepay.vn/vi/sepay-webhooks/tich-hop-webhook):
// - Xác thực kiểu API Key: header "Authorization: Apikey <SEPAY_API_KEY>"
// - Phải trả HTTP 200 kèm đúng {"success": true}, nếu không SePay ghi là thất bại
// - Chống trùng theo trường "id" (SePay gửi lại vẫn giữ nguyên id)
import { query } from './_lib/db.js';
import { fail, handler, readJson, safeEqual, send } from './_lib/http.js';
import { findOrderCode } from './_lib/shop.js';

function authorized(req) {
  const key = process.env.SEPAY_API_KEY;
  if (!key) return false;
  const h = req.headers.authorization || '';
  return h.startsWith('Apikey ') && safeEqual(h.slice(7).trim(), key);
}

export default handler({
  async POST(req, res) {
    if (!authorized(req)) return fail(res, 401, 'Unauthorized');
    const t = await readJson(req);
    const sepayId = Number(t.id);
    const amount = Number(t.transferAmount);
    if (!Number.isSafeInteger(sepayId) || !Number.isFinite(amount)) return fail(res, 400, 'Thiếu id hoặc transferAmount');

    const isIn = t.transferType === 'in';
    const orderCode = isIn ? findOrderCode(t.code, t.content, t.description) : null;

    // Một câu lệnh: lưu giao dịch (bỏ qua nếu id đã có) và cộng tiền vào đơn khớp mã.
    // Chỉ cộng khi giao dịch vừa được thêm mới → SePay gửi lại không bị cộng lần hai.
    const rows = await query(
      `WITH p AS (
         INSERT INTO payments (sepay_id, order_code, gateway, account_number, transfer_type, amount, content, reference_code, transaction_date, raw)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb)
         ON CONFLICT (sepay_id) DO NOTHING
         RETURNING order_code, amount, transfer_type
       )
       UPDATE orders o SET
         paid_amount = o.paid_amount + p.amount,
         payment_status = CASE WHEN o.paid_amount + p.amount >= o.total THEN 'paid' ELSE 'partial' END,
         paid_at = CASE WHEN o.paid_amount + p.amount >= o.total THEN now() ELSE o.paid_at END,
         status = CASE WHEN o.status = 'pending' AND o.paid_amount + p.amount >= o.total THEN 'confirmed' ELSE o.status END,
         updated_at = now()
       FROM p
       WHERE p.transfer_type = 'in' AND o.code = p.order_code
       RETURNING o.code, o.payment_status`,
      [sepayId, orderCode, t.gateway ?? null, t.accountNumber ?? null, String(t.transferType || ''), Math.round(amount),
        t.content ?? null, t.referenceCode ?? null, t.transactionDate ?? null, JSON.stringify(t)],
    );
    if (rows[0]) console.log('[sepay] đơn', rows[0].code, '→', rows[0].payment_status);
    else console.log('[sepay] giao dịch', sepayId, orderCode ? `mã ${orderCode} không khớp đơn hoặc đã xử lý` : 'không có mã đơn');
    send(res, 200, { success: true });
  },
});

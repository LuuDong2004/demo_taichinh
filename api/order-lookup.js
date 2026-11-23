// POST /api/order-lookup – khách tra cứu đơn đã đặt bằng số điện thoại hoặc email.
// Body: { q: '0912345678' | 'ten@email.com' }
// Chỉ trả thông tin tóm tắt (mã đơn, ngày, sản phẩm, tổng tiền, trạng thái), không trả tên, địa chỉ.
// Đường dẫn trang đơn (có khóa truy cập) chỉ trả cho đơn còn chờ chuyển khoản, để khách quay lại thanh toán.
import { query } from './_lib/db.js';
import { fail, handler, readJson, send, tooManyRequests } from './_lib/http.js';
import { expireOrders, expiresAt } from './_lib/shop.js';

const MAX_RESULTS = 20;

// 0912 345 678 / +84912345678 / 84912345678 → 0912345678
export function normPhone(s) {
  const d = String(s).replace(/[^\d+]/g, '');
  const local = d.replace(/^\+?84/, '0');
  return /^0\d{9,10}$/.test(local) ? local : null;
}

export default handler({
  async POST(req, res) {
    if (tooManyRequests(req, 'lookup', 8, 10 * 60_000)) return fail(res, 429, 'Bạn tra cứu nhiều quá, đợi vài phút rồi thử lại nhé');
    const raw = String((await readJson(req))?.q ?? '').trim().slice(0, 120);
    const isEmail = raw.includes('@');
    const key = isEmail ? raw.toLowerCase() : normPhone(raw);
    if (isEmail ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key) : !key) {
      return fail(res, 400, 'Nhập số điện thoại (VD: 0912 345 678) hoặc email đã dùng khi đặt hàng');
    }

    await expireOrders(); // đơn quá 15 phút chưa chuyển khoản → hiện đúng là đã hủy
    const rows = await query(
      `SELECT o.*,
              COALESCE((SELECT json_agg(json_build_object('name', i.name, 'qty', i.qty) ORDER BY i.id)
                        FROM order_items i WHERE i.order_id = o.id), '[]') AS items
       FROM orders o
       WHERE ${isEmail
    ? 'lower(o.email) = $1'
    : `regexp_replace(regexp_replace(o.phone, '[^0-9+]', '', 'g'), '^\\+?84', '0') = $1`}
       ORDER BY o.created_at DESC
       LIMIT ${MAX_RESULTS}`,
      [key],
    );

    const orders = rows.map(o => {
      const waitingPay = o.pay_method === 'bank' && o.status !== 'cancelled' && o.payment_status !== 'paid';
      return {
        code: o.code, createdAt: o.created_at, total: o.total, payMethod: o.pay_method,
        status: o.status, paymentStatus: o.payment_status, cancelReason: o.cancel_reason ?? null,
        expiresAt: expiresAt(o), items: o.items,
        link: waitingPay ? `/don-hang/${o.code}?k=${o.access_key}` : null,
      };
    });
    send(res, 200, { orders });
  },
});

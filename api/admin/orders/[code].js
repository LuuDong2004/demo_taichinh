// GET   /api/admin/orders/DH12345678 – chi tiết đơn + các giao dịch SePay của đơn
// PATCH /api/admin/orders/DH12345678 – body { status } để đổi trạng thái giao hàng,
//                                      hoặc { markPaid: true } để ghi nhận đã thu tiền (VD: COD, chuyển khoản ngoài SePay)
import { query } from '../../_lib/db.js';
import { fail, getQuery, handler, isAdmin, readJson, send } from '../../_lib/http.js';

const STATUSES = ['pending', 'confirmed', 'shipping', 'done', 'cancelled'];

async function load(code) {
  const [o] = await query(
    `SELECT o.*, COALESCE((SELECT json_agg(json_build_object('id', i.product_id, 'name', i.name, 'price', i.price, 'qty', i.qty) ORDER BY i.id)
                          FROM order_items i WHERE i.order_id = o.id), '[]') AS items
     FROM orders o WHERE o.code = $1`, [code]);
  if (!o) return null;
  delete o.access_key;
  delete o.id;
  o.payments = await query(
    `SELECT sepay_id, amount, content, gateway, reference_code, transaction_date, created_at
     FROM payments WHERE order_code = $1 ORDER BY created_at`, [code]);
  return o;
}

export default handler({
  async GET(req, res) {
    if (!isAdmin(req)) return fail(res, 401, 'Sai mật khẩu quản trị');
    const o = await load(String(getQuery(req).code || '').toUpperCase());
    if (!o) return fail(res, 404, 'Không tìm thấy đơn hàng');
    send(res, 200, { order: o });
  },
  async PATCH(req, res) {
    if (!isAdmin(req)) return fail(res, 401, 'Sai mật khẩu quản trị');
    const code = String(getQuery(req).code || '').toUpperCase();
    const body = await readJson(req);
    if (body.status !== undefined) {
      if (!STATUSES.includes(body.status)) return fail(res, 400, 'Trạng thái không hợp lệ');
      await query('UPDATE orders SET status = $2, cancel_reason = NULL, updated_at = now() WHERE code = $1', [code, body.status]);
    }
    if (body.markPaid === true) {
      await query(
        `UPDATE orders SET payment_status = 'paid', paid_amount = GREATEST(paid_amount, total),
                paid_at = COALESCE(paid_at, now()), updated_at = now() WHERE code = $1`, [code]);
    }
    const o = await load(code);
    if (!o) return fail(res, 404, 'Không tìm thấy đơn hàng');
    send(res, 200, { order: o });
  },
});

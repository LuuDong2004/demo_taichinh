// GET /api/admin/orders?status=&payment=&q=&limit= – danh sách đơn cho trang quản trị
// Cần header "Authorization: Bearer <ADMIN_PASSWORD>"
import { query } from '../_lib/db.js';
import { fail, getQuery, handler, isAdmin, send } from '../_lib/http.js';
import { expireOrders } from '../_lib/shop.js';

const STATUSES = ['pending', 'confirmed', 'shipping', 'done', 'cancelled'];
const PAYMENTS = ['unpaid', 'partial', 'paid'];

export default handler({
  async GET(req, res) {
    if (!isAdmin(req)) return fail(res, 401, 'Sai mật khẩu quản trị');
    await expireOrders();
    const q = getQuery(req);
    const where = [];
    const params = [];
    if (STATUSES.includes(q.status)) { params.push(q.status); where.push(`o.status = $${params.length}`); }
    if (PAYMENTS.includes(q.payment)) { params.push(q.payment); where.push(`o.payment_status = $${params.length}`); }
    if (q.q) {
      params.push(`%${String(q.q).trim()}%`);
      where.push(`(o.code ILIKE $${params.length} OR o.name ILIKE $${params.length} OR o.phone ILIKE $${params.length})`);
    }
    const limit = Math.min(Math.max(parseInt(q.limit, 10) || 200, 1), 500);
    const orders = await query(
      `SELECT o.code, o.name, o.phone, o.email, o.city, o.district, o.address, o.note, o.pay_method,
              o.subtotal, o.discount, o.shipping, o.total, o.coupon, o.status, o.payment_status, o.paid_amount,
              o.paid_at, o.created_at, o.updated_at, o.cancel_reason,
              COALESCE((SELECT json_agg(json_build_object('id', i.product_id, 'name', i.name, 'price', i.price, 'qty', i.qty) ORDER BY i.id)
                        FROM order_items i WHERE i.order_id = o.id), '[]') AS items
       FROM orders o ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
       ORDER BY o.created_at DESC LIMIT ${limit}`,
      params,
    );
    // Số liệu tổng quan (không phụ thuộc bộ lọc)
    const [stats] = await query(
      `SELECT count(*)::int AS orders,
              count(*) FILTER (WHERE status = 'pending')::int AS pending,
              count(*) FILTER (WHERE pay_method = 'bank' AND payment_status <> 'paid' AND status <> 'cancelled')::int AS awaiting_payment,
              COALESCE(sum(paid_amount) FILTER (WHERE status <> 'cancelled'), 0)::bigint AS collected,
              COALESCE(sum(total) FILTER (WHERE status <> 'cancelled'), 0)::bigint AS revenue
       FROM orders`,
    );
    send(res, 200, { orders, stats: { ...stats, collected: Number(stats.collected), revenue: Number(stats.revenue) } });
  },
});

// GET /api/admin/stats?days=14 – số liệu cho biểu đồ ở trang Tổng quan
// Ngày tính theo giờ Việt Nam. Ngày không có đơn vẫn trả về (giá trị 0) để biểu đồ không bị hở.
import { query } from '../_lib/db.js';
import { fail, getQuery, handler, isAdmin, send } from '../_lib/http.js';

const TZ = 'Asia/Ho_Chi_Minh';

export default handler({
  async GET(req, res) {
    if (!isAdmin(req)) return fail(res, 401, 'Sai mật khẩu quản trị');
    const days = Math.min(Math.max(parseInt(getQuery(req).days, 10) || 14, 7), 90);
    const daily = await query(
      `WITH d AS (
         SELECT generate_series((now() AT TIME ZONE '${TZ}')::date - ($1::int - 1), (now() AT TIME ZONE '${TZ}')::date, interval '1 day')::date AS day
       )
       SELECT to_char(d.day, 'YYYY-MM-DD') AS day,
              count(o.id)::int AS orders,
              COALESCE(sum(o.total), 0)::bigint AS revenue,
              COALESCE(sum(o.paid_amount), 0)::bigint AS collected
       FROM d LEFT JOIN orders o
         ON (o.created_at AT TIME ZONE '${TZ}')::date = d.day AND o.status <> 'cancelled'
       GROUP BY d.day ORDER BY d.day`,
      [days],
    );
    const byStatus = await query('SELECT status AS key, count(*)::int AS n FROM orders GROUP BY status');
    const byPayment = await query(`SELECT payment_status AS key, count(*)::int AS n FROM orders WHERE status <> 'cancelled' GROUP BY payment_status`);
    send(res, 200, {
      days,
      daily: daily.map(r => ({ ...r, revenue: Number(r.revenue), collected: Number(r.collected) })),
      byStatus, byPayment,
    });
  },
});

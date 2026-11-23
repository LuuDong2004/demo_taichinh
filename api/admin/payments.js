// GET /api/admin/payments – các giao dịch SePay gửi về (kể cả giao dịch không khớp đơn nào, để đối soát tay)
import { query } from '../_lib/db.js';
import { fail, handler, isAdmin, send } from '../_lib/http.js';

export default handler({
  async GET(req, res) {
    if (!isAdmin(req)) return fail(res, 401, 'Sai mật khẩu quản trị');
    const payments = await query(
      `SELECT p.sepay_id, p.order_code, p.gateway, p.account_number, p.transfer_type, p.amount, p.content,
              p.reference_code, p.transaction_date, p.created_at, o.total AS order_total, o.name AS order_name
       FROM payments p LEFT JOIN orders o ON o.code = p.order_code
       ORDER BY p.created_at DESC LIMIT 300`,
    );
    send(res, 200, { payments });
  },
});

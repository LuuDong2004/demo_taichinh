// GET /api/orders/DH12345678?k=<accessKey> – khách xem trạng thái đơn của mình (trang chờ thanh toán hỏi định kỳ)
import { query } from '../_lib/db.js';
import { fail, getQuery, handler, safeEqual, send } from '../_lib/http.js';
import { bankInfo, expireOrders, publicOrder, qrUrl } from '../_lib/shop.js';

export default handler({
  async GET(req, res) {
    const q = getQuery(req);
    const code = String(q.code || '').toUpperCase();
    await expireOrders(code); // quá 15 phút chưa chuyển khoản → hủy trước khi trả về
    const [o] = await query('SELECT * FROM orders WHERE code = $1', [code]);
    // Sai mã hoặc sai khóa đều trả 404 như nhau để không dò được mã đơn
    if (!o || !safeEqual(q.k, o.access_key)) return fail(res, 404, 'Không tìm thấy đơn hàng');
    const items = await query('SELECT product_id, name, price, qty FROM order_items WHERE order_id = $1 ORDER BY id', [o.id]);
    const bank = bankInfo();
    const due = o.total - o.paid_amount;
    const payment = o.pay_method === 'bank' && bank && o.payment_status !== 'paid' && o.status !== 'cancelled'
      ? { method: 'bank', ...bank, amount: due, content: o.code, qr: qrUrl(bank, due, o.code) }
      : { method: o.pay_method };
    // now: giờ máy chủ, để đồng hồ đếm ngược trên trình duyệt không lệch khi giờ máy khách sai
    send(res, 200, { order: publicOrder(o, items), payment, now: new Date().toISOString() });
  },
});

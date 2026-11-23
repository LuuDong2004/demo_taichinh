// POST /api/orders – khách đặt hàng
// Body: { items: [{ id, qty }], customer: { name, phone, email, city, district, address, note }, pay: 'cod' | 'bank' }
// Trả về: { order, accessKey, payment } – payment có mã QR khi chuyển khoản
import { query } from './_lib/db.js';
import { fail, handler, readJson, send } from './_lib/http.js';
import { bankInfo, newAccessKey, newOrderCode, priceCart, publicOrder, qrUrl, readCustomer } from './_lib/shop.js';

export default handler({
  async POST(req, res) {
    const body = await readJson(req);
    const pay = body.pay === 'bank' ? 'bank' : body.pay === 'cod' ? 'cod' : null;
    if (!pay) return fail(res, 400, 'Vui lòng chọn phương thức thanh toán');
    const bank = bankInfo();
    if (pay === 'bank' && !bank) return fail(res, 503, 'Chuyển khoản đang tạm ngưng, vui lòng chọn thanh toán khi nhận hàng');

    const c = readCustomer(body.customer);
    const cart = priceCart(body.items);
    const accessKey = newAccessKey();

    // Thêm đơn + các dòng sản phẩm trong MỘT câu lệnh (không có đơn thiếu sản phẩm). Trùng mã thì thử mã khác.
    let rows;
    for (let attempt = 0; attempt < 4 && !rows; attempt++) {
      try {
        rows = await query(
          `WITH o AS (
             INSERT INTO orders (code, access_key, name, phone, email, city, district, address, note, pay_method,
                                 subtotal, discount, shipping, total, coupon)
             VALUES ($1, $2, $3, $4, NULLIF($5, ''), $6, $7, $8, NULLIF($9, ''), $10, $11, $12, $13, $14, $15)
             RETURNING *
           ), i AS (
             INSERT INTO order_items (order_id, product_id, name, price, qty)
             SELECT o.id, x.product_id, x.name, x.price, x.qty
             FROM o, jsonb_to_recordset($16::jsonb) AS x(product_id TEXT, name TEXT, price INT, qty INT)
             RETURNING product_id
           )
           SELECT o.*, (SELECT count(*) FROM i) AS item_rows FROM o`,
          [newOrderCode(), accessKey, c.name, c.phone, c.email, c.city, c.district, c.address, c.note, pay,
            cart.subtotal, cart.discount, cart.shipping, cart.total, cart.coupon, JSON.stringify(cart.lines)],
        );
      } catch (e) {
        if (e.code !== '23505' || attempt === 3) throw e; // 23505 = trùng mã đơn
      }
    }
    const o = rows[0];
    const payment = pay === 'bank'
      ? { method: 'bank', ...bank, amount: o.total, content: o.code, qr: qrUrl(bank, o.total, o.code) }
      : { method: 'cod' };
    send(res, 201, { order: publicOrder(o, cart.lines), accessKey, payment, now: new Date().toISOString() });
  },
});

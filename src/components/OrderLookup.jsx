import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from './Icons';
import { api, ORDER_STATUS, PAY_METHOD, PAY_STATUS } from '../lib/api';
import { fmtDate, money } from '../lib/utils';

// Tra cứu đơn đã đặt bằng số điện thoại hoặc email (dùng ở trang giỏ hàng)
export default function OrderLookup() {
  const [q, setQ] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [orders, setOrders] = useState(null);

  const submit = async e => {
    e.preventDefault();
    if (!q.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const d = await api('/order-lookup', { method: 'POST', body: { q } });
      setOrders(d.orders);
    } catch (err) {
      setOrders(null);
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div className="panel lookup">
      <h3>Tra cứu đơn hàng</h3>
      <p className="muted">Nhập số điện thoại hoặc email bạn đã dùng khi đặt hàng.</p>
      <form className="lookup-form" onSubmit={submit}>
        <label className="search-wrap">
          <Search />
          <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="VD: 0912 345 678 hoặc ten@email.com"
            aria-label="Số điện thoại hoặc email" autoComplete="tel" inputMode="text" maxLength={120} />
        </label>
        <button className="btn" disabled={busy}>{busy ? 'Đang tìm…' : 'Tra cứu'}</button>
      </form>
      {error && <p className="lookup-msg err">{error}</p>}
      {orders && !orders.length && <p className="lookup-msg">Không tìm thấy đơn nào với thông tin này. Bạn kiểm tra lại số điện thoại hoặc email nhé.</p>}
      {orders?.length > 0 && (
        <ul className="lookup-list">
          {orders.map(o => {
            const [sl, sc] = o.status === 'cancelled' && o.cancelReason === 'expired' ? ['Hết hạn thanh toán', 'st-cancel'] : ORDER_STATUS[o.status] || ORDER_STATUS.pending;
            const [pl, pc] = PAY_STATUS[o.paymentStatus] || PAY_STATUS.unpaid;
            return (
              <li key={o.code}>
                <div className="lookup-top">
                  <b className="code">{o.code}</b>
                  <span className="muted">{fmtDate(o.createdAt)}</span>
                </div>
                <div className="lookup-items">{o.items.map(i => `${i.name} × ${i.qty}`).join(', ')}</div>
                <div className="lookup-bottom">
                  <span className={`status ${sc}`}>{sl}</span>
                  {o.status !== 'cancelled' && <span className={`status ${pc}`}>{pl}</span>}
                  <span className="muted">{PAY_METHOD[o.payMethod]}</span>
                  <b className="lookup-total">{money(o.total)}</b>
                </div>
                {o.link && <Link to={o.link} className="btn btn-yellow btn-sm lookup-pay">Thanh toán đơn này</Link>}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { PageHero } from '../components/Blocks';
import { Bank, Cash } from '../components/Icons';
import Select from '../components/Select';
import { api } from '../lib/api';
import { useShop } from '../lib/ShopContext';
import { money } from '../lib/utils';
import { OrderSummary } from './Cart';

const PAYS = [
  ['bank', <Bank />, 'Chuyển khoản / Quét mã QR', 'Quét mã VietQR bằng app ngân hàng, đơn tự xác nhận khi nhận được tiền'],
  ['cod', <Cash />, 'Thanh toán khi nhận hàng (COD)', 'Kiểm tra hàng rồi mới trả tiền'],
];

export default function Checkout() {
  const { totals: t, cart, coupon, clearCart, toast } = useShop();
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  if (!t.lines.length && !sending) return <Navigate to="/gio-hang" replace />;

  const submit = async e => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    setSending(true);
    setError('');
    try {
      const data = await api('/orders', {
        method: 'POST',
        body: {
          items: cart.map(l => ({ id: l.id, qty: l.qty })),
          customer: { name: f.name, phone: f.phone, email: f.email, city: f.city, district: f.district, address: f.address, note: f.note },
          pay: f.pay,
          coupon,
        },
      });
      clearCart();
      navigate(`/don-hang/${data.order.code}?k=${data.accessKey}`, { replace: true, state: data });
    } catch (err) {
      setError(err.message);
      toast(err.message);
      setSending(false);
    }
  };

  return (
    <>
      <PageHero title="Thanh toán"><Link to="/gio-hang">Giỏ hàng</Link> / Thanh toán</PageHero>
      <section className="section">
        <form className="container cart-layout" onSubmit={submit}>
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="panel">
              <h3>1. Thông tin giao hàng</h3>
              <div className="form-grid">
                <div className="field"><label>Họ và tên *</label><input className="input" name="name" required maxLength={80} autoComplete="name" /></div>
                <div className="field"><label>Số điện thoại *</label><input className="input" name="phone" required inputMode="tel" pattern="(\+?84|0)[0-9 ]{8,12}" title="Số điện thoại Việt Nam, VD: 0912 345 678" autoComplete="tel" /></div>
                <div className="field full"><label>Email</label><input className="input" type="email" name="email" autoComplete="email" /></div>
                <div className="field"><label>Tỉnh / Thành phố *</label>
                  <Select name="city" required placeholder="Chọn tỉnh / thành phố..." ariaLabel="Tỉnh / Thành phố"
                    options={['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Khác']} />
                </div>
                <div className="field"><label>Quận / Huyện *</label><input className="input" name="district" required maxLength={80} /></div>
                <div className="field full"><label>Địa chỉ chi tiết *</label><input className="input" name="address" required maxLength={200} autoComplete="street-address" /></div>
                <div className="field full"><label>Ghi chú</label><textarea className="input" name="note" rows="2" maxLength={500} placeholder="VD: gói quà sinh nhật cho bé..." /></div>
              </div>
            </div>
            <div className="panel">
              <h3>2. Phương thức thanh toán</h3>
              <div className="pay-opts">
                {PAYS.map(([v, ic, h, d], i) => (
                  <label className="pay-opt" key={v}>
                    <input type="radio" name="pay" value={v} defaultChecked={i === 0} /><span className="pay-ic">{ic}</span>
                    <div><b>{h}</b><div style={{ fontSize: 13, color: 'var(--muted)' }}>{d}</div></div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="panel" style={{ position: 'sticky', top: 100 }}>
            <h3>Đơn hàng</h3>
            {t.lines.map(l => <div className="sum-line" key={l.id}><span>{l.p.name} × {l.qty}</span><span>{money(l.p.price * l.qty)}</span></div>)}
            <hr style={{ border: 0, borderTop: '2px dashed var(--line)' }} />
            <OrderSummary />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="btn btn-block btn-orange" style={{ marginTop: 16 }} disabled={sending}>{sending ? 'Đang gửi đơn…' : 'Đặt hàng'}</button>
          </div>
        </form>
      </section>
    </>
  );
}

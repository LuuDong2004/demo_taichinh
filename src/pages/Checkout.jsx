import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { PageHero } from '../components/Blocks';
import { Bank, Cash, Check, Mobile } from '../components/Icons';
import { useShop } from '../lib/ShopContext';
import { money } from '../lib/utils';
import { OrderSummary } from './Cart';

const PAYS = [
  ['COD', <Cash />, 'Thanh toán khi nhận hàng (COD)', 'Kiểm tra hàng rồi mới thanh toán'],
  ['Chuyển khoản', <Bank />, 'Chuyển khoản / Quét mã QR', 'Nhận mã QR sau khi đặt hàng'],
  ['Ví điện tử', <Mobile />, 'Ví điện tử', 'MoMo, ZaloPay, VNPay'],
];

function Success({ order, info }) {
  return (
    <section className="section">
      <div className="container success">
        <div className="big"><Check size={60} /></div>
        <h1 className="title" style={{ fontSize: 36 }}>Đặt hàng thành công!</h1>
        <p style={{ fontSize: 16 }}>Cảm ơn <b>{info.name}</b>! Mã đơn hàng của bạn là <b style={{ color: 'var(--orange)' }}>{order.id}</b>. Chúng tôi sẽ gọi xác nhận qua số <b>{info.phone}</b> trong ít phút.</p>
        {info.pay === 'Chuyển khoản' && (
          <div className="panel" style={{ display: 'inline-block', margin: '10px 0' }}>
            <div style={{ width: 160, height: 160, background: 'repeating-conic-gradient(var(--ink) 0 25%, #fff 0 50%) 0 0/20px 20px', borderRadius: 8, margin: 'auto' }} />
            <p style={{ margin: '10px 0 0', fontSize: 13 }}>Quét mã để chuyển <b>{money(order.total)}</b><br />Nội dung: <b>{order.id}</b></p>
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 20, flexWrap: 'wrap' }}>
          <Link to="/" className="btn">Về trang chủ</Link>
          <Link to="/blog" className="btn btn-yellow">Đọc góc phụ huynh</Link>
        </div>
      </div>
    </section>
  );
}

export default function Checkout() {
  const { totals: t, placeOrder } = useShop();
  const [done, setDone] = useState(null);

  if (done) return <Success {...done} />;
  if (!t.lines.length) return <Navigate to="/gio-hang" replace />;

  const submit = e => {
    e.preventDefault();
    const info = Object.fromEntries(new FormData(e.target));
    setDone({ order: placeOrder(info), info });
    window.scrollTo(0, 0);
  };

  return (
    <>
      <PageHero eyebrow="Thanh toán" title="Thanh toán"><Link to="/gio-hang">Giỏ hàng</Link> / Thanh toán</PageHero>
      <section className="section">
        <form className="container cart-layout" onSubmit={submit}>
          <div style={{ display: 'grid', gap: 24 }}>
            <div className="panel">
              <h3>1. Thông tin giao hàng</h3>
              <div className="form-grid">
                <div className="field"><label>Họ và tên *</label><input className="input" name="name" required /></div>
                <div className="field"><label>Số điện thoại *</label><input className="input" name="phone" required pattern="[0-9 ]{9,12}" /></div>
                <div className="field full"><label>Email</label><input className="input" type="email" name="email" /></div>
                <div className="field"><label>Tỉnh / Thành phố *</label>
                  <select className="input" name="city" required defaultValue="">
                    <option value="">Chọn...</option><option>Hà Nội</option><option>TP. Hồ Chí Minh</option><option>Đà Nẵng</option><option>Hải Phòng</option><option>Cần Thơ</option><option>Khác</option>
                  </select>
                </div>
                <div className="field"><label>Quận / Huyện *</label><input className="input" name="district" required /></div>
                <div className="field full"><label>Địa chỉ chi tiết *</label><input className="input" name="address" required /></div>
                <div className="field full"><label>Ghi chú</label><textarea className="input" name="note" rows="2" placeholder="VD: gói quà sinh nhật cho bé..." /></div>
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
            <button className="btn btn-block btn-orange" style={{ marginTop: 16 }}>Đặt hàng</button>
            <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>Bản demo – không phát sinh thanh toán thật.</p>
          </div>
        </form>
      </section>
    </>
  );
}

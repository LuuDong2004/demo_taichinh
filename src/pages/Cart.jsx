import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHero, QtyInput } from '../components/Blocks';
import Crop from '../components/Crop';
import { ArrowLeft, Pig, Truck, X } from '../components/Icons';
import { useShop } from '../lib/ShopContext';
import { money } from '../lib/utils';

export function OrderSummary({ withCoupon }) {
  const { totals: t, coupon, setCoupon, toast } = useShop();
  const [code, setCode] = useState(coupon);
  const apply = () => {
    const c = code.trim().toUpperCase();
    if (c === 'UOCMO10') { setCoupon(c); toast('Áp dụng mã thành công 🎉'); }
    else toast('Mã giảm giá không hợp lệ');
  };
  return (
    <>
      <div className="sum-line"><span>Tạm tính</span><span>{money(t.sub)}</span></div>
      {t.discount > 0 && <div className="sum-line" style={{ color: 'var(--green)' }}><span>Giảm giá (UOCMO10)</span><span>−{money(t.discount)}</span></div>}
      <div className="sum-line"><span>Phí vận chuyển</span><span>{t.ship ? money(t.ship) : 'Miễn phí'}</span></div>
      {withCoupon && (
        <>
          <div className="coupon">
            <input className="input" value={code} onChange={e => setCode(e.target.value)} placeholder="Mã giảm giá" />
            <button type="button" className="btn btn-sm btn-yellow" onClick={apply}>Áp dụng</button>
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Thử mã <b>UOCMO10</b> để giảm 10%</div>
        </>
      )}
      <div className="sum-line total"><span>Tổng cộng</span><span>{money(t.total)}</span></div>
    </>
  );
}

export default function Cart() {
  const { totals: t, changeQty, removeFromCart } = useShop();
  const hero = <PageHero eyebrow="Giỏ hàng" title="Giỏ hàng của bạn">Giỏ hàng</PageHero>;

  if (!t.lines.length) return (
    <>
      {hero}
      <section className="section">
        <div className="container panel empty">
          <div className="big"><Pig size={96} /></div>
          <h3>Giỏ hàng đang trống</h3>
          <p>Heo đất đang chờ bé bỏ đồ chơi vào nè!</p>
          <Link to="/san-pham" className="btn">Mua sắm ngay</Link>
        </div>
      </section>
    </>
  );

  const freeLeft = 500000 - t.sub;
  return (
    <>
      {hero}
      <section className="section">
        <div className="container cart-layout">
          <div className="panel">
            <h3>Sản phẩm ({t.count})</h3>
            {freeLeft > 0 && (
              <div className="result-box" style={{ margin: '0 0 10px' }}>
                <span className="with-ic"><Truck size={20} /><span>Mua thêm <b>{money(freeLeft)}</b> để được <b>miễn phí vận chuyển</b></span></span>
                <div className="jar-bar" style={{ background: '#fff' }}><i style={{ width: `${t.sub / 5000}%`, background: 'var(--green)' }} /></div>
              </div>
            )}
            {t.lines.map(l => (
              <div className="cart-row" key={l.id}>
                <Link to={`/san-pham/${l.id}`}><Crop img={l.p.img} area={l.p.crop} /></Link>
                <div><h4>{l.p.name}</h4><span style={{ fontSize: 13, color: 'var(--muted)' }}>{money(l.p.price)}</span></div>
                <QtyInput value={l.qty} onChange={v => changeQty(l.id, v - l.qty)} />
                <b className="line-total" style={{ color: 'var(--red)' }}>{money(l.p.price * l.qty)}</b>
                <button className="remove" onClick={() => removeFromCart(l.id)} aria-label="Xóa"><X size={14} /></button>
              </div>
            ))}
            <div style={{ marginTop: 16 }}><Link to="/san-pham" className="btn btn-ghost btn-sm"><ArrowLeft /> Tiếp tục mua sắm</Link></div>
          </div>
          <div className="panel">
            <h3>Tóm tắt đơn hàng</h3>
            <OrderSummary withCoupon />
            <Link to="/thanh-toan" className="btn btn-block" style={{ marginTop: 16 }}>Tiến hành thanh toán</Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotifyForm, ProductCard, QtyInput } from '../components/Blocks';
import ProductArt from '../components/ProductArt';
import { Box, Briefcase, Calculator, Clock, Gift, Refresh, Shield, Smile, Stars, Target, Truck, Users } from '../components/Icons';
import { REVIEWS, isSoon } from '../data';
import { useShop } from '../lib/ShopContext';
import { useLiquid } from '../lib/useLiquid';
import { money } from '../lib/utils';
import NotFound from './NotFound';

const BENEFITS = [[<Briefcase size={30} />, 'Giá trị lao động', 'Bé hiểu muốn có tiền phải làm việc.'], [<Calculator size={30} />, 'Tập tính toán', 'Cộng trừ tiền, so sánh giá và đếm tiền thối.'], [<Target size={30} />, 'Đặt mục tiêu', 'Lên kế hoạch mua đủ 4 đồ vật của nghề mình.']];
const TABS = [['desc', 'Mô tả'], ['inc', 'Trong hộp có gì'], ['rev', 'Đánh giá']];

export default function ProductDetail() {
  const { id } = useParams();
  const { products, findProduct, addToCart } = useShop();
  const navigate = useNavigate();
  const p = findProduct(id);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState('desc');
  const [tabsRef, tabsInd] = useLiquid(tab, '.on');
  // Chuyển sang sản phẩm khác (từ mục liên quan) thì reset lựa chọn
  useEffect(() => { setQty(1); setShot(0); setTab('desc'); }, [id]);
  if (!p) return <NotFound />;
  const soon = isSoon(p);

  // Ảnh đại diện luôn đứng đầu (admin có thể đổi ảnh chính mà không sửa thư viện ảnh)
  const gallery = [p.img, ...(p.gallery || []).filter(g => g !== p.img)];
  // Ưu tiên gợi ý sản phẩm đang bán
  const related = products.filter(x => x.id !== p.id).sort((a, b) => isSoon(a) - isSoon(b)).slice(0, 4);

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 24 }}><Link to="/">Trang chủ</Link> / <Link to="/san-pham">Sản phẩm</Link> / {p.name}</div>
        <div className="detail">
          <div className="gallery">
            {p.art ? (
              <div className="main art"><ProductArt size="lg" /></div>
            ) : (
              <>
                <div className="main"><img src={gallery[shot] || p.img} alt={p.name} /></div>
                {gallery.length > 1 && (
                  <div className="thumbs">
                    {gallery.map((src, i) => <button key={src} className={i === shot ? 'on' : ''} onClick={() => setShot(i)} aria-label={`Ảnh ${i + 1}`}><img src={src} alt="" loading="lazy" /></button>)}
                  </div>
                )}
              </>
            )}
          </div>
          <div>
            {soon
              ? <span className="chip soon-chip">Sắp ra mắt</span>
              : p.badge && <span className="chip" style={{ background: 'var(--red)', color: '#fff', borderColor: 'var(--red)' }}>{p.badge}</span>}
            <h1>{p.name}</h1>
            {!soon && <div className="meta" style={{ fontSize: 14 }}><Stars n={p.rating} size={16} /> {p.rating} ({Math.round(p.sold / 7)} đánh giá) · Đã bán {p.sold.toLocaleString('vi-VN')}</div>}
            {!soon && <div className="price" style={{ margin: '18px 0' }}>{money(p.price)}{p.oldPrice ? <s>{money(p.oldPrice)}</s> : null}</div>}
            <p style={{ fontSize: 16 }}>{p.short}</p>
            <div className="chips">
              <span className="chip"><Smile size={15} />{p.age}</span>
              {p.kind === 'set' && <><span className="chip"><Users size={15} />2–4 người chơi</span><span className="chip"><Clock size={15} />Bé tự chơi sau 1–2 ván</span></>}
              {!soon && <span className="chip"><Box size={15} />Còn {p.stock} sản phẩm</span>}
            </div>
            {soon ? <NotifyForm product={p} /> : (
              <>
                <div className="buy-row">
                  <QtyInput value={qty} onChange={v => setQty(Math.max(1, v))} />
                  <button className="btn btn-yellow" onClick={() => addToCart(p.id, qty)}>Thêm vào giỏ</button>
                  <button className="btn" onClick={() => { if (addToCart(p.id, qty, true)) navigate('/gio-hang'); }}>Mua ngay</button>
                </div>
                <div className="perks">
                  <div className="perk"><Truck size={20} />Miễn phí ship đơn từ 500k</div><div className="perk"><Refresh />Đổi trả trong 7 ngày</div>
                  <div className="perk"><Gift />Gói quà miễn phí</div><div className="perk"><Shield size={20} />Kèm sách hướng dẫn 16 trang</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="tabs" ref={tabsRef}>
          <span className="liquid-ind tabs-ind" ref={tabsInd} aria-hidden="true" />
          {TABS.filter(([k]) => !(soon && k === 'rev')).map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
        </div>
        {tab === 'desc' && (
          <div>
            <p style={{ fontSize: 16, maxWidth: 820 }}>{p.desc}</p>
            <div className="grid grid-3" style={{ marginTop: 20 }}>
              {BENEFITS.map(([i, h, t]) => <div className="value" key={h}><div className="ic" style={{ background: 'var(--yellow)', color: 'var(--brown)' }}>{i}</div><h4>{h}</h4><p>{t}</p></div>)}
            </div>
          </div>
        )}
        {tab === 'inc' && <ul className="includes">{p.includes.map(i => <li key={i}>{i}</li>)}</ul>}
        {tab === 'rev' && (
          <div className="grid grid-2">
            {REVIEWS.map(r => <div className="review" key={r.name}><Stars n={r.stars} size={17} /><p>{r.text}</p><b>{r.name}</b></div>)}
          </div>
        )}

        <div className="section-head" style={{ margin: '44px auto 24px' }}>
          <span className="eyebrow">Có thể bé cũng thích</span>
          <h2 className="title" style={{ fontSize: 30 }}>Sản phẩm liên quan</h2>
        </div>
        <div className="grid grid-4">{related.map(r => <ProductCard key={r.id} p={r} />)}</div>
      </div>
    </section>
  );
}

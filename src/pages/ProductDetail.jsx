import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductCard, QtyInput } from '../components/Blocks';
import Crop from '../components/Crop';
import { Box, Briefcase, Calculator, Clock, Gift, Refresh, Shield, Smile, Stars, Target, Truck, Users } from '../components/Icons';
import { REVIEWS } from '../data';
import { useShop } from '../lib/ShopContext';
import { money } from '../lib/utils';
import NotFound from './NotFound';

const BENEFITS = [[<Briefcase size={30} />, 'Giá trị lao động', 'Bé hiểu muốn có tiền phải làm việc.'], [<Calculator size={30} />, 'Tập tính toán', 'Cộng trừ xu, so sánh giá món đồ.'], [<Target size={30} />, 'Đặt mục tiêu', 'Lên kế hoạch mua đủ đồ nghề.']];
const TABS = [['desc', 'Mô tả'], ['inc', 'Trong hộp có gì'], ['rev', 'Đánh giá']];

export default function ProductDetail() {
  const { id } = useParams();
  const { products, findProduct, addToCart } = useShop();
  const navigate = useNavigate();
  const p = findProduct(id);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState('desc');
  // Chuyển sang sản phẩm khác (từ mục liên quan) thì reset lựa chọn
  useEffect(() => { setQty(1); setShot(0); setTab('desc'); }, [id]);
  if (!p) return <NotFound />;

  const gallery = [p.crop, 'board', 'jobs', 'events'];
  const related = products.filter(x => x.id !== p.id).slice(0, 4);

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 24 }}><Link to="/">Trang chủ</Link> / <Link to="/san-pham">Sản phẩm</Link> / {p.name}</div>
        <div className="detail">
          <div className="gallery">
            <div className="main"><Crop img={p.img} area={gallery[shot]} /></div>
            <div className="thumbs">
              {gallery.map((c, i) => <button key={c + i} className={i === shot ? 'on' : ''} onClick={() => setShot(i)}><Crop img={p.img} area={c} /></button>)}
            </div>
          </div>
          <div>
            {p.badge && <span className="chip" style={{ background: 'var(--red)', color: '#fff', borderColor: 'var(--red)' }}>{p.badge}</span>}
            <h1>{p.name}</h1>
            <div className="meta" style={{ fontSize: 14 }}><Stars n={p.rating} size={16} /> {p.rating} ({Math.round(p.sold / 7)} đánh giá) · Đã bán {p.sold.toLocaleString('vi-VN')}</div>
            <div className="price" style={{ margin: '18px 0' }}>{money(p.price)}{p.oldPrice ? <s>{money(p.oldPrice)}</s> : null}</div>
            <p style={{ fontSize: 16 }}>{p.short}</p>
            <div className="chips"><span className="chip"><Smile size={15} />{p.age}</span><span className="chip"><Users size={15} />2–4 người chơi</span><span className="chip"><Clock size={15} />20–30 phút</span><span className="chip"><Box size={15} />Còn {p.stock} sản phẩm</span></div>
            <div className="buy-row">
              <QtyInput value={qty} onChange={v => setQty(Math.max(1, v))} />
              <button className="btn btn-yellow" onClick={() => addToCart(p.id, qty)}>Thêm vào giỏ</button>
              <button className="btn" onClick={() => { addToCart(p.id, qty, true); navigate('/gio-hang'); }}>Mua ngay</button>
            </div>
            <div className="perks">
              <div className="perk"><Truck size={20} />Miễn phí ship đơn từ 500k</div><div className="perk"><Refresh />Đổi trả trong 7 ngày</div>
              <div className="perk"><Gift />Gói quà miễn phí</div><div className="perk"><Shield size={20} />Đạt chuẩn an toàn đồ chơi</div>
            </div>
          </div>
        </div>

        <div className="tabs">
          {TABS.map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
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

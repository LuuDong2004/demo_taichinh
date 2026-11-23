import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { NotifyForm, QtyInput, SetCard } from '../components/Blocks';
import { TileGrid } from '../components/Game';
import ProductArt from '../components/ProductArt';
import Set2Guide from '../components/Set2';
import { Arrow, Box, Clock, Gift, Refresh, Shield, Smile, Stars, Truck, Users, Wallet } from '../components/Icons';
import { REVIEWS, RULES, SPECS, TURN, WIN, isSoon } from '../data';
import { useShop } from '../lib/ShopContext';
import { useLiquid } from '../lib/useLiquid';
import { money, priceText } from '../lib/utils';
import NotFound from './NotFound';

const TABS = [['desc', 'Giới thiệu'], ['inc', 'Trong hộp có gì'], ['play', 'Cách chơi'], ['rev', 'Đánh giá']];

// Ảnh sản phẩm: bộ trò chơi có danh sách {src, alt}; sản phẩm thêm ở trang quản trị chỉ có đường dẫn ảnh
const shotsOf = p => {
  const list = (p.gallery || []).map(g => (typeof g === 'string' ? { src: g, alt: p.name } : g));
  return list.some(g => g.src === p.img) || !p.img ? list : [{ src: p.img, alt: p.name }, ...list];
};

function Set1Play() {
  return (
    <div>
      <div className="turn">
        {TURN.map(([h, t], i) => <div className="step" key={h}><div className="num" style={{ background: ['var(--orange)', 'var(--green)', 'var(--red)'][i] }}>{i + 1}</div><h4>{h}</h4><p>{t}</p></div>)}
      </div>
      <div className="panel rules-box"><h3>Cần nhớ</h3><ol>{RULES.map(r => <li key={r}>{r}</li>)}</ol></div>
      <h3 className="sub-title">Các ô trên bàn cờ</h3>
      <TileGrid compact />
      <p className="win-line"><b>Thắng khi:</b> {WIN}</p>
      <Link to="/gioi-thieu#cach-choi" className="btn btn-light">Xem luật đầy đủ, 8 nghề và 65 thẻ <Arrow /></Link>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { products, findProduct, addToCart } = useShop();
  const navigate = useNavigate();
  const p = findProduct(id);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [tab, setTab] = useState('desc');
  const [tabsRef, tabsInd] = useLiquid(tab, '.on');
  useEffect(() => { setQty(1); setShot(0); setTab('desc'); }, [id]);
  if (!p) return <NotFound />;
  const soon = isSoon(p);
  const shots = shotsOf(p);
  const cur = shots[shot] || shots[0];
  const desc = Array.isArray(p.desc) ? p.desc : [p.desc];
  // Tab Đánh giá chỉ hiện khi đã có lượt bán thật
  const tabs = TABS.filter(([k]) => (k !== 'play' || p.set) && (k !== 'inc' || p.includes.length) && (k !== 'rev' || p.sold > 0));
  // Gợi ý: đang xem bộ trò chơi → bộ còn lại; đang xem bộ sắp ra mắt → 2 bộ đang bán
  const others = products.filter(x => x.set && x.id !== p.id);

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container">
        <div className="crumbs" style={{ marginBottom: 24 }}><Link to="/trang-chu">Trang chủ</Link> / <Link to="/san-pham">Sản phẩm</Link> / {p.name}</div>
        <div className="detail">
          <div className="gallery">
            {p.art || !cur ? <div className="main art"><ProductArt size="lg" /></div> : (
              <>
                <div className={`main ${shot === 0 && p.set ? 'box-shot' : ''}`} style={{ '--set': p.theme }}>
                  <img src={cur.src} alt={cur.alt} />
                  {shot > 0 && <a className="zoom-link" href={cur.src} target="_blank" rel="noopener noreferrer">Xem ảnh lớn</a>}
                </div>
                {shots.length > 1 && (
                  <div className="thumbs">
                    {shots.map((g, i) => <button key={g.src} className={i === shot ? 'on' : ''} onClick={() => setShot(i)} aria-label={g.alt}><img src={g.src} alt="" loading="lazy" /></button>)}
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
            {p.line && <p className="detail-line" style={{ '--set': p.theme }}>{p.line}</p>}
            {!soon && p.sold > 0 && <div className="meta" style={{ fontSize: 14 }}><Stars n={p.rating} size={16} /> {p.rating} · Đã bán {p.sold.toLocaleString('vi-VN')}</div>}
            {!soon && <div className="price" style={{ margin: '18px 0' }}>{priceText(p)}{p.oldPrice ? <s>{money(p.oldPrice)}</s> : null}</div>}
            <p style={{ fontSize: 16 }}>{p.short}</p>
            <div className="chips">
              {p.age && <span className="chip"><Smile size={15} />{p.age}</span>}
              {p.players && <span className="chip"><Users size={15} />{p.players}</span>}
              {p.time && <span className="chip"><Clock size={15} />{p.time} một ván</span>}
              {p.notes && <span className="chip"><Wallet size={15} />Tiền {p.notes}</span>}
              {!soon && p.stock > 0 && <span className="chip"><Box size={15} />Còn {p.stock} sản phẩm</span>}
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
                  <div className="perk"><Gift />Gói quà miễn phí</div><div className="perk"><Shield size={20} />Kèm sách hướng dẫn</div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="tabs" ref={tabsRef}>
          <span className="liquid-ind tabs-ind" ref={tabsInd} aria-hidden="true" />
          {tabs.map(([k, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}
        </div>
        {tab === 'desc' && (
          <div>
            <div className="desc-text">{desc.map((t, i) => <p key={i}>{t}</p>)}</div>
            {p.learn && (
              <>
                <h3 className="sub-title">Con học được gì</h3>
                <div className="values">
                  {p.learn.map(([h, t], i) => <div className="value" key={h}><div className="ic num-ic" style={{ background: p.theme }}>{i + 1}</div><h4>{h}</h4><p>{t}</p></div>)}
                </div>
              </>
            )}
          </div>
        )}
        {tab === 'inc' && (
          <div className="inc-layout">
            <ul className="includes">{p.includes.map(i => <li key={i}>{i}</li>)}</ul>
            {p.set && (
              <dl className="specs">
                {SPECS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            )}
          </div>
        )}
        {tab === 'play' && (p.set === 2 ? <Set2Guide /> : <Set1Play />)}
        {tab === 'rev' && (
          <div className="grid grid-2">
            {REVIEWS.map(r => <div className="review" key={r.name}><Stars n={r.stars} size={17} /><p>{r.text}</p><b>{r.name}</b> <small style={{ color: 'var(--muted)' }}>{r.city}</small></div>)}
          </div>
        )}

        {others.length > 0 && (
          <>
            <div className="section-head" style={{ margin: '48px auto 24px' }}>
              <span className="eyebrow">{p.set ? 'Bộ còn lại' : 'Bộ trò chơi'}</span>
              <h2 className="title" style={{ fontSize: 30 }}>{!p.set ? 'Hai bộ Moni Yo' : others[0].set === 2 ? 'Con lớn hơn? Xem Bộ 2' : 'Con còn nhỏ? Xem Bộ 1'}</h2>
            </div>
            <div className={`set-grid ${others.length === 1 ? 'single' : ''}`}>{others.map(o => <SetCard key={o.id} p={o} compact={others.length === 1} />)}</div>
          </>
        )}
      </div>
    </section>
  );
}

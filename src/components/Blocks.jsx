import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { REVIEWS, img, isSoon } from '../data';
import { useShop } from '../lib/ShopContext';
import { fmtDate, money, priceText } from '../lib/utils';
import { Arrow, Bell, Card, Chat, Clock, Cloud, Coin, Plus, Shield, Smile, Stars, Truck, Users } from './Icons';
import { ProductThumb } from './ProductArt';

export function ProductCard({ p }) {
  const { addToCart } = useShop();
  const soon = isSoon(p);
  return (
    <article className={`card p-card reveal ${soon ? 'soon' : ''}`}>
      <Link to={`/san-pham/${p.id}`} className="thumb">
        {soon ? <span className="tag soon-tag">Sắp ra mắt</span> : p.badge && <span className="tag">{p.badge}</span>}
        {p.age && <span className="age">{p.age}</span>}
        <ProductThumb p={p} />
      </Link>
      <div className="body">
        <h3><Link to={`/san-pham/${p.id}`}>{p.name}</Link></h3>
        {soon
          ? <div className="meta">{p.line || 'Sắp mở bán'}</div>
          : p.sold > 0 ? <div className="meta"><Stars n={p.rating} /> {p.rating} · Đã bán {p.sold.toLocaleString('vi-VN')}</div>
          : <div className="meta">{p.line || p.age}</div>}
        <div className="price-row">
          {soon
            ? <><div className="price soon-price">Sắp ra mắt</div><Link to={`/san-pham/${p.id}`} className="add-btn" aria-label={`Nhận tin khi ${p.name} ra mắt`}><Bell /></Link></>
            : <><div className="price">{priceText(p)}{p.oldPrice ? <s>{money(p.oldPrice)}</s> : null}</div>
              <button className="add-btn" onClick={() => addToCart(p.id)} aria-label="Thêm vào giỏ"><Plus /></button></>}
        </div>
      </div>
    </article>
  );
}

// Form đăng ký nhận tin khi sản phẩm ra mắt – lưu vào danh sách liên hệ (xem ở trang quản trị)
export function NotifyForm({ product }) {
  const { setMessages, toast } = useShop();
  const submit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    setMessages(m => [{ name: d.name, phone: d.contact, topic: 'Nhận tin sản phẩm', msg: `Báo khi ra mắt: ${product.name}`, date: new Date().toISOString().slice(0, 10) }, ...m]);
    e.target.reset();
    toast('Đã ghi nhận, Moni Yo sẽ báo bạn khi mở bán 🔔');
  };
  return (
    <form className="notify" onSubmit={submit}>
      <b><Bell size={18} />Sắp ra mắt</b>
      <p>Để lại tên và số điện thoại, Moni Yo sẽ báo bạn khi bắt đầu bán.</p>
      <div className="notify-row">
        <input className="input" name="name" placeholder="Tên của bạn" required />
        <input className="input" name="contact" placeholder="Số điện thoại hoặc email" required />
        <button className="btn">Nhận tin</button>
      </div>
    </form>
  );
}

// Thẻ giới thiệu lớn cho một bộ trò chơi (trang Sản phẩm, trang chủ)
export function SetCard({ p, compact }) {
  const { addToCart } = useShop();
  const to = `/san-pham/${p.id}`;
  const soon = isSoon(p);
  return (
    <article className={`set-card reveal ${compact ? 'compact' : ''}`} style={{ '--set': p.theme || 'var(--yellow)' }}>
      <Link to={to} className="set-art" aria-label={p.name}>
        <span className="set-no">Bộ {p.set}</span>
        <img src={p.img} alt={p.name} loading="lazy" decoding="async" />
      </Link>
      <div className="set-body">
        <span className="set-line">{p.line}</span>
        <h3><Link to={to}>{p.name}</Link></h3>
        <p>{p.short}</p>
        <ul className="set-facts">
          <li><Smile size={16} />{p.age}</li><li><Users size={16} />{p.players}</li><li><Clock size={16} />{p.time}</li>
        </ul>
        {!compact && p.learn && <ul className="set-learn">{p.learn.map(([h]) => <li key={h}>{h}</li>)}</ul>}
        <div className="set-price">
          <span className="price">{priceText(p)}{p.oldPrice ? <s>{money(p.oldPrice)}</s> : null}</span>
          {soon ? <span className="soon-pill">Sắp ra mắt</span> : p.sold > 0 && <span className="set-rating"><Stars n={p.rating} size={14} /> {p.rating} · Đã bán {p.sold.toLocaleString('vi-VN')}</span>}
        </div>
        <div className="set-ctas">
          {!soon && <button type="button" className="btn btn-sm btn-yellow" onClick={() => addToCart(p.id)}><Plus size={16} /> Thêm vào giỏ</button>}
          <Link to={to} className={`btn btn-sm ${soon ? '' : 'btn-light'}`}>Xem chi tiết <Arrow size={16} /></Link>
        </div>
      </div>
    </article>
  );
}

// Bài báo bên ngoài: mở trang báo gốc ở tab mới
export function PressCard({ a }) {
  return (
    <a className="press-card reveal" href={a.url} target="_blank" rel="noopener noreferrer">
      <span className="press-src">{a.source}<small>{fmtDate(a.date)}</small></span>
      <h3>{a.title}</h3>
      <p>{a.excerpt}</p>
      <span className="press-go">Đọc bài trên {a.source} <Arrow size={15} /></span>
    </a>
  );
}

export function BlogCard({ b }) {
  return (
    <article className="card b-card reveal">
      <Link to={`/blog/${b.id}`} className="thumb"><img src={b.img} alt="" loading="lazy" decoding="async" /><span className="cat">{b.cat}</span></Link>
      <div className="body">
        <span className="date">{fmtDate(b.date)} · {b.read} phút đọc</span>
        <h3><Link to={`/blog/${b.id}`}>{b.title}</Link></h3>
        <p>{b.excerpt}</p>
      </div>
    </article>
  );
}

const COMMITS = [
  [Truck, 'Giao toàn quốc', 'Đơn từ 500.000đ được miễn phí ship, thường nhận hàng sau 2–4 ngày.'],
  [Shield, 'Làm cho trẻ em', 'Chữ to, hình rõ, tình huống lấy từ chuyện hằng ngày của bé.'],
  [Card, 'Trả tiền dễ', 'Trả khi nhận hàng, chuyển khoản hoặc quét mã QR.'],
  [Chat, 'Cần hỏi gì cứ nhắn', 'Nhắn fanpage, gửi email hoặc gọi hotline cho nhóm Moni Yo.'],
];

export function CommitStrip() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container commit">
        {COMMITS.map(([Icon, h, p]) => (
          <div className="commit-item reveal" key={h}><span className="ic"><Icon /></span><div><h4>{h}</h4><p>{p}</p></div></div>
        ))}
      </div>
    </section>
  );
}

// Trạng thái trống (giỏ hàng trống, không tìm thấy trang…): nhân vật Moni Yo trên nền vàng tròn
export function EmptyState({ pic = 'kids-peek', title, children, action, as: H = 'h3' }) {
  return (
    <div className="empty-state">
      <div className="es-art"><img className="es-logo" src={img('brand/logo')} alt="Moni Yo" /><img src={img(`brand/${pic}`)} alt="" /></div>
      <H className="es-title">{title}</H>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

// Đầu trang con: chỉ tiêu đề + đường dẫn (đã bỏ nhãn nhỏ phía trên tiêu đề)
export function PageHero({ title, children }) {
  return (
    <section className="page-hero">
      <Cloud className="deco-l" style={{ top: 10, opacity: .7 }} />
      <Cloud className="deco-r" style={{ bottom: 0, opacity: .7 }} />
      <Coin style={{ left: '12%', bottom: 24 }} />
      <Coin style={{ right: '14%', top: 30, width: 40 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="title">{title}</h1>
        <div className="crumbs"><Link to="/trang-chu">Trang chủ</Link> / {children}</div>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, sub, style }) {
  return (
    <div className="section-head reveal" style={style}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="title">{title}</h2>
      {sub && <p className="subtitle">{sub}</p>}
    </div>
  );
}

const SLIDE_MS = 3500;

export function ReviewSlider() {
  const [perView, setPerView] = useState(() => (window.innerWidth <= 820 ? 1 : 2));
  const [i, setI] = useState(0);
  const pages = REVIEWS.length - perView + 1;

  useEffect(() => {
    const onResize = () => setPerView(window.innerWidth <= 820 ? 1 : 2);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  // Tự chuyển mỗi 3,5 giây; rê chuột / chạm vào thì tạm dừng để đọc
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setI(k => (k + 1) % pages), SLIDE_MS);
    return () => clearTimeout(t);
  }, [pages, i, paused]);

  const cur = i % pages;
  return (
    <div className={`slider ${paused ? 'paused' : ''}`} style={{ '--slide-ms': `${SLIDE_MS}ms` }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
      <div className="slides" style={{ transform: `translateX(-${cur * (100 / perView)}%)` }}>
        {REVIEWS.map(r => (
          <div className="slide" key={r.name}>
            <div className="review">
              <Stars n={r.stars} size={17} />
              <p>{r.text}</p>
              <div className="who">
                <span className="avatar">{r.name.split(' ').pop()[0]}</span>
                <div><b>{r.name}</b><div style={{ fontSize: 13, color: 'var(--muted)' }}>{r.city}</div></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="dots">
        {Array.from({ length: pages }, (_, j) => (
          <button key={j === cur ? `on${i}${paused}` : j} className={j === cur ? 'on' : ''} onClick={() => setI(j)} aria-label={`Trang ${j + 1}`} />
        ))}
      </div>
    </div>
  );
}

// Số đếm tăng dần khi cuộn tới
export function Counter({ to, suffix = '' }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = now => {
        const k = Math.min(1, (now - start) / 1200);
        setN(Math.round(to * k));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <b ref={ref}>{n.toLocaleString('vi-VN')}{n === to ? suffix : ''}</b>;
}

export function QtyInput({ value, onChange }) {
  return (
    <div className="qty">
      <button type="button" onClick={() => onChange(value - 1)}>−</button>
      <input value={value} onChange={e => onChange(parseInt(e.target.value) || 1)} inputMode="numeric" aria-label="Số lượng" />
      <button type="button" onClick={() => onChange(value + 1)}>+</button>
    </div>
  );
}

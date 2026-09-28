import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useShop } from '../lib/ShopContext';
import { CartIcon, Chat, Cloud, Menu, Phone } from './Icons';

const NAV = [
  ['/', 'Trang chủ'],
  ['/san-pham', 'Sản phẩm'],
  ['/gioi-thieu', 'Giới thiệu'],
  ['/ai', 'Trợ lý Heo Vàng', 'ai-link'],
  ['/blog', 'Blog'],
  ['/lien-he', 'Liên hệ'],
  // ['/admin', 'Quản trị'], // tạm ẩn nút; trang /admin vẫn truy cập trực tiếp được
];

export const Logo = () => (
  <Link to="/" className="logo" aria-label="Ước Mơ Kids – Trang chủ">
    <span className="logo-mark">₫</span>
    <span className="logo-text">Ước Mơ Kids<small>Tài chính nhí</small></span>
  </Link>
);

function Header() {
  const { totals } = useShop();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); }, [pathname]);
  return (
    <header className="header">
      <div className="container">
        <Logo />
        <nav className={`nav ${open ? 'open' : ''}`}>
          {NAV.map(([to, label, cls]) => (
            <NavLink key={to} to={to} end={to === '/'} className={cls}>{label}</NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <Link to="/gio-hang" className="icon-btn" aria-label="Giỏ hàng">
            <CartIcon /><span className="badge">{totals.count}</span>
          </Link>
          <Link to="/san-pham" className="btn btn-sm btn-cta">Đặt hàng ngay</Link>
          <button className="icon-btn menu-toggle" onClick={() => setOpen(o => !o)} aria-label="Mở menu"><Menu /></button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const { toast } = useShop();
  return (
    <footer className="footer">
      <Cloud className="deco-l" style={{ top: 20, opacity: .12, fill: '#FFD23F' }} />
      <div className="container">
        <div className="cols">
          <div>
            <Logo />
            <p style={{ fontSize: 14, marginTop: 18 }}>Đồ chơi giáo dục tài chính giúp trẻ hiểu giá trị lao động, biết chi tiêu và tiết kiệm – qua những giờ chơi vui vẻ cùng gia đình.</p>
            <div className="socials">
              <a href="#" aria-label="Facebook">f</a><a href="#" aria-label="Instagram">◎</a><a href="#" aria-label="YouTube">▶</a><a href="#" aria-label="TikTok">♪</a>
            </div>
          </div>
          <div>
            <h5>Liên kết nhanh</h5>
            <ul>
              <li><Link to="/">Trang chủ</Link></li><li><Link to="/san-pham">Sản phẩm</Link></li><li><Link to="/gioi-thieu">Giới thiệu sản phẩm</Link></li>
              <li><Link to="/blog">Góc phụ huynh</Link></li><li><Link to="/ai">Trợ lý AI</Link></li><li><Link to="/lien-he">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h5>Hỗ trợ</h5>
            <ul>
              <li><Link to="/gioi-thieu">Hướng dẫn chơi</Link></li><li><Link to="/lien-he">Chính sách đổi trả</Link></li><li><Link to="/lien-he">Vận chuyển</Link></li><li><Link to="/thanh-toan">Thanh toán</Link></li>
            </ul>
          </div>
          <div>
            <h5>Liên hệ &amp; đăng ký</h5>
            <ul>
              <li>📍 123 Đường Hạnh Phúc, Q. Cầu Giấy, Hà Nội</li>
              <li>📞 Hotline: 0900 123 456 (Zalo)</li>
              <li>✉️ xinchao@uocmokids.vn</li>
              <li>🕗 08:00 – 21:00, cả cuối tuần</li>
            </ul>
            <form className="subscribe" onSubmit={e => { e.preventDefault(); e.target.reset(); toast('Đã đăng ký nhận ưu đãi 🎉'); }}>
              <input type="email" required placeholder="Email của bạn..." />
              <button className="btn btn-yellow btn-sm">Đăng ký</button>
            </form>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 Ước Mơ Kids. Bản demo giao diện.</span>
          <span>Thiết kế với ♥ cho các nhà tài chính nhí</span>
        </div>
      </div>
    </footer>
  );
}

function Toast() {
  const { toastMsg } = useShop();
  return <div className={`toast ${toastMsg.show ? 'show' : ''}`}>{toastMsg.text}</div>;
}

// Hiệu ứng xuất hiện khi cuộn: theo dõi mọi .reveal mới được render
function useReveal(ref) {
  useEffect(() => {
    const root = ref.current;
    if (!('IntersectionObserver' in window)) { root.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .12 });
    const scan = () => root.querySelectorAll('.reveal:not(.in)').forEach(e => io.observe(e));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [ref]);
}

export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  useReveal(mainRef);
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  const isAdmin = pathname.startsWith('/admin');
  const hideFab = isAdmin || pathname === '/ai';

  return (
    <>
      <Header />
      <main ref={mainRef}><Outlet /></main>
      {!isAdmin && <Footer />}
      {!hideFab && (
        <div className="floating">
          <Link to="/ai" className="fab-ai" aria-label="Hỏi trợ lý AI"><Chat size={26} /></Link>
          <a href="tel:0900123456" className="fab-phone" aria-label="Gọi hotline"><Phone /></a>
        </div>
      )}
      <Toast />
    </>
  );
}

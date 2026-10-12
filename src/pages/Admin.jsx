import { useState } from 'react';
import { Link } from 'react-router-dom';
import Crop from '../components/Crop';
import { Box, Chart, Chat, Edit, LogOut, Receipt, Trash } from '../components/Icons';
import { BLOG, CROPS, DEFAULT_PRODUCTS } from '../data';
import { useShop } from '../lib/ShopContext';
import { fmtDate, money, noAccent } from '../lib/utils';

const TABS = [['dash', Chart, 'Tổng quan'], ['products', Box, 'Sản phẩm'], ['orders', Receipt, 'Đơn hàng'], ['msgs', Chat, 'Liên hệ'], ['posts', Edit, 'Bài viết']];
const STATUSES = ['Chờ xác nhận', 'Đang giao', 'Hoàn thành', 'Đã hủy'];
const STATUS_CLS = { 'Hoàn thành': 'st-ok', 'Đang giao': 'st-ship', 'Chờ xác nhận': 'st-wait', 'Đã hủy': 'st-cancel' };
const MONTHLY = [42, 55, 48, 70, 66, 88, 95, 110, 124];

function Login() {
  const { setIsAdmin, toast } = useShop();
  const submit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    if (d.u === 'admin' && d.p === '123456') setIsAdmin(true);
    else toast('Sai tài khoản hoặc mật khẩu');
  };
  return (
    <div className="container">
      <form className="panel login-box" onSubmit={submit}>
        <div style={{ textAlign: 'center' }}>
          <span className="logo-mark" style={{ margin: '0 auto 10px', width: 64, height: 64, fontSize: 26 }}>₫</span>
          <h3>Đăng nhập quản trị</h3>
        </div>
        <div className="field"><label>Tài khoản</label><input className="input" name="u" defaultValue="admin" autoComplete="username" /></div>
        <div className="field" style={{ marginTop: 12 }}><label>Mật khẩu</label><input className="input" type="password" name="p" placeholder="123456" autoComplete="current-password" /></div>
        <button className="btn btn-block" style={{ marginTop: 18 }}>Đăng nhập</button>
        <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>Demo: admin / 123456</p>
      </form>
    </div>
  );
}

function OrdersTable({ list, editable }) {
  const { setOrders, toast } = useShop();
  const setStatus = (id, status) => {
    setOrders(os => os.map(o => (o.id === id ? { ...o, status } : o)));
    toast('Đã cập nhật trạng thái');
  };
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Mã</th><th>Khách hàng</th><th>SĐT</th><th>SL</th><th>Tổng</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
        <tbody>
          {list.map(o => (
            <tr key={o.id}>
              <td><b>{o.id}</b></td><td>{o.name}</td><td>{o.phone}</td><td>{o.items}</td><td>{money(o.total)}</td><td>{fmtDate(o.date)}</td>
              <td>
                {editable
                  ? <select className="input" style={{ padding: '6px 10px', width: 'auto' }} value={o.status} onChange={e => setStatus(o.id, e.target.value)}>{STATUSES.map(s => <option key={s}>{s}</option>)}</select>
                  : <span className={`status ${STATUS_CLS[o.status] || 'st-wait'}`}>{o.status}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const { orders, products, messages } = useShop();
  const revenue = orders.filter(o => o.status !== 'Đã hủy').reduce((s, o) => s + o.total, 0);
  const max = Math.max(...MONTHLY);
  return (
    <>
      <h2>Tổng quan</h2>
      <div className="kpis">
        <div className="kpi"><span>Doanh thu (đơn gần đây)</span><b>{money(revenue)}</b><em>▲ 18% so với tuần trước</em></div>
        <div className="kpi"><span>Đơn hàng</span><b>{orders.length}</b><em>▲ {orders.filter(o => o.status === 'Chờ xác nhận').length} chờ xác nhận</em></div>
        <div className="kpi"><span>Sản phẩm</span><b>{products.length}</b><em>{products.reduce((s, p) => s + p.stock, 0)} tồn kho</em></div>
        <div className="kpi"><span>Tin nhắn liên hệ</span><b>{messages.length}</b><em>mới</em></div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <div className="panel">
          <h3>Doanh số theo tháng (triệu đồng)</h3>
          <div className="bars">{MONTHLY.map((v, i) => <div key={i}><b>{v}</b><i style={{ height: `${(v / max) * 85}%` }} />T{i + 1}</div>)}</div>
        </div>
        <div className="panel">
          <h3>Bán chạy</h3>
          {[...products].sort((a, b) => b.sold - a.sold).slice(0, 5).map(p => <div className="sum-line" key={p.id}><span>{p.name}</span><b>{p.sold}</b></div>)}
        </div>
      </div>
      <div className="panel" style={{ marginTop: 20 }}><h3>Đơn hàng mới nhất</h3><OrdersTable list={orders.slice(0, 5)} /></div>
    </>
  );
}

const EMPTY = { name: '', price: 0, oldPrice: '', stock: 0, age: '5–7 tuổi', img: 'yellow', crop: 'box', short: '', badge: '' };

function ProductModal({ product, onClose }) {
  const { setProducts, toast } = useShop();
  const p = product || EMPTY;
  const submit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    const data = { ...d, price: +d.price, oldPrice: +d.oldPrice || undefined, stock: +d.stock };
    if (product) setProducts(ps => ps.map(x => (x.id === product.id ? { ...x, ...data } : x)));
    else setProducts(ps => [{ ...data, id: noAccent(d.name).replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString(36), rating: 5, sold: 0, desc: d.short, includes: ['Đang cập nhật'] }, ...ps]);
    toast('Đã lưu sản phẩm ✔');
    onClose();
  };
  return (
    <div className="modal" onClick={e => e.target === e.currentTarget && onClose()}>
      <form className="panel" onSubmit={submit}>
        <h3>{product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
        <div className="form-grid">
          <div className="field full"><label>Tên sản phẩm *</label><input className="input" name="name" required defaultValue={p.name} /></div>
          <div className="field"><label>Giá bán *</label><input className="input" name="price" type="number" required defaultValue={p.price} /></div>
          <div className="field"><label>Giá gốc</label><input className="input" name="oldPrice" type="number" defaultValue={p.oldPrice || ''} /></div>
          <div className="field"><label>Tồn kho</label><input className="input" name="stock" type="number" defaultValue={p.stock} /></div>
          <div className="field"><label>Độ tuổi</label><input className="input" name="age" defaultValue={p.age} /></div>
          <div className="field"><label>Ảnh (bộ màu)</label>
            <select className="input" name="img" defaultValue={p.img}><option value="yellow">Vàng</option><option value="teal">Xanh ngọc</option></select>
          </div>
          <div className="field"><label>Vùng ảnh</label>
            <select className="input" name="crop" defaultValue={p.crop}>{Object.keys(CROPS).map(v => <option key={v}>{v}</option>)}</select>
          </div>
          <div className="field full"><label>Nhãn (badge)</label><input className="input" name="badge" defaultValue={p.badge || ''} /></div>
          <div className="field full"><label>Mô tả ngắn</label><textarea className="input" name="short" rows="2" defaultValue={p.short} /></div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 18 }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={onClose}>Hủy</button>
          <button className="btn btn-sm">Lưu</button>
        </div>
      </form>
    </div>
  );
}

function ProductsAdmin() {
  const { products, setProducts, toast } = useShop();
  const [editing, setEditing] = useState(null); // null: đóng, 'new': thêm mới, object: sửa
  const [confirmId, setConfirmId] = useState(null);
  const del = id => {
    if (confirmId !== id) return setConfirmId(id);
    setProducts(ps => ps.filter(p => p.id !== id));
    setConfirmId(null);
    toast('Đã xóa sản phẩm');
  };
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <h2>Sản phẩm</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm btn-ghost" onClick={() => { setProducts(structuredClone(DEFAULT_PRODUCTS)); toast('Đã khôi phục dữ liệu mẫu'); }}>Khôi phục mẫu</button>
          <button className="btn btn-sm" onClick={() => setEditing('new')}>+ Thêm sản phẩm</button>
        </div>
      </div>
      <div className="panel table-wrap">
        <table>
          <thead><tr><th>Ảnh</th><th>Tên</th><th>Giá</th><th>Tồn</th><th>Đã bán</th><th>Tuổi</th><th /></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><Crop img={p.img} area={p.crop} /></td><td><b>{p.name}</b></td><td>{money(p.price)}</td><td>{p.stock}</td><td>{p.sold}</td><td>{p.age}</td>
                <td className="row-actions">
                  <button onClick={() => setEditing(p)}><Edit size={14} />Sửa</button>
                  <button onClick={() => del(p.id)} style={confirmId === p.id ? { background: '#fee2e2' } : undefined}>{confirmId === p.id ? 'Xóa?' : <Trash size={14} />}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && <ProductModal product={editing === 'new' ? null : editing} onClose={() => setEditing(null)} />}
    </>
  );
}

function Messages() {
  const { messages } = useShop();
  return (
    <>
      <h2>Liên hệ từ khách hàng</h2>
      <div className="panel table-wrap">
        {messages.length ? (
          <table>
            <thead><tr><th>Ngày</th><th>Họ tên</th><th>SĐT</th><th>Chủ đề</th><th>Nội dung</th></tr></thead>
            <tbody>{messages.map((m, i) => <tr key={i}><td>{fmtDate(m.date)}</td><td>{m.name}</td><td>{m.phone}</td><td>{m.topic}</td><td style={{ whiteSpace: 'normal' }}>{m.msg}</td></tr>)}</tbody>
          </table>
        ) : <p className="empty">Chưa có tin nhắn. Thử gửi một lời nhắn ở trang <Link to="/lien-he" style={{ color: 'var(--orange)' }}>Liên hệ</Link>.</p>}
      </div>
    </>
  );
}

function Posts() {
  return (
    <>
      <h2>Bài viết</h2>
      <div className="panel table-wrap">
        <table>
          <thead><tr><th>Tiêu đề</th><th>Chuyên mục</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
          <tbody>{BLOG.map(b => <tr key={b.id}><td><Link to={`/blog/${b.id}`}><b>{b.title}</b></Link></td><td>{b.cat}</td><td>{fmtDate(b.date)}</td><td><span className="status st-ok">Đã đăng</span></td></tr>)}</tbody>
        </table>
      </div>
    </>
  );
}

export default function Admin() {
  const { isAdmin, setIsAdmin, orders } = useShop();
  const [tab, setTab] = useState('dash');
  if (!isAdmin) return <Login />;

  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="logo-text">Ước Mơ Admin</div>
        {TABS.map(([k, Icon, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}><Icon size={18} />{l}</button>)}
        <button onClick={() => setIsAdmin(false)}><LogOut />Đăng xuất</button>
      </aside>
      <div className="admin-main">
        {tab === 'dash' && <Dashboard />}
        {tab === 'products' && <ProductsAdmin />}
        {tab === 'orders' && <><h2>Đơn hàng</h2><div className="panel"><OrdersTable list={orders} editable /></div></>}
        {tab === 'msgs' && <Messages />}
        {tab === 'posts' && <Posts />}
      </div>
    </div>
  );
}

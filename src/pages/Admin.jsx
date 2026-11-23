import { useCallback, useEffect, useState } from 'react';
import { Card, Chart, Eye, EyeOff, LogOut, Receipt } from '../components/Icons';
import { useShop } from '../lib/ShopContext';
import { fmtDate, money } from '../lib/utils';
import Select from '../components/Select';
import { adminPass, api, ORDER_STATUS, PAY_METHOD, PAY_STATUS } from '../lib/api';
import { CountBars, DailyChart } from '../components/AdminCharts';

const TABS = [['dash', Chart, 'Tổng quan'], ['orders', Receipt, 'Đơn hàng'], ['payments', Card, 'Giao dịch SePay']];
const STATUS_OPTS = Object.entries(ORDER_STATUS).map(([v, [l]]) => [v, l]);

function Login() {
  const { setIsAdmin, toast } = useShop();
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const submit = async e => {
    e.preventDefault();
    const pass = new FormData(e.target).get('p');
    setBusy(true);
    adminPass.set(pass);
    try {
      await api('/admin/orders?limit=1', { admin: true });
      setIsAdmin(true);
    } catch (err) {
      adminPass.set('');
      toast(err.status === 401 ? 'Sai mật khẩu quản trị' : err.message);
    }
    setBusy(false);
  };
  return (
    <div className="container">
      <form className="panel login-box" onSubmit={submit}>
        <div style={{ textAlign: 'center' }}>
          <span className="logo-mark" style={{ margin: '0 auto 10px', width: 64, height: 64, fontSize: 26 }}>₫</span>
          <h3>Đăng nhập quản trị</h3>
        </div>
        <div className="field" style={{ marginTop: 12 }}>
          <label htmlFor="admin-pass">Mật khẩu quản trị</label>
          <div className="pass-wrap">
            <input className="input" id="admin-pass" type={show ? 'text' : 'password'} name="p" required autoComplete="current-password" />
            <button type="button" className="pass-eye" onClick={() => setShow(s => !s)} aria-label={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} aria-pressed={show} title={show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <button className="btn btn-block" style={{ marginTop: 18 }} disabled={busy}>{busy ? 'Đang kiểm tra…' : 'Đăng nhập'}</button>
      </form>
    </div>
  );
}

// Lấy đơn hàng từ máy chủ; mất phiên (401) thì quay về màn đăng nhập
function useOrders(filter = '') {
  const { setIsAdmin, toast } = useShop();
  const [data, setData] = useState(null);
  const load = useCallback(async () => {
    try { setData(await api(`/admin/orders${filter}`, { admin: true })); }
    catch (e) { if (e.status === 401) { adminPass.set(''); setIsAdmin(false); } else toast(e.message); }
  }, [filter, setIsAdmin, toast]);
  useEffect(() => { load(); }, [load]);
  return [data, load];
}

function OrdersTable({ list, editable, onChange }) {
  const { toast } = useShop();
  const patch = async (code, body) => {
    try { await api(`/admin/orders/${code}`, { method: 'PATCH', body, admin: true }); toast('Đã cập nhật đơn'); onChange?.(); }
    catch (e) { toast(e.message); }
  };
  if (!list) return <p className="empty">Đang tải…</p>;
  if (!list.length) return <p className="empty">Chưa có đơn hàng nào.</p>;
  return (
    <div className="table-wrap">
      <table>
        <thead><tr><th>Mã</th><th>Khách hàng</th><th>SĐT</th><th>Sản phẩm</th><th>Tổng</th><th>Thanh toán</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
        <tbody>
          {list.map(o => {
            const [pl, pc] = PAY_STATUS[o.payment_status] || PAY_STATUS.unpaid;
            const [sl, sc] = ORDER_STATUS[o.status] || ORDER_STATUS.pending;
            return (
              <tr key={o.code}>
                <td><b>{o.code}</b></td><td>{o.name}</td><td>{o.phone}</td>
                <td style={{ whiteSpace: 'normal' }}>{o.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</td>
                <td>{money(o.total)}</td>
                <td>
                  <span className={`status ${pc}`}>{pl}</span>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{PAY_METHOD[o.pay_method]}{o.paid_amount > 0 && o.payment_status !== 'paid' ? ` · đã nhận ${money(o.paid_amount)}` : ''}</div>
                  {editable && o.payment_status !== 'paid' && <button className="link-btn" onClick={() => patch(o.code, { markPaid: true })}>Đánh dấu đã thu</button>}
                </td>
                <td>{fmtDate(o.created_at)}</td>
                <td>
                  {editable
                    ? <Select size="sm" ariaLabel={`Trạng thái đơn ${o.code}`} value={o.status} onChange={v => patch(o.code, { status: v })} options={STATUS_OPTS} />
                    : <span className={`status ${sc}`}>{sl}</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const [data] = useOrders('?limit=5');
  const st = data?.stats;
  return (
    <>
      <h2>Tổng quan</h2>
      <div className="kpis">
        <div className="kpi"><span>Đã thu (đơn chưa hủy)</span><b>{st ? money(st.collected) : '…'}</b><em>Giá trị đơn: {st ? money(st.revenue) : '…'}</em></div>
        <div className="kpi"><span>Đơn hàng</span><b>{st ? st.orders : '…'}</b><em>{st ? st.pending : 0} chờ xác nhận</em></div>
        <div className="kpi"><span>Chờ chuyển khoản</span><b>{st ? st.awaiting_payment : '…'}</b><em>chưa nhận đủ tiền</em></div>
        <div className="kpi"><span>Còn phải thu</span><b>{st ? money(Math.max(st.revenue - st.collected, 0)) : '…'}</b><em>COD + chuyển khoản chưa đủ</em></div>
      </div>
      <Charts />
      <div className="panel" style={{ marginTop: 20 }}><h3>Đơn hàng mới nhất</h3><OrdersTable list={data?.orders} /></div>
    </>
  );
}

const RANGES = [[7, '7 ngày'], [14, '14 ngày'], [30, '30 ngày']];

function Charts() {
  const { toast } = useShop();
  const [days, setDays] = useState(14);
  const [s, setS] = useState(null);
  useEffect(() => {
    api(`/admin/stats?days=${days}`, { admin: true }).then(setS).catch(e => toast(e.message));
  }, [days, toast]);
  const rows = (map, list) => Object.entries(map).map(([key, [label]]) => ({ key, label, n: list.find(r => r.key === key)?.n || 0 }));
  return (
    <div className="charts">
      <div className="panel chart-wide">
        <div className="chart-head">
          <h3>Giá trị đơn theo ngày</h3>
          <div className="seg" role="group" aria-label="Khoảng thời gian">
            {RANGES.map(([v, l]) => <button key={v} type="button" className={days === v ? 'on' : ''} aria-pressed={days === v} onClick={() => setDays(v)}>{l}</button>)}
          </div>
        </div>
        <p className="chart-sub">Không tính đơn đã hủy · rê chuột vào cột để xem số đơn và tiền đã thu</p>
        {s ? <DailyChart daily={s.daily} /> : <p className="empty">Đang tải…</p>}
      </div>
      <div className="panel">
        <h3>Đơn theo trạng thái</h3>
        {s ? <CountBars label="Số đơn theo trạng thái giao hàng" rows={rows(ORDER_STATUS, s.byStatus)} /> : <p className="empty">Đang tải…</p>}
      </div>
      <div className="panel">
        <h3>Tình trạng thanh toán</h3>
        <p className="chart-sub">Đơn chưa hủy</p>
        {s ? <CountBars label="Số đơn theo tình trạng thanh toán" rows={rows(PAY_STATUS, s.byPayment)} /> : <p className="empty">Đang tải…</p>}
      </div>
    </div>
  );
}

function OrdersAdmin() {
  const [status, setStatus] = useState('');
  const [payment, setPayment] = useState('');
  const [q, setQ] = useState('');
  const qs = new URLSearchParams(Object.entries({ status, payment, q }).filter(([, v]) => v)).toString();
  const [data, reload] = useOrders(qs ? `?${qs}` : '');
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <h2>Đơn hàng</h2>
        <button className="btn btn-sm btn-ghost" onClick={reload}>Tải lại</button>
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        <input className="input" style={{ maxWidth: 260 }} placeholder="Tìm mã đơn, tên, SĐT…" value={q} onChange={e => setQ(e.target.value)} />
        <Select size="sm" ariaLabel="Lọc trạng thái" value={status} onChange={setStatus} options={[['', 'Mọi trạng thái'], ...STATUS_OPTS]} />
        <Select size="sm" ariaLabel="Lọc thanh toán" value={payment} onChange={setPayment} options={[['', 'Mọi thanh toán'], ...Object.entries(PAY_STATUS).map(([v, [l]]) => [v, l])]} />
      </div>
      <div className="panel"><OrdersTable list={data?.orders} editable onChange={reload} /></div>
    </>
  );
}

function Payments() {
  const { toast } = useShop();
  const [list, setList] = useState(null);
  useEffect(() => { api('/admin/payments', { admin: true }).then(d => setList(d.payments)).catch(e => toast(e.message)); }, [toast]);
  return (
    <>
      <h2>Giao dịch SePay</h2>
      <div className="panel table-wrap">
        {!list ? <p className="empty">Đang tải…</p> : !list.length ? <p className="empty">Chưa có giao dịch nào SePay gửi về.</p> : (
          <table>
            <thead><tr><th>Thời gian</th><th>Số tiền</th><th>Nội dung</th><th>Đơn khớp</th><th>Mã GD</th></tr></thead>
            <tbody>{list.map(p => (
              <tr key={p.sepay_id}>
                <td>{p.transaction_date}</td>
                <td style={{ color: p.transfer_type === 'in' ? 'var(--green)' : 'var(--red)' }}>{p.transfer_type === 'in' ? '+' : '−'}{money(p.amount)}</td>
                <td style={{ whiteSpace: 'normal' }}>{p.content}</td>
                <td>{p.order_code ? <b>{p.order_code}</b> : <span className="status st-cancel">Không khớp</span>}</td>
                <td>{p.reference_code}</td>
              </tr>
            ))}</tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default function Admin() {
  const { isAdmin, setIsAdmin } = useShop();
  const [tab, setTab] = useState('dash');
  if (!isAdmin) return <Login />;

  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="logo-text">Moni Yo Admin</div>
        {TABS.map(([k, Icon, l]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}><Icon size={18} />{l}</button>)}
        <button onClick={() => { adminPass.set(''); setIsAdmin(false); }}><LogOut />Đăng xuất</button>
      </aside>
      <div className="admin-main">
        {tab === 'dash' && <Dashboard />}
        {tab === 'orders' && <OrdersAdmin />}
        {tab === 'payments' && <Payments />}
      </div>
    </div>
  );
}

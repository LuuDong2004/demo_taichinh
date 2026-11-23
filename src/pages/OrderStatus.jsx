import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Check, Clock, X } from '../components/Icons';
import { useShop } from '../lib/ShopContext';
import { api, ORDER_STATUS, PAY_STATUS } from '../lib/api';
import { money } from '../lib/utils';
import NotFound from './NotFound';

const POLL_MS = 4000;
const POLL_FOR_MS = 30 * 60 * 1000; // đơn đã trả một phần (không có hạn 15 phút): hỏi tối đa 30 phút

// Đếm ngược tới hạn thanh toán do máy chủ đặt (giờ tạo đơn + 15 phút) → tải lại trang vẫn đúng thời gian còn lại
function Countdown({ until, skew, onEnd }) {
  const left = () => Math.max(0, new Date(until).getTime() - (Date.now() + skew));
  const [ms, setMs] = useState(left);
  useEffect(() => {
    setMs(left());
    const t = setInterval(() => {
      const v = left();
      setMs(v);
      if (v <= 0) { clearInterval(t); onEnd(); }
    }, 1000);
    return () => clearInterval(t);
  }, [until, skew]); // eslint-disable-line react-hooks/exhaustive-deps
  const sec = Math.ceil(ms / 1000);
  const mm = String(Math.floor(sec / 60)).padStart(2, '0');
  const ss = String(sec % 60).padStart(2, '0');
  return (
    <div className={`pay-timer ${sec <= 120 ? 'urgent' : ''}`} role="timer">
      <Clock size={18} /> Đơn được giữ trong <b>{mm}:{ss}</b>
    </div>
  );
}

function CopyText({ text }) {
  const [done, setDone] = useState(false);
  const copy = () => navigator.clipboard?.writeText(String(text)).then(() => { setDone(true); setTimeout(() => setDone(false), 1500); });
  return <button type="button" className="copy-btn" onClick={copy}>{done ? 'Đã chép' : 'Chép'}</button>;
}

function BankBox({ payment, partial, timer }) {
  return (
    <div className="pay-box">
      <div className="pay-qr"><img src={payment.qr} alt={`Mã VietQR chuyển ${money(payment.amount)} tới ${payment.bank}`} width="260" height="260" /></div>
      <div className="pay-info">
        {timer}
        <h3>{partial ? 'Chuyển thêm phần còn thiếu' : 'Quét mã để thanh toán'}</h3>
        <p className="muted">Mở app ngân hàng, quét mã QR. Số tiền và nội dung đã điền sẵn.</p>
        <dl>
          <div><dt>Ngân hàng</dt><dd>{payment.bank}</dd></div>
          <div><dt>Số tài khoản</dt><dd><b>{payment.account}</b><CopyText text={payment.account} /></dd></div>
          {payment.holder && <div><dt>Chủ tài khoản</dt><dd>{payment.holder}</dd></div>}
          <div><dt>Số tiền</dt><dd><b className="amt">{money(payment.amount)}</b><CopyText text={payment.amount} /></dd></div>
          <div><dt>Nội dung</dt><dd><b className="code">{payment.content}</b><CopyText text={payment.content} /></dd></div>
        </dl>
      </div>
    </div>
  );
}

export default function OrderStatus() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const key = params.get('k') || '';
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useShop();
  // Dữ liệu lúc vừa đặt chỉ để hiện ngay; luôn hỏi lại máy chủ (tải lại trang vẫn lấy trạng thái mới nhất)
  const [data, setData] = useState(state?.order ? { ...state, at: Date.now() } : null);
  const [missing, setMissing] = useState(false);
  const started = useRef(Date.now());
  // Lệch giờ giữa máy chủ và máy khách (ms) → đồng hồ đếm ngược đúng dù máy khách đặt sai giờ
  const skew = data?.now ? new Date(data.now).getTime() - data.at : 0;

  const load = async () => {
    try {
      const d = await api(`/orders/${encodeURIComponent(code)}?k=${encodeURIComponent(key)}`);
      setData({ ...d, at: Date.now() });
    } catch (e) {
      if (e.status === 404) setMissing(true);
    }
  };

  useEffect(() => { load(); }, [code, key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Chuyển khoản chưa xong → tự hỏi lại máy chủ, SePay báo nhận tiền là trang tự đổi sang "đã thanh toán"
  const waiting = data?.order.payMethod === 'bank' && data.order.paymentStatus !== 'paid' && data.order.status !== 'cancelled';
  const hasDeadline = Boolean(data?.order.expiresAt);
  useEffect(() => {
    if (!waiting) return;
    const t = setInterval(() => {
      if (!hasDeadline && Date.now() - started.current > POLL_FOR_MS) { clearInterval(t); return; }
      if (document.visibilityState === 'visible') load();
    }, POLL_MS);
    // Quay lại tab (vừa chuyển từ app ngân hàng về) → hỏi ngay
    const onShow = () => { if (document.visibilityState === 'visible') load(); };
    document.addEventListener('visibilitychange', onShow);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', onShow); };
  }, [waiting, hasDeadline]); // eslint-disable-line react-hooks/exhaustive-deps

  if (missing) return <NotFound />;
  if (!data) return <section className="section"><div className="container" style={{ textAlign: 'center' }}><p>Đang tải đơn hàng…</p></div></section>;

  const { order: o, payment } = data;
  const paid = o.paymentStatus === 'paid';
  const expired = o.status === 'cancelled' && o.cancelReason === 'expired';
  const reorder = () => {
    o.items.forEach(i => addToCart(i.id, i.qty, true));
    navigate('/gio-hang');
  };
  const [statusLabel, statusCls] = ORDER_STATUS[o.status] || ORDER_STATUS.pending;
  const [payLabel, payCls] = PAY_STATUS[o.paymentStatus] || PAY_STATUS.unpaid;

  return (
    <section className="section">
      <div className="container order-page">
        <div className="order-head">
          {o.status === 'cancelled'
            ? <div className="big off"><X size={48} /></div>
            : paid || o.payMethod === 'cod'
              ? <div className="big"><Check size={56} /></div>
              : <div className="big wait"><Clock size={52} /></div>}
          <h1 className="title" style={{ fontSize: 34 }}>
            {expired ? 'Đơn đã hết hạn thanh toán' : o.status === 'cancelled' ? 'Đơn hàng đã hủy' : paid ? 'Đã nhận thanh toán!' : o.payMethod === 'cod' ? 'Đặt hàng thành công!' : 'Chờ bạn chuyển khoản'}
          </h1>
          <p>
            {expired ? <>Đơn <b className="code">{o.code}</b> quá 15 phút chưa nhận được chuyển khoản nên đã tự hủy. Nếu bạn đã chuyển tiền, đơn sẽ tự mở lại khi ngân hàng báo về.</>
              : o.status === 'cancelled' ? <>Đơn <b className="code">{o.code}</b> đã được hủy. Cần hỗ trợ, bạn nhắn fanpage Moni Yo nhé.</>
              : <>Cảm ơn <b>{o.name}</b>! Mã đơn của bạn là <b className="code">{o.code}</b>.{' '}
            {paid ? 'Moni Yo sẽ gọi xác nhận và giao hàng sớm.' : o.payMethod === 'cod' ? <>Moni Yo sẽ gọi xác nhận qua số <b>{o.phone}</b>, bạn trả tiền khi nhận hàng.</> : 'Đơn sẽ tự xác nhận ngay khi Moni Yo nhận được tiền.'}</>}
          </p>
          <div className="order-tags"><span className={`status ${statusCls}`}>{statusLabel}</span><span className={`status ${payCls}`}>{payLabel}</span></div>
        </div>

        {waiting && payment?.qr && (
          <BankBox payment={payment} partial={o.paymentStatus === 'partial'}
            timer={o.expiresAt && <Countdown until={o.expiresAt} skew={skew} onEnd={load} />} />
        )}
        {expired && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <button type="button" className="btn btn-yellow" onClick={reorder}>Đặt lại đơn này</button>
          </div>
        )}

        <div className="panel order-sum">
          <h3>Đơn hàng {o.code}</h3>
          {o.items.map(i => <div className="sum-line" key={i.id}><span>{i.name} × {i.qty}</span><span>{money(i.price * i.qty)}</span></div>)}
          <hr style={{ border: 0, borderTop: '2px dashed var(--line)' }} />
          <div className="sum-line"><span>Tạm tính</span><span>{money(o.subtotal)}</span></div>
          {o.discount > 0 && <div className="sum-line" style={{ color: 'var(--green)' }}><span>Giảm giá</span><span>−{money(o.discount)}</span></div>}
          <div className="sum-line"><span>Phí vận chuyển</span><span>{o.shipping ? money(o.shipping) : 'Miễn phí'}</span></div>
          {o.paidAmount > 0 && !paid && <div className="sum-line"><span>Đã nhận</span><span>{money(o.paidAmount)}</span></div>}
          <div className="sum-line total"><span>Tổng cộng</span><span>{money(o.total)}</span></div>
        </div>
        <p className="muted" style={{ textAlign: 'center', fontSize: 13 }}>Lưu lại đường dẫn trang này để xem tình trạng đơn sau.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/trang-chu" className="btn">Về trang chủ</Link>
          <Link to="/blog" className="btn btn-yellow">Đọc góc phụ huynh</Link>
        </div>
      </div>
    </section>
  );
}

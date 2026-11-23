import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Check, Clock } from '../components/Icons';
import { api, ORDER_STATUS, PAY_STATUS } from '../lib/api';
import { money } from '../lib/utils';
import NotFound from './NotFound';

const POLL_MS = 4000;
const POLL_FOR_MS = 20 * 60 * 1000; // hỏi trạng thái tối đa 20 phút, sau đó khách bấm "Kiểm tra lại"

function CopyText({ text }) {
  const [done, setDone] = useState(false);
  const copy = () => navigator.clipboard?.writeText(String(text)).then(() => { setDone(true); setTimeout(() => setDone(false), 1500); });
  return <button type="button" className="copy-btn" onClick={copy}>{done ? 'Đã chép' : 'Chép'}</button>;
}

function BankBox({ payment, partial }) {
  return (
    <div className="pay-box">
      <div className="pay-qr"><img src={payment.qr} alt={`Mã VietQR chuyển ${money(payment.amount)} tới ${payment.bank}`} width="260" height="260" /></div>
      <div className="pay-info">
        <h3>{partial ? 'Chuyển thêm phần còn thiếu' : 'Quét mã để thanh toán'}</h3>
        <p className="muted">Mở app ngân hàng, chọn quét QR. Số tiền và nội dung đã điền sẵn.</p>
        <dl>
          <div><dt>Ngân hàng</dt><dd>{payment.bank}</dd></div>
          <div><dt>Số tài khoản</dt><dd><b>{payment.account}</b><CopyText text={payment.account} /></dd></div>
          {payment.holder && <div><dt>Chủ tài khoản</dt><dd>{payment.holder}</dd></div>}
          <div><dt>Số tiền</dt><dd><b className="amt">{money(payment.amount)}</b><CopyText text={payment.amount} /></dd></div>
          <div><dt>Nội dung</dt><dd><b className="code">{payment.content}</b><CopyText text={payment.content} /></dd></div>
        </dl>
        <p className="pay-note"><Clock size={16} /> Chuyển khoản thủ công thì nhớ ghi đúng nội dung <b>{payment.content}</b> để đơn tự xác nhận.</p>
      </div>
    </div>
  );
}

export default function OrderStatus() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const key = params.get('k') || '';
  const { state } = useLocation();
  const [data, setData] = useState(state?.order ? state : null);
  const [missing, setMissing] = useState(false);
  const [polling, setPolling] = useState(true);
  const started = useRef(Date.now());

  const load = async () => {
    try {
      setData(await api(`/orders/${encodeURIComponent(code)}?k=${encodeURIComponent(key)}`));
    } catch (e) {
      if (e.status === 404) setMissing(true);
    }
  };

  useEffect(() => { if (!state?.order) load(); }, [code, key]); // eslint-disable-line react-hooks/exhaustive-deps

  // Chuyển khoản chưa xong → tự hỏi lại máy chủ, SePay báo nhận tiền là trang tự đổi sang "đã thanh toán"
  const waiting = data?.order.payMethod === 'bank' && data.order.paymentStatus !== 'paid' && data.order.status !== 'cancelled';
  useEffect(() => {
    if (!waiting || !polling) return;
    const t = setInterval(() => {
      if (Date.now() - started.current > POLL_FOR_MS) { setPolling(false); return; }
      if (document.visibilityState === 'visible') load();
    }, POLL_MS);
    return () => clearInterval(t);
  }, [waiting, polling]); // eslint-disable-line react-hooks/exhaustive-deps

  if (missing) return <NotFound />;
  if (!data) return <section className="section"><div className="container" style={{ textAlign: 'center' }}><p>Đang tải đơn hàng…</p></div></section>;

  const { order: o, payment } = data;
  const paid = o.paymentStatus === 'paid';
  const [statusLabel, statusCls] = ORDER_STATUS[o.status] || ORDER_STATUS.pending;
  const [payLabel, payCls] = PAY_STATUS[o.paymentStatus] || PAY_STATUS.unpaid;

  return (
    <section className="section">
      <div className="container order-page">
        <div className="order-head">
          {paid || o.payMethod === 'cod'
            ? <div className="big"><Check size={56} /></div>
            : <div className="big wait"><Clock size={52} /></div>}
          <h1 className="title" style={{ fontSize: 34 }}>
            {o.status === 'cancelled' ? 'Đơn hàng đã hủy' : paid ? 'Đã nhận thanh toán!' : o.payMethod === 'cod' ? 'Đặt hàng thành công!' : 'Chờ bạn chuyển khoản'}
          </h1>
          <p>
            Cảm ơn <b>{o.name}</b>! Mã đơn của bạn là <b className="code">{o.code}</b>.{' '}
            {paid ? 'Moni Yo sẽ gọi xác nhận và giao hàng sớm.' : o.payMethod === 'cod' ? <>Moni Yo sẽ gọi xác nhận qua số <b>{o.phone}</b>, bạn trả tiền khi nhận hàng.</> : 'Đơn sẽ tự xác nhận ngay khi Moni Yo nhận được tiền.'}
          </p>
          <div className="order-tags"><span className={`status ${statusCls}`}>{statusLabel}</span><span className={`status ${payCls}`}>{payLabel}</span></div>
        </div>

        {waiting && payment?.qr && <BankBox payment={payment} partial={o.paymentStatus === 'partial'} />}
        {waiting && (
          <p className="poll-line">
            {polling ? <><span className="dot-pulse" /> Đang chờ ngân hàng báo về… trang tự cập nhật</> : 'Đã dừng tự kiểm tra.'}
            {' '}<button type="button" className="link-btn" onClick={() => { started.current = Date.now(); setPolling(true); load(); }}>Kiểm tra lại</button>
          </p>
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

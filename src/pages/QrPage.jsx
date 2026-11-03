import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { QR_INNER, QR_SIZE } from '../lib/qrMoniyo';
import { useLiquid } from '../lib/useLiquid';
import { img } from '../data';

/*
  Trang truyền thông (/truyen-thong): màn hình mã QR để nhóm mang ra sự kiện thay standee.
  - Chế độ PC: bố cục ngang phủ kín laptop / TV / máy chiếu.
  - Chế độ Mobile: màn dọc iPhone 18 Pro Max (440×956); trên máy tính hiện trong khung iPhone, thu nhỏ cho vừa.
  Chế độ lưu trên địa chỉ (?mode=pc | mobile) để gửi link mở đúng chế độ.
*/
const MODES = [['pc', 'PC'], ['mobile', 'Mobile']];

function QrCode({ className = '' }) {
  return (
    <div className={`qrp-card ${className}`}>
      <div className="qrp-qr">
        <svg className="qrp-code" viewBox={`-0.5 -0.5 ${QR_SIZE + 1} ${QR_SIZE + 1}`} role="img" aria-label="Mã QR tới moniyo.vn"
          dangerouslySetInnerHTML={{ __html: QR_INNER }} />
        <span className="qrp-qr-logo"><img src={img('brand/logo')} alt="" /></span>
      </div>
    </div>
  );
}

const UrlPill = () => (
  <a className="qrp-url" href="https://moniyo.vn">
    <i><svg viewBox="0 0 24 24" fill="none" stroke="#2A2117" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></i>
    moniyo.vn
  </a>
);

const Backdrop = ({ kids = true }) => (
  <div className="qrp-clip" aria-hidden="true">
    <span className="qrp-rays" /><span className="qrp-blob" />
    <span className="qrp-coin c1">đ</span><span className="qrp-coin c2">đ</span><span className="qrp-coin c3">đ</span>
    <span className="qrp-ground" />
    {kids && <img className="qrp-kids" src={img('brand/kids-jump')} alt="" />}
  </div>
);

function MobileScreen({ phoneRef }) {
  return (
    <main className="qrp-phone" ref={phoneRef}>
      <Backdrop />
      <span className="qrp-island" aria-hidden="true" />
      <img className="qrp-logo" src={img('brand/logo')} alt="Moni Yo" />
      <p className="qrp-sub">Board game giáo dục tài chính cho bé 5–15 tuổi</p>
      <QrCode />
      <UrlPill />
      <p className="qrp-hint">Mở Camera, hướng vào mã để ghé thăm</p>
    </main>
  );
}

function PcScreen() {
  return (
    <main className="qrp-pc">
      <Backdrop kids={false} />
      <section className="qrp-pc-info">
        <img className="qrp-pc-logo" src={img('brand/logo')} alt="Moni Yo" />
        <h1>Chơi thật vui,<br /><em>giỏi quản lý tiền</em></h1>
        <p>Board game giáo dục tài chính cho bé 5–15 tuổi</p>
        <ol className="qrp-steps">
          {['Chọn nghề', 'Kiếm tiền', 'Xử lý tình huống', 'Mua đủ đồ vật!'].map(s => <li key={s}>{s}</li>)}
        </ol>
        <img className="qrp-pc-kids" src={img('brand/kids-jump')} alt="Hai bạn nhỏ Moni Yo" />
      </section>
      <section className="qrp-pc-qr">
        <span className="qrp-scan">Quét mã để ghé thăm</span>
        <QrCode />
        <UrlPill />
      </section>
    </main>
  );
}

export default function QrPage() {
  const [params, setParams] = useSearchParams();
  const initial = typeof window !== 'undefined' && window.innerWidth >= 900 ? 'pc' : 'mobile';
  const mode = params.get('mode') === 'mobile' || params.get('mode') === 'pc' ? params.get('mode') : initial;
  const setMode = m => setParams({ mode: m }, { replace: true });

  const wrapRef = useRef(null);
  const [idle, setIdle] = useState(false);
  const [full, setFull] = useState(false);
  const [segRef, segInd] = useLiquid(mode, '.on');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Moni Yo · Truyền thông';
    // Trang này tự co giãn theo màn hình → tắt phóng to chung của web ở màn lớn (html zoom), tránh bị phóng hai lần
    document.documentElement.classList.add('no-zoom');
    // Chế độ Mobile trên máy tính: thu nhỏ khung iPhone cho vừa màn
    const fit = () => wrapRef.current?.style.setProperty('--fit', Math.min(1.5, (innerHeight - 64) / 956, (innerWidth - 64) / 440).toFixed(3));
    fit();
    // Thanh công cụ tự ẩn sau 2,5s không đụng chuột (lúc chiếu không vướng)
    let t;
    const wake = () => { setIdle(false); clearTimeout(t); t = setTimeout(() => setIdle(true), 2500); };
    wake();
    const onFs = () => setFull(!!document.fullscreenElement);
    addEventListener('resize', fit);
    addEventListener('pointermove', wake);
    addEventListener('touchstart', wake);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      clearTimeout(t); document.title = prevTitle; document.documentElement.classList.remove('no-zoom');
      removeEventListener('resize', fit); removeEventListener('pointermove', wake); removeEventListener('touchstart', wake);
      document.removeEventListener('fullscreenchange', onFs);
    };
  }, []);

  const toggleFull = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.())?.catch?.(() => {});

  return (
    <div className={`qrp mode-${mode}`} ref={wrapRef}>
      <div className={`qrp-bar ${idle ? 'idle' : ''}`}>
        <div className="qrp-seg" ref={segRef} role="tablist" aria-label="Chế độ hiển thị">
          <span className="liquid-ind qrp-seg-ind" ref={segInd} aria-hidden="true" />
          {MODES.map(([v, l]) => (
            <button key={v} type="button" role="tab" aria-selected={mode === v} className={mode === v ? 'on' : ''} onClick={() => setMode(v)}>{l}</button>
          ))}
        </div>
        <button type="button" className="qrp-fs" onClick={toggleFull} aria-label={full ? 'Thoát toàn màn hình' : 'Toàn màn hình'} title={full ? 'Thoát toàn màn hình' : 'Toàn màn hình'}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {full ? <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" /> : <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />}
          </svg>
        </button>
      </div>
      {mode === 'pc' ? <PcScreen /> : <MobileScreen />}
    </div>
  );
}

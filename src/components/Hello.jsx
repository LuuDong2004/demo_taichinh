import { useEffect, useState } from 'react';

// Màn chào toàn màn hình kiểu "hello" của Apple.
// Layout chỉ gắn component này khi trang được mở đúng ở địa chỉ gốc "/" (trang đó tự chuyển sang /trang-chu bên dưới),
// nên F5 hay bấm Trang chủ (đều là /trang-chu) không chào lại.
export default function Hello() {
  const [show, setShow] = useState(true);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return;
    document.documentElement.classList.add('hello-lock');

    // Chờ font viết tay tải xong (tối đa 1,2s) rồi mới bắt đầu viết chữ
    let alive = true;
    const go = () => alive && setReady(true);
    const fontWait = document.fonts?.load ? document.fonts.load('135px "Sriracha"', 'xin chào') : Promise.resolve();
    Promise.race([fontWait, new Promise(r => setTimeout(r, 1200))]).then(go, go);

    const skip = () => setLeaving(true);
    window.addEventListener('keydown', skip);
    return () => { alive = false; window.removeEventListener('keydown', skip); };
  }, [show]);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setLeaving(true), 4000);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.classList.remove('hello-lock');
    }, 700);
    return () => clearTimeout(t);
  }, [leaving]);

  if (!show) return null;
  return (
    <div className={`hello ${ready ? 'go' : ''} ${leaving ? 'out' : ''}`} onClick={() => setLeaving(true)} role="presentation">
      <div className="hello-logo-wrap"><img className="hello-logo" src="/img/brand/logo.webp" alt="Moni Yo" width="591" height="528" /></div>
      <svg className="hello-word" viewBox="0 0 600 200" aria-label="Xin chào">
        <defs>
          <linearGradient id="helloGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#FF7A1A" />
            <stop offset=".5" stopColor="#F2B705" />
            <stop offset="1" stopColor="#3DAE2B" />
          </linearGradient>
          <clipPath id="helloWipe"><rect className="hello-wipe" x="0" y="0" width="600" height="200" /></clipPath>
        </defs>
        <g clipPath="url(#helloWipe)">
          <text x="300" y="138" textAnchor="middle">xin chào</text>
        </g>
      </svg>
      <span className="hello-skip">Chạm để bỏ qua</span>
    </div>
  );
}

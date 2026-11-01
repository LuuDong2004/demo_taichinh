import { useEffect, useLayoutEffect, useRef } from 'react';

/*
  Nền trượt kiểu "chất lỏng" cho thanh tab (giống thanh chọn của Apple).
  - Gắn boxRef vào thanh tab, indRef vào <span> nền (position: absolute, nằm dưới các nút).
  - key: giá trị đổi khi chọn tab khác (id tab, đường dẫn...).
  - selector: cách tìm nút đang chọn trong thanh.
  Khi đổi tab: mép phía trước chạy nhanh, mép sau đuổi theo chậm hơn → nền dãn ra rồi co lại.
*/
export function useLiquid(key, selector = '[aria-selected="true"]') {
  const boxRef = useRef(null);
  const indRef = useRef(null);
  const last = useRef(null);

  const place = animate => {
    const box = boxRef.current, ind = indRef.current;
    if (!box || !ind) return;
    const btn = box.querySelector(selector);
    // Không có nút nào đang chọn (vd. đang ở trang chủ) → ẩn nền
    if (!btn || !btn.offsetWidth) { ind.style.opacity = '0'; last.current = null; return; }
    const l = btn.offsetLeft, t = btn.offsetTop, w = btn.offsetWidth, h = btn.offsetHeight;
    const prev = last.current;
    const dir = !prev ? 0 : Math.sign(l - prev.l) || Math.sign(t - prev.t);
    const moving = animate && dir;
    const fast = '.34s cubic-bezier(.3, 1.35, .5, 1)', slow = '.56s cubic-bezier(.6, 0, .2, 1)';
    const horiz = Math.abs(l - (prev?.l ?? l)) >= Math.abs(t - (prev?.t ?? t));
    const [lead, tail] = horiz ? (dir > 0 ? ['right', 'left'] : ['left', 'right']) : (dir > 0 ? ['bottom', 'top'] : ['top', 'bottom']);
    const [o1, o2] = horiz ? ['top', 'bottom'] : ['left', 'right'];
    const soft = '.45s cubic-bezier(.5, 0, .2, 1)';
    ind.style.transition = moving
      ? `${lead} ${fast}, ${tail} ${slow}, ${o1} ${soft}, ${o2} ${soft}, background-color .45s, opacity .2s`
      : 'opacity .2s';
    Object.assign(ind.style, {
      opacity: '1',
      left: `${l}px`, right: `${box.clientWidth - l - w}px`,
      top: `${t}px`, bottom: `${box.clientHeight - t - h}px`,
    });
    if (moving) {
      // Bóp dẹt nhẹ khi đang chạy cho cảm giác mềm như chất lỏng
      const squash = horiz ? ['1 1', '1 .78', '1 1.04', '1 1'] : ['1 1', '.9 1', '1.02 1', '1 1'];
      ind.animate(squash.map(scale => ({ scale })), { duration: 560, easing: 'ease-out' });
      // Thanh tab cuộn ngang (điện thoại) → đưa nút đang chọn vào giữa
      if (box.scrollWidth > box.clientWidth) box.scrollTo({ left: l - (box.clientWidth - w) / 2, behavior: 'smooth' });
    }
    last.current = { l, t };
  };
  const placeRef = useRef(place);
  placeRef.current = place;

  useLayoutEffect(() => { placeRef.current(true); }, [key]);
  // Ảnh tải xong / đổi cỡ màn → đặt lại vị trí ngay, không chạy hiệu ứng
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const ro = new ResizeObserver(() => placeRef.current(false));
    ro.observe(box);
    box.querySelectorAll('img').forEach(i => ro.observe(i));
    return () => ro.disconnect();
  }, []);

  return [boxRef, indRef];
}

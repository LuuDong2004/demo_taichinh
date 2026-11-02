import { useEffect, useLayoutEffect, useRef } from 'react';

/*
  Sliding pill indicator: viên nền bo tròn trượt êm sang tab được chọn (hai mép đi cùng nhau, không co giãn).
  - Gắn boxRef vào thanh tab, indRef vào <span> nền (position: absolute, nằm dưới các nút).
  - key: giá trị đổi khi chọn tab khác (id tab, đường dẫn...).
  - selector: cách tìm nút đang chọn trong thanh.
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
    const moving = animate && prev && (prev.l !== l || prev.t !== t);
    // Đặt lại do đổi cỡ (animate = false) thì giữ nguyên transition: nếu viên nền đang trượt dở thì vẫn trượt tiếp tới đích mới
    if (moving) {
      const ease = '.42s cubic-bezier(.32, .72, 0, 1)';
      ind.style.transition = `left ${ease}, right ${ease}, top ${ease}, bottom ${ease}, background-color .42s, opacity .2s`;
    } else if (animate) ind.style.transition = 'opacity .2s';
    Object.assign(ind.style, {
      opacity: '1',
      left: `${l}px`, right: `${box.clientWidth - l - w}px`,
      top: `${t}px`, bottom: `${box.clientHeight - t - h}px`,
    });
    // Thanh tab cuộn ngang (điện thoại) → đưa nút đang chọn vào giữa
    if (moving && box.scrollWidth > box.clientWidth) box.scrollTo({ left: l - (box.clientWidth - w) / 2, behavior: 'smooth' });
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

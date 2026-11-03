import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { Check } from './Icons';

/*
  Ô chọn tự vẽ, thay <select> mặc định của trình duyệt (khung vuông, nền xanh).
  - options: mảng chuỗi hoặc [giá trị, nhãn].
  - Dùng được trong form: có ô ẩn mang `name` (FormData đọc được), `required` vẫn báo lỗi, form.reset() đưa về giá trị đầu.
  - Có thể điều khiển (value + onChange) hoặc tự quản (defaultValue).
  - Menu định vị theo màn hình (position: fixed) nên không bị khung cuộn/bảng cắt mất; thiếu chỗ bên dưới thì mở lên trên.
  - Bàn phím: ↑ ↓ chọn, Enter/Space mở hoặc chọn, Esc đóng, gõ chữ cái để nhảy tới mục.
*/
const norm = o => (Array.isArray(o) ? o : [o, o]);
const Chevron = () => <svg className="sel-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;

export default function Select({ options, value, defaultValue, onChange, name, required, placeholder = 'Chọn...', className = '', size, ariaLabel }) {
  const opts = options.map(norm);
  const controlled = value !== undefined;
  const first = defaultValue ?? (placeholder && required ? '' : opts[0]?.[0] ?? '');
  const [inner, setInner] = useState(first);
  const val = controlled ? value : inner;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [pos, setPos] = useState(null);
  const boxRef = useRef(null), btnRef = useRef(null), menuRef = useRef(null), hiddenRef = useRef(null);
  const listId = useId();

  const current = opts.find(o => String(o[0]) === String(val));
  const pick = v => {
    if (!controlled) setInner(v);
    onChange?.(v);
    setOpen(false);
    btnRef.current?.focus();
  };

  // form.reset() → về giá trị ban đầu
  useEffect(() => {
    const form = hiddenRef.current?.form;
    if (!form || controlled) return;
    const onReset = () => setInner(first);
    form.addEventListener('reset', onReset);
    return () => form.removeEventListener('reset', onReset);
  }, [controlled, first]);

  // Đặt menu ngay dưới (hoặc trên) nút theo toạ độ màn hình
  const place = () => {
    // Màn lớn: web phóng to cả trang (html zoom) → đổi toạ độ màn hình về đơn vị CSS của trang
    const z = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
    const b = btnRef.current.getBoundingClientRect();
    const r = { left: b.left / z, top: b.top / z, bottom: b.bottom / z, width: b.width / z };
    const vh = innerHeight / z;
    const h = Math.min(opts.length * 42 + 14, 280);
    const up = vh - r.bottom < h + 12 && r.top > h + 12;
    setPos({ left: r.left, width: r.width, ...(up ? { bottom: vh - r.top + 6 } : { top: r.bottom + 6 }) });
  };
  useLayoutEffect(() => {
    if (!open) return;
    place();
    setActive(Math.max(0, opts.findIndex(o => String(o[0]) === String(val))));
    const close = e => { if (!boxRef.current.contains(e.target) && !menuRef.current?.contains(e.target)) setOpen(false); };
    const onScroll = e => { if (!menuRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    addEventListener('scroll', onScroll, true);
    addEventListener('resize', place);
    return () => { document.removeEventListener('mousedown', close); removeEventListener('scroll', onScroll, true); removeEventListener('resize', place); };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (open) menuRef.current?.children[active]?.scrollIntoView({ block: 'nearest' }); }, [active, open]);

  const onKey = e => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActive(a => (a + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) pick(opts[active][0]); else setOpen(true);
    } else if (e.key.length === 1 && open) {
      const i = opts.findIndex(o => String(o[1]).toLowerCase().startsWith(e.key.toLowerCase()));
      if (i >= 0) setActive(i);
    }
  };

  return (
    <div className={`sel ${open ? 'open' : ''} ${size === 'sm' ? 'sel-sm' : ''} ${className}`} ref={boxRef}>
      <button type="button" ref={btnRef} className="sel-btn" onClick={() => setOpen(o => !o)} onKeyDown={onKey}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} aria-label={ariaLabel}>
        <span className={current ? '' : 'sel-ph'}>{current ? current[1] : placeholder}</span>
        <Chevron />
      </button>
      {/* Ô ẩn để form đọc giá trị và kiểm tra "bắt buộc" */}
      <input ref={hiddenRef} className="sel-hidden" tabIndex={-1} aria-hidden="true" name={name} required={required}
        value={val ?? ''} onChange={() => {}} onFocus={() => btnRef.current?.focus()} />
      {open && pos && (
        <ul className="sel-menu" id={listId} role="listbox" ref={menuRef} style={pos}>
          {opts.map(([v, l], i) => {
            const on = String(v) === String(val);
            return (
              <li key={v} role="option" aria-selected={on} className={`${on ? 'on' : ''} ${i === active ? 'act' : ''}`}
                onMouseEnter={() => setActive(i)} onMouseDown={e => e.preventDefault()} onClick={() => pick(v)}>
                <span>{l}</span>{on && <Check size={16} />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

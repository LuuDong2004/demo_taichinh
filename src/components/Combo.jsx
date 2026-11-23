import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check } from './Icons';
import { noAccent } from '../lib/utils';

/*
  Ô chọn có gõ tìm (dùng cho danh sách dài như tỉnh/thành, phường/xã).
  - Gõ không dấu vẫn tìm được ("cau giay" → Phường Cầu Giấy).
  - Chỉ nhận giá trị nằm trong danh sách; ô ẩn mang `name` cho FormData và kiểm tra "bắt buộc".
  - Bàn phím: ↑ ↓ chọn, Enter chọn, Esc đóng.
*/
const MAX_SHOWN = 200;

export default function Combo({ options, value, onChange, name, required, disabled, placeholder = 'Chọn...', ariaLabel, emptyText = 'Không tìm thấy' }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null), listRef = useRef(null);
  const listId = useId();

  const index = useMemo(() => options.map(o => [o, noAccent(o)]), [options]);
  const shown = useMemo(() => {
    const k = noAccent(q.trim());
    return (k ? index.filter(([, n]) => n.includes(k)) : index).slice(0, MAX_SHOWN).map(([o]) => o);
  }, [index, q]);

  const openList = () => {
    if (disabled) return;
    setQ('');
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const pick = o => {
    onChange?.(o);
    setOpen(false);
    setQ('');
  };

  useEffect(() => { if (open) listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' }); }, [active, open]);

  const onKey = e => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { openList(); return; }
      if (shown.length) setActive(a => (a + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length);
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      if (shown[active]) pick(shown[active]);
    }
  };

  return (
    <div className={`sel combo ${open ? 'open' : ''} ${disabled ? 'disabled' : ''}`}>
      <input ref={inputRef} className="sel-btn combo-input" type="text" role="combobox" autoComplete="off" spellCheck={false}
        aria-label={ariaLabel} aria-expanded={open} aria-controls={listId} aria-autocomplete="list" disabled={disabled}
        placeholder={value || placeholder} value={open ? q : value || ''}
        onFocus={openList} onClick={() => !open && openList()} onBlur={() => setOpen(false)}
        onChange={e => { setQ(e.target.value); setActive(0); if (!open) setOpen(true); }} onKeyDown={onKey} />
      <svg className="sel-chev combo-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      {/* Ô ẩn để form đọc giá trị và kiểm tra "bắt buộc" */}
      <input className="sel-hidden" tabIndex={-1} aria-hidden="true" name={name} required={required}
        value={value || ''} onChange={() => {}} onFocus={() => inputRef.current?.focus()} />
      {open && (
        <ul className="sel-menu combo-menu" id={listId} role="listbox" ref={listRef} onMouseDown={e => e.preventDefault()}>
          {shown.length ? shown.map((o, i) => (
            <li key={o} role="option" aria-selected={o === value} className={`${o === value ? 'on' : ''} ${i === active ? 'act' : ''}`}
              onMouseEnter={() => setActive(i)} onClick={() => pick(o)}>
              <span>{o}</span>{o === value && <Check size={16} />}
            </li>
          )) : <li className="combo-empty" aria-disabled="true">{emptyText}</li>}
        </ul>
      )}
    </div>
  );
}

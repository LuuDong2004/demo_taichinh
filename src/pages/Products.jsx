import { useEffect, useMemo, useRef, useState } from 'react';
import { CommitStrip, PageHero, ProductCard } from '../components/Blocks';
import { Arrow, ArrowLeft, Check, Search, X } from '../components/Icons';
import { isSoon } from '../data';
import { useShop } from '../lib/ShopContext';
import { noAccent } from '../lib/utils';

const SORTS = [
  ['pop', 'Phổ biến nhất', (a, b) => b.sold - a.sold],
  ['new', 'Tên A → Z', (a, b) => a.name.localeCompare(b.name, 'vi')],
  ['asc', 'Giá tăng dần', (a, b) => a.price - b.price],
  ['desc', 'Giá giảm dần', (a, b) => b.price - a.price],
  ['rate', 'Đánh giá cao', (a, b) => b.rating - a.rating],
];
const kindOf = p => p.kind ?? (p.includes.length > 3 ? 'set' : 'addon');
const statusOf = p => (isSoon(p) ? 'soon' : 'sale');
const priceOf = p => (isSoon(p) ? null : p.price < 100000 ? 'lt100' : p.price <= 300000 ? '100-300' : 'gt300');

// Nhóm lọc: [khoá, tiêu đề, kiểu chọn, các lựa chọn [giá trị, nhãn], hàm lấy giá trị của sản phẩm]
const GROUPS = [
  ['status', 'Tình trạng', 'multi', [['sale', 'Đang bán'], ['soon', 'Sắp ra mắt']], statusOf],
  ['kind', 'Loại sản phẩm', 'multi', [['set', 'Bộ trò chơi đầy đủ'], ['addon', 'Phụ kiện mở rộng']], kindOf],
  ['price', 'Mức giá', 'single', [['lt100', 'Dưới 100.000đ'], ['100-300', '100.000 – 300.000đ'], ['gt300', 'Trên 300.000đ']], priceOf],
];
const EMPTY = { status: [], kind: [], price: [] };
const PER_PAGE = 6; // số sản phẩm mỗi trang

function SortMenu({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const close = e => { if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', close); };
  }, [open]);
  const current = SORTS.find(s => s[0] === value);
  return (
    <div className={`sort ${open ? 'open' : ''}`} ref={ref}>
      <button type="button" className="sort-btn" onClick={() => setOpen(o => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <SortIcon /><span className="sort-label">Sắp xếp:</span><b>{current[1]}</b><Chevron />
      </button>
      {open && (
        <ul className="sort-menu" role="listbox" aria-label="Sắp xếp sản phẩm">
          {SORTS.map(([k, l]) => (
            <li key={k} role="option" aria-selected={k === value}>
              <button type="button" onClick={() => { onChange(k); setOpen(false); }}>{l}{k === value && <Check size={16} />}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const SortIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 4v16M3 16l4 4 4-4M17 20V4M13 8l4-4 4 4" /></svg>;
const Chevron = () => <svg className="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;
const FilterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 5h18M6 12h12M10 19h4" /></svg>;

export default function Products() {
  const { products } = useShop();
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(EMPTY);
  const [sort, setSort] = useState('pop');
  const [panelOpen, setPanelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);
  // Đổi tìm kiếm / bộ lọc / sắp xếp thì quay về trang 1
  useEffect(() => { setPage(1); }, [q, sel, sort]);

  const pick = (key, mode, v) => setSel(s => ({
    ...s,
    [key]: s[key].includes(v) ? s[key].filter(x => x !== v) : mode === 'single' ? [v] : [...s[key], v],
  }));
  const activeCount = Object.values(sel).flat().length;

  const list = useMemo(() => {
    const nq = noAccent(q.trim());
    const cmp = SORTS.find(s => s[0] === sort)[2];
    return products
      .filter(p => (!nq || noAccent(p.name + ' ' + p.short).includes(nq))
        && GROUPS.every(([key, , , , get]) => !sel[key].length || sel[key].includes(get(p))))
      .sort((a, b) => isSoon(a) - isSoon(b) || cmp(a, b));
  }, [products, q, sel, sort]);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const cur = Math.min(page, pages);
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE);
  const goPage = n => {
    setPage(n);
    const top = gridRef.current.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const chips = GROUPS.flatMap(([key, , mode, opts]) => sel[key].map(v => [key, mode, v, opts.find(o => o[0] === v)[1]]));

  return (
    <>
      <PageHero eyebrow="Cửa hàng" title="Tất cả sản phẩm">Sản phẩm</PageHero>
      <section className="section">
        <div className="container shop">
          <aside className={`filter ${panelOpen ? 'open' : ''}`} aria-label="Bộ lọc sản phẩm">
            <div className="filter-head">
              <h3><FilterIcon />Bộ lọc{activeCount > 0 && <span className="count-dot">{activeCount}</span>}</h3>
              {activeCount > 0 && <button type="button" className="link-btn" onClick={() => setSel(EMPTY)}>Xóa tất cả</button>}
            </div>
            {/* Ẩn nhóm chưa có sản phẩm nào (vd. Mức giá khi mọi sản phẩm đều sắp ra mắt) */}
            {GROUPS.filter(([, , , opts, get]) => opts.some(([v]) => products.some(p => get(p) === v))).map(([key, title, mode, opts, get]) => (
              <fieldset className="fgroup" key={key}>
                <legend>{title}</legend>
                {opts.map(([v, label]) => {
                  const on = sel[key].includes(v);
                  const n = products.filter(p => get(p) === v).length;
                  return (
                    <button type="button" key={v} className={`fopt ${mode} ${on ? 'on' : ''}`} aria-pressed={on} onClick={() => pick(key, mode, v)} disabled={!n && !on}>
                      <span className="fbox">{on && <Check size={13} />}</span>
                      <span className="flabel">{label}</span>
                      <span className="fcount">{n}</span>
                    </button>
                  );
                })}
              </fieldset>
            ))}
          </aside>
          <div>
            <div className="toolbar">
              <label className="search-wrap"><Search /><input className="input search" value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm sản phẩm..." /></label>
              <div className="toolbar-right">
                <button type="button" className="filter-toggle" onClick={() => setPanelOpen(o => !o)} aria-expanded={panelOpen}>
                  <FilterIcon />Bộ lọc{activeCount > 0 && <span className="count-dot">{activeCount}</span>}
                </button>
                <span className="result-count">{list.length ? <>Hiển thị <b>{(cur - 1) * PER_PAGE + 1}–{(cur - 1) * PER_PAGE + shown.length}</b> / {list.length} sản phẩm</> : <><b>0</b> sản phẩm</>}</span>
                <SortMenu value={sort} onChange={setSort} />
              </div>
            </div>
            {chips.length > 0 && (
              <div className="active-chips">
                {chips.map(([key, mode, v, label]) => (
                  <button type="button" key={key + v} onClick={() => pick(key, mode, v)} aria-label={`Bỏ lọc ${label}`}>{label}<X size={12} /></button>
                ))}
                <button type="button" className="link-btn" onClick={() => setSel(EMPTY)}>Xóa tất cả</button>
              </div>
            )}
            <div className="grid grid-3" ref={gridRef}>
              {list.length ? shown.map(p => <ProductCard key={p.id} p={p} />)
                : (
                  <div className="empty" style={{ gridColumn: '1/-1' }}>
                    <p>Không tìm thấy sản phẩm phù hợp</p>
                    <button type="button" className="btn btn-light btn-sm" onClick={() => { setSel(EMPTY); setQ(''); }}>Xóa bộ lọc</button>
                  </div>
                )}
            </div>
            {list.length > 0 && (
              <nav className="pager" aria-label="Phân trang sản phẩm">
                <button type="button" className="pg-arrow" onClick={() => goPage(cur - 1)} disabled={cur === 1} aria-label="Trang trước"><ArrowLeft size={18} /></button>
                {Array.from({ length: pages }, (_, i) => i + 1).map(n => (
                  <button type="button" key={n} className={n === cur ? 'on' : ''} onClick={() => goPage(n)} aria-current={n === cur ? 'page' : undefined}>{n}</button>
                ))}
                <button type="button" className="pg-arrow" onClick={() => goPage(cur + 1)} disabled={cur === pages} aria-label="Trang sau"><Arrow size={18} /></button>
                <span className="pg-info">Trang {cur} / {pages}</span>
              </nav>
            )}
          </div>
        </div>
      </section>
      <CommitStrip />
    </>
  );
}

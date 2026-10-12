import { useMemo, useState } from 'react';
import { CommitStrip, PageHero, ProductCard } from '../components/Blocks';
import { Search } from '../components/Icons';
import { useShop } from '../lib/ShopContext';
import { noAccent } from '../lib/utils';

const PRICES = [['all', 'Tất cả'], ['0-100000', 'Dưới 100.000đ'], ['100000-300000', '100.000 – 300.000đ'], ['300000-9999999', 'Trên 300.000đ']];
const SORTS = { pop: (a, b) => b.sold - a.sold, asc: (a, b) => a.price - b.price, desc: (a, b) => b.price - a.price, rate: (a, b) => b.rating - a.rating };
const kindOf = p => (p.includes.length > 3 ? 'set' : 'addon');
const toggle = (list, v) => (list.includes(v) ? list.filter(x => x !== v) : [...list, v]);

export default function Products() {
  const { products } = useShop();
  const [q, setQ] = useState('');
  const [ages, setAges] = useState([]);
  const [price, setPrice] = useState('all');
  const [kinds, setKinds] = useState([]);
  const [sort, setSort] = useState('pop');

  const allAges = [...new Set(products.map(p => p.age))];
  const list = useMemo(() => {
    const nq = noAccent(q.trim());
    const [lo, hi] = price.split('-').map(Number);
    return products
      .filter(p => (!nq || noAccent(p.name + ' ' + p.short).includes(nq))
        && (!ages.length || ages.includes(p.age))
        && (price === 'all' || (p.price >= lo && p.price <= hi))
        && (!kinds.length || kinds.includes(kindOf(p))))
      .sort(SORTS[sort]);
  }, [products, q, ages, price, kinds, sort]);

  return (
    <>
      <PageHero eyebrow="Cửa hàng" title="Tất cả sản phẩm">Sản phẩm</PageHero>
      <section className="section">
        <div className="container shop">
          <aside className="filter">
            <div className="group">
              <h4>Độ tuổi</h4>
              {allAges.map(a => <label key={a}><input type="checkbox" checked={ages.includes(a)} onChange={() => setAges(toggle(ages, a))} /> {a}</label>)}
            </div>
            <div className="group">
              <h4>Mức giá</h4>
              {PRICES.map(([v, l]) => <label key={v}><input type="radio" name="price" checked={price === v} onChange={() => setPrice(v)} /> {l}</label>)}
            </div>
            <div className="group">
              <h4>Loại</h4>
              <label><input type="checkbox" checked={kinds.includes('set')} onChange={() => setKinds(toggle(kinds, 'set'))} /> Bộ trò chơi đầy đủ</label>
              <label><input type="checkbox" checked={kinds.includes('addon')} onChange={() => setKinds(toggle(kinds, 'addon'))} /> Phụ kiện mở rộng</label>
            </div>
          </aside>
          <div>
            <div className="toolbar">
              <label className="search-wrap"><Search /><input className="input search" value={q} onChange={e => setQ(e.target.value)} placeholder="Tìm sản phẩm..." /></label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>{list.length} sản phẩm</span>
                <select className="input" style={{ width: 'auto' }} value={sort} onChange={e => setSort(e.target.value)}>
                  <option value="pop">Bán chạy</option><option value="asc">Giá tăng dần</option><option value="desc">Giá giảm dần</option><option value="rate">Đánh giá cao</option>
                </select>
              </div>
            </div>
            <div className="grid grid-3">
              {list.length ? list.map(p => <ProductCard key={p.id} p={p} />)
                : <p className="empty" style={{ gridColumn: '1/-1' }}>Không tìm thấy sản phẩm phù hợp</p>}
            </div>
          </div>
        </div>
      </section>
      <CommitStrip />
    </>
  );
}

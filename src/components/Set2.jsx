import { useState } from 'react';
import { BUSINESSES, HOUSES, NOTES_2, RULES_2, SETUP_2, START_MONEY_2, STRATEGY_2, TILES_2, TUIMU_2, TUIMU_2_GROUPS, WIN_2, img } from '../data';
import { useLiquid } from '../lib/useLiquid';
import { SectionHead } from './Blocks';
import { Lightbox } from './Game';

// 40 thẻ Túi mù Bộ 2 (20 mẫu × 2 lá), lọc theo nhóm, bấm để xem lớn
export function TuiMu2Browser() {
  const [group, setGroup] = useState('all');
  const [open, setOpen] = useState(null);
  const [ref, ind] = useLiquid(group, '.on');
  const cards = TUIMU_2.map(([g, title, value, text], i) => ({ g, title, value, text, src: img(`product/bo2-tuimu/${i + 1}`) }))
    .filter(c => group === 'all' || c.g === group);
  const desc = TUIMU_2_GROUPS.find(([k]) => k === group)?.[2] || 'Mỗi mẫu có 2 lá, tổng cộng 40 thẻ. Bấm vào thẻ để xem lớn.';
  return (
    <>
      <div className="blog-cats" ref={ref}>
        <span className="liquid-ind cats-ind" ref={ind} aria-hidden="true" />
        <button className={group === 'all' ? 'on' : ''} onClick={() => setGroup('all')}>Tất cả ({TUIMU_2.length})</button>
        {TUIMU_2_GROUPS.map(([k, l]) => <button key={k} className={group === k ? 'on' : ''} onClick={() => setGroup(k)}>{l} ({TUIMU_2.filter(c => c[0] === k).length})</button>)}
      </div>
      <p className="subtitle" style={{ textAlign: 'center', marginBottom: 22 }}>{desc}</p>
      <div className="card-grid">
        {cards.map((c, i) => (
          <button key={c.src} className="game-card" onClick={() => setOpen(i)} aria-label={`${c.title}: ${c.value}. ${c.text}`}>
            <img src={c.src} alt="" loading="lazy" />
            <span><b>{c.value}</b>{c.title}</span>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox items={cards.map(c => ({ src: c.src, caption: `${c.title} · ${c.text}` }))} index={open} onClose={() => setOpen(null)} />}
    </>
  );
}

// 12 thẻ Doanh nghiệp: giá mua và phí đi qua in trên thẻ
export function BusinessCards({ limit, small }) {
  return (
    <div className={`biz-grid ${small ? "small" : ""}`}>
      {BUSINESSES.slice(0, limit).map(([name, price, fee], i) => (
        <figure className="biz reveal" key={name}>
          <img src={img(`product/bo2-biz/${i + 1}`)} alt={`Thẻ doanh nghiệp ${name}: giá mua ${price} đồng, phí đi qua ${fee} đồng`} loading="lazy" />
          <figcaption><b>{name}</b><span>Mua {price} · Phí {fee}</span></figcaption>
        </figure>
      ))}
    </div>
  );
}

// Tiền Bộ 2: 9 mệnh giá
export function Notes2() {
  return (
    <div className="notes-row">
      {NOTES_2.map(v => <img key={v} src={img(`product/bo2-notes/${v}`)} alt={`Tiền Moni Yo ${v} đồng`} loading="lazy" />)}
    </div>
  );
}

// Luật chơi Bộ 2, tóm tắt theo sách hướng dẫn
export default function Set2Guide() {
  return (
    <div className="set2-guide">
      <SectionHead eyebrow="Chuẩn bị" title="Trước khi chơi" />
      <ol className="rule-steps">
        {SETUP_2.map(([h, p], i) => <li className="reveal" key={h}><b>Bước {i + 1}: {h}</b><p>{p}</p></li>)}
      </ol>
      <div className="start-money reveal">
        <span>Mỗi người bắt đầu với <b>{START_MONEY_2} đồng</b>.</span>
        <small>Tiền Bộ 2 có {NOTES_2.length} mệnh giá: {NOTES_2.join(', ')} đồng</small>
      </div>
      <Notes2 />

      <SectionHead eyebrow="Mỗi lượt" title="Tung 2 xúc xắc, đi theo chiều kim đồng hồ, làm theo ô" style={{ marginTop: 44 }} />
      <div className="tiles2">
        {TILES_2.map(([h, p]) => <div className="tile reveal" key={h}><div><h4>{h}</h4><p>{p}</p></div></div>)}
      </div>

      <SectionHead eyebrow="12 doanh nghiệp" title="Mua doanh nghiệp, thu phí đi qua" sub="Mỗi thẻ ghi giá mua và phí người khác phải trả khi đi vào. Chỗ càng đắt thì phí càng cao." style={{ marginTop: 44 }} />
      <BusinessCards />
      <div className="panel rules-box reveal">
        <h3>Cần nhớ</h3>
        <ol>{RULES_2.map(r => <li key={r}>{r}</li>)}</ol>
      </div>

      <SectionHead eyebrow="40 thẻ Túi mù" title="Thẻ Túi mù của Bộ 2" sub="Dừng ở ô Túi mù thì rút 1 thẻ: có thể được thưởng, bị đánh thuế, bị đẩy tới ô khác, hay được bảo vệ nhà." style={{ marginTop: 44 }} />
      <TuiMu2Browser />

      <SectionHead eyebrow="Về đích" title="Xây đủ 4 mức nhà" sub={WIN_2} style={{ marginTop: 44 }} />
      <div className="houses">
        {HOUSES.map(([h, price, c]) => (
          <div className="house reveal" key={h} style={{ '--c': c }}>
            <svg viewBox="0 0 64 56" aria-hidden="true"><path d="M32 4 4 28h8v24h40V28h8L46 15.5V7h-7v2.4Z" fill="var(--c)" /><rect x="26" y="34" width="12" height="18" rx="2" fill="#fff" opacity=".85" /></svg>
            <b>{h}</b><span>{price.toLocaleString('vi-VN')} đồng</span>
          </div>
        ))}
      </div>

      <SectionHead eyebrow="Mẹo chơi" title="Vài cách chơi khôn" style={{ marginTop: 44 }} />
      <div className="tips tips-grid">
        {STRATEGY_2.map(([h, p], i) => <div className="tip reveal" key={h}><span>{i + 1}</span><div><h4>{h}</h4><p>{p}</p></div></div>)}
      </div>
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';
import { CARDS, JOBS, TILES, img } from '../data';
import { ArrowLeft, Arrow, X } from './Icons';

const itemImg = id => img(`items/${id}`);

// Chọn 1 trong 8 nghề → thẻ nghề (nền + nhân vật) và 4 thẻ đồ vật cần thu thập
export function JobExplorer() {
  const [active, setActive] = useState(JOBS[0].id);
  const job = JOBS.find(j => j.id === active);
  return (
    <div className="jobs" style={{ '--job': job.color }}>
      <div className="job-tabs" role="tablist" aria-label="8 nghề nghiệp">
        {JOBS.map(j => (
          <button key={j.id} role="tab" aria-selected={j.id === active} className={j.id === active ? 'on' : ''} style={{ '--job': j.color }} onClick={() => setActive(j.id)}>
            <span className="job-face"><img src={img(`jobs/${j.id}`)} alt="" loading="lazy" /></span>
            {j.short || j.name}
          </button>
        ))}
      </div>
      <div className="job-stage" key={job.id}>
        <div className="job-card" style={{ backgroundImage: `url(${img(`jobs/${job.id}-bg`)})` }}>
          <span className="job-card-label">Thẻ nghề nghiệp<b>{job.name}</b></span>
          <img className="job-char" src={img(`jobs/${job.id}`)} alt={job.name} />
          <img className="job-strip" src={img(`jobs/${job.id}-items`)} alt="" />
        </div>
        <div className="job-info">
          <h3>{job.name}</h3>
          <p>{job.about}</p>
          <p className="job-goal">Thu thập đủ <b>4 thẻ Đồ vật</b> dưới đây để chiến thắng:</p>
          <div className="job-items">
            {job.items.map(([id, name]) => (
              <figure key={id}><img src={itemImg(id)} alt={name} loading="lazy" /></figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TileGrid({ compact }) {
  return (
    <div className={`tiles ${compact ? 'compact' : ''}`}>
      {TILES.map((t, i) => (
        <div className="tile reveal" key={t.id}>
          <span className="tile-ic" style={{ '--tile': t.color }}><img src={img(`tiles/${t.id}`)} alt="" loading="lazy" /></span>
          <div><h4><small>{i + 1}</small>{t.name}</h4><p>{t.text}</p></div>
        </div>
      ))}
    </div>
  );
}

export const DECKS = [
  { id: 'cong', name: 'Thẻ Cộng tiền', color: 'var(--green)', desc: 'Tình huống giúp bé nhận thêm tiền: bán đồ cũ, làm thiệp, tiết kiệm, so sánh giá…',
    cards: CARDS.cong.map(([s, t, v]) => ({ src: img(`cards/cong/${s}`), title: t, value: `+${v} đồng` })) },
  { id: 'tru', name: 'Thẻ Trừ tiền', color: 'var(--red)', desc: 'Những khoản chi phát sinh bé cần dùng tiền để giải quyết: mua đồ học tập, sửa xe, làm mất tiền…',
    cards: CARDS.tru.map(([s, t, v]) => ({ src: img(`cards/tru/${s}`), title: t, value: `−${v} đồng` })) },
  { id: 'tui-mu', name: 'Thẻ Túi mù', color: 'var(--yellow-2)', desc: 'Điều bất ngờ đang chờ bé: được thưởng, mất tiền hoặc một hiệu ứng đặc biệt.',
    cards: CARDS.tuiMu.map(([s, t, v]) => ({ src: img(`cards/tui-mu/${s}`), title: t, value: v })) },
];

// 3 thẻ xoè quạt đại diện cho mỗi bộ
export function DeckFan({ deck, picks = [0, 1, 2] }) {
  return (
    <div className="fan" aria-hidden="true">
      {picks.map(i => <img key={i} src={deck.cards[i].src} alt="" loading="lazy" />)}
    </div>
  );
}

// Lưới toàn bộ thẻ theo từng bộ, bấm để phóng to
export function CardBrowser() {
  const [deckId, setDeckId] = useState(DECKS[0].id);
  const deck = DECKS.find(d => d.id === deckId);
  const [open, setOpen] = useState(null);
  return (
    <>
      <div className="blog-cats">
        {DECKS.map(d => <button key={d.id} className={d.id === deckId ? 'on' : ''} onClick={() => setDeckId(d.id)}>{d.name} ({d.cards.length})</button>)}
      </div>
      <p className="subtitle" style={{ textAlign: 'center', marginBottom: 22 }}>{deck.desc}</p>
      <div className="card-grid">
        {deck.cards.map((c, i) => (
          <button key={c.src} className="game-card" onClick={() => setOpen(i)} aria-label={`${c.title}: ${c.value}`}>
            <img src={c.src} alt="" loading="lazy" />
            <span><b>{c.value}</b>{c.title}</span>
          </button>
        ))}
      </div>
      {open !== null && <Lightbox items={deck.cards.map(c => ({ src: c.src, caption: `${c.title} · ${c.value}` }))} index={open} onClose={() => setOpen(null)} />}
    </>
  );
}

export function Lightbox({ items, index, onClose }) {
  const [i, setI] = useState(index);
  const go = useCallback(d => setI(k => (k + d + items.length) % items.length), [items.length]);
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [go, onClose]);
  const it = items[i];
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={it.caption} onClick={e => e.target === e.currentTarget && onClose()}>
      <button className="lb-close" onClick={onClose} aria-label="Đóng"><X size={20} /></button>
      {items.length > 1 && <button className="lb-nav prev" onClick={() => go(-1)} aria-label="Ảnh trước"><ArrowLeft size={22} /></button>}
      <figure><img src={it.src} alt={it.caption} /><figcaption>{it.caption}<small>{i + 1} / {items.length}</small></figcaption></figure>
      {items.length > 1 && <button className="lb-nav next" onClick={() => go(1)} aria-label="Ảnh sau"><Arrow size={22} /></button>}
    </div>
  );
}

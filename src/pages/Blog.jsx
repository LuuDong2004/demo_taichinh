import { useState } from 'react';
import { BlogCard, PageHero, PressCard, SectionHead } from '../components/Blocks';
import { Cloud } from '../components/Icons';
import { BLOG, PRESS } from '../data';
import { useLiquid } from '../lib/useLiquid';

const ALL = 'Tất cả';
const PRESS_CAT = 'Báo chí';
const CATS = [ALL, ...new Set(BLOG.map(b => b.cat)), PRESS_CAT];

export default function Blog() {
  const [cat, setCat] = useState(ALL);
  const [catsRef, catsInd] = useLiquid(cat, '.on');
  const posts = cat === ALL ? BLOG : BLOG.filter(b => b.cat === cat);
  const showPress = cat === ALL || cat === PRESS_CAT;
  return (
    <>
      <PageHero title="Tin tức & bài viết">Blog</PageHero>
      <section className="section">
        <Cloud className="deco-l" style={{ top: 40 }} />
        <div className="container">
          <div className="blog-cats" ref={catsRef}>
            <span className="liquid-ind cats-ind" ref={catsInd} aria-hidden="true" />
            {CATS.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          {cat !== PRESS_CAT && <div className="grid grid-3">{posts.map(b => <BlogCard key={b.id} b={b} />)}</div>}
          {showPress && (
            <div className="press-block">
              <SectionHead eyebrow="Báo chí" title="Báo chí viết về giáo dục tài chính cho trẻ"
                sub="Một số bài báo năm 2025–2026 đáng đọc. Bấm vào để đọc bài gốc trên trang báo." />
              <div className="press-grid">{PRESS.map(a => <PressCard key={a.url} a={a} />)}</div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

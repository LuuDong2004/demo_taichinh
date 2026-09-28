import { useState } from 'react';
import { BlogCard, PageHero } from '../components/Blocks';
import { Cloud } from '../components/Icons';
import { BLOG } from '../data';

const CATS = ['Tất cả', ...new Set(BLOG.map(b => b.cat))];

export default function Blog() {
  const [cat, setCat] = useState('Tất cả');
  const list = cat === 'Tất cả' ? BLOG : BLOG.filter(b => b.cat === cat);
  return (
    <>
      <PageHero eyebrow="Góc phụ huynh" title="Tin tức & bài viết">Blog</PageHero>
      <section className="section">
        <Cloud className="deco-l" style={{ top: 40 }} />
        <div className="container">
          <div className="blog-cats">
            {CATS.map(c => <button key={c} className={c === cat ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="grid grid-3">{list.map(b => <BlogCard key={b.id} b={b} />)}</div>
        </div>
      </section>
    </>
  );
}

import { Link, useParams } from 'react-router-dom';
import { BlogCard } from '../components/Blocks';
import Crop from '../components/Crop';
import { Arrow } from '../components/Icons';
import { BLOG } from '../data';
import { fmtDate } from '../lib/utils';
import NotFound from './NotFound';

export default function BlogPost() {
  const { id } = useParams();
  const b = BLOG.find(x => x.id === id);
  if (!b) return <NotFound />;

  return (
    <section className="section" style={{ paddingTop: 24 }}>
      <div className="container">
        <article className="article">
          <div className="crumbs" style={{ marginBottom: 16 }}><Link to="/">Trang chủ</Link> / <Link to="/blog">Blog</Link> / {b.cat}</div>
          <span className="chip">{b.cat}</span>
          <h1 className="title" style={{ fontSize: 'clamp(32px,4.5vw,48px)', textTransform: 'none' }}>{b.title}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 0 }}>{fmtDate(b.date)} · {b.read} phút đọc · Ban biên tập Ước Mơ Kids</p>
          <div className="cover"><Crop img={b.img} area={b.crop} /></div>
          {b.body.map((p, i) => <p key={i}>{p}</p>)}
          <div className="story-banner" style={{ margin: '32px 0 0', gridTemplateColumns: '1fr' }}>
            <div className="txt">
              <h2 style={{ fontSize: 32 }}>Biến bài học thành trò chơi</h2>
              <p>Bộ Ước Mơ Nghề Nghiệp giúp bé thực hành mọi điều trong bài viết này.</p>
              <div><Link to="/san-pham/uoc-mo-vang" className="btn btn-yellow btn-sm">Xem sản phẩm <Arrow /></Link></div>
            </div>
          </div>
        </article>
        <div className="section-head" style={{ margin: '44px auto 24px' }}><h2 className="title" style={{ fontSize: 30 }}>Bài viết khác</h2></div>
        <div className="grid grid-3">{BLOG.filter(x => x.id !== id).slice(0, 3).map(x => <BlogCard key={x.id} b={x} />)}</div>
      </div>
    </section>
  );
}

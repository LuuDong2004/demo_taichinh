import { Link, useParams } from 'react-router-dom';
import { BlogCard } from '../components/Blocks';
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
          <div className="crumbs" style={{ marginBottom: 16 }}><Link to="/trang-chu">Trang chủ</Link> / <Link to="/blog">Blog</Link> / {b.cat}</div>
          <span className="chip">{b.cat}</span>
          <h1 className="title" style={{ fontSize: 'clamp(32px,4.5vw,48px)', textTransform: 'none' }}>{b.title}</h1>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 0 }}>{fmtDate(b.date)} · {b.read} phút đọc · Ban biên tập Moni Yo</p>
          <div className="cover"><img src={b.img} alt="" /></div>
          {b.body.map((p, i) => <p key={i}>{p}</p>)}
          <div className="story-banner" style={{ margin: '32px 0 0', gridTemplateColumns: '1fr' }}>
            <div className="txt">
              <h2 style={{ fontSize: 32 }}>Tập ngay trên bàn cờ</h2>
              <p>Moni Yo có Bộ 1 cho bé 5–8 tuổi và Bộ 2 cho trẻ 9–15 tuổi.</p>
              <div><Link to="/san-pham" className="btn btn-yellow btn-sm">Xem 2 bộ <Arrow /></Link></div>
            </div>
          </div>
        </article>
        <div className="section-head" style={{ margin: '44px auto 24px' }}><h2 className="title" style={{ fontSize: 30 }}>Bài viết khác</h2></div>
        <div className="grid grid-3">{BLOG.filter(x => x.id !== id).slice(0, 3).map(x => <BlogCard key={x.id} b={x} />)}</div>
      </div>
    </section>
  );
}

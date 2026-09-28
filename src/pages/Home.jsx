import { Link } from 'react-router-dom';
import { BlogCard, CommitStrip, Counter, ProductCard, ReviewSlider, SectionHead } from '../components/Blocks';
import Crop from '../components/Crop';
import { Arrow, Cloud, Coin } from '../components/Icons';
import { BLOG } from '../data';
import { useShop } from '../lib/ShopContext';

const STEPS = [
  ['var(--orange)', 'Chọn nghề', 'Rút thẻ nghề nghiệp: đầu bếp, bác sĩ, lính cứu hỏa, giáo viên…'],
  ['var(--green)', 'Đi làm', <>Tung xúc xắc, đi quanh bàn cờ. Ô <b style={{ color: 'var(--green)' }}>+</b> nhận xu, ô <b style={{ color: 'var(--red)' }}>−</b> mất xu.</>],
  ['var(--blue)', 'Mua đồ', 'Dùng xu mua món đồ nghề. So sánh giá, cân nhắc: mua ngay hay để dành?'],
  ['var(--red)', 'Hoàn thành', 'Ai sưu tầm đủ 4 món đồ của nghề mình trước sẽ “Hoàn thành ước mơ!”'],
];

const INSIDE = [
  ['board', 'Bàn cờ thành phố', 'Ô cộng tiền, trừ tiền, dấu hỏi và ngôi sao may mắn.'],
  ['events', 'Thẻ sự kiện', 'Cơ hội – Thử thách – Kiến thức: +3, −2, +1 xu và câu hỏi vui.'],
  ['mission', 'Thẻ nhiệm vụ', 'Mục tiêu rõ ràng: mua đủ 4 món đồ để hoàn thành nghề.'],
  ['kit', 'Xu game & quân cờ', 'Xu mệnh giá 1–5, xúc xắc và 4 quân cờ nhiều màu.'],
];

const FEATS = [['🧑‍🍳', 'Khám phá 8 nghề nghiệp'], ['💰', 'Học cách quản lý tiền'], ['🧠', 'Phát triển tư duy'], ['👨‍👩‍👧', 'Vui chơi cùng gia đình']];

export default function Home() {
  const { products } = useShop();
  return (
    <>
      <section className="hero">
        <Coin style={{ left: '1%', bottom: '18%', width: 44 }} />
        <Coin style={{ left: '47%', top: '8%', width: 44, animationDelay: '1s' }} />
        <div className="container">
          <div className="reveal">
            <span className="eyebrow left">Đồ chơi giáo dục tài chính · 5–7 tuổi</span>
            <h1>Ước Mơ <span className="accent">Nghề Nghiệp</span></h1>
            <div className="tagline">Làm việc – Kiếm tiền – Mua đồ – Hoàn thành ước mơ!</div>
            <p className="lead">Board game nhập vai giúp bé hiểu tiền đến từ lao động, biết so sánh giá, lên kế hoạch chi tiêu và tiết kiệm – qua những giờ chơi rộn rã tiếng cười cùng gia đình.</p>
            <div className="hero-ctas">
              <Link to="/san-pham/uoc-mo-vang" className="btn">🛒 Đặt hàng ngay</Link>
              <Link to="/gioi-thieu" className="btn btn-ghost">Khám phá trò chơi <Arrow /></Link>
            </div>
            <div className="hero-feats">
              {FEATS.map(([ic, t]) => <div className="hero-feat" key={t}><span className="ic">{ic}</span>{t}</div>)}
            </div>
          </div>
          <div className="hero-visual reveal">
            <Crop img="yellow" area="box" />
            <div className="sticker"><span><b>-17%</b>Mở bán</span></div>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 40 C 240 80 480 0 720 30 S 1200 70 1440 20 V70 H0z" fill="#FFFDF0" /></svg>
      </section>

      <div className="container">
        <div className="story-banner reveal">
          <div className="txt">
            <h2>Khám phá<br />câu chuyện<br />Ước Mơ Kids</h2>
            <p>Mỗi ván chơi là một hành trình: bé chọn nghề, đi làm nhận xu, gặp cơ hội và thử thách, rồi tự tay mua đủ đồ nghề để chạm tới ước mơ.</p>
            <div><Link to="/gioi-thieu" className="btn btn-yellow btn-sm">Tìm hiểu thêm <Arrow /></Link></div>
          </div>
          <div className="visual"><Crop img="yellow" area="board" /></div>
        </div>
      </div>

      <section className="section">
        <Cloud className="deco-l" style={{ top: 40 }} />
        <Cloud className="deco-r" style={{ bottom: 40 }} />
        <div className="container">
          <SectionHead eyebrow="Sản phẩm nổi bật" title="Bé học – Bé chơi – Bé lớn" sub="Những món đồ chơi được hàng nghìn phụ huynh tin chọn để bắt đầu hành trình tài chính của con." />
          <div className="grid grid-4">{products.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}</div>
          <div style={{ textAlign: 'center', marginTop: 36 }}><Link to="/san-pham" className="btn btn-yellow">Xem tất cả sản phẩm <Arrow /></Link></div>
        </div>
      </section>

      <section className="section section-alt">
        <Cloud className="deco-r" style={{ top: 30 }} />
        <div className="container">
          <SectionHead eyebrow="Cách chơi" title="4 bước chạm tới ước mơ" sub="Luật chơi đơn giản, bé tự chơi được chỉ sau 2 ván." />
          <div className="steps-wrap">
            <div className="steps">
              {STEPS.map(([c, h, p], i) => (
                <div className="step reveal" key={h}><div className="num" style={{ background: c }}>{i + 1}</div><h4>{h}</h4><p>{p}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <Cloud className="deco-l" style={{ top: 60 }} />
        <div className="container">
          <SectionHead eyebrow="Trong hộp có gì?" title="Hàng trăm điều thú vị" />
          <div className="inside">
            <div className="inside-main reveal">
              <Crop img="yellow" area="jobs" />
              <div style={{ padding: '16px 8px 4px' }}>
                <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', color: 'var(--brown)', fontSize: 24 }}>8 thẻ nghề nghiệp</h3>
                <p style={{ margin: '4px 0 0', color: 'var(--muted)' }}>Mỗi nghề đi kèm 4 món đồ cần sưu tầm và một thẻ nhiệm vụ riêng.</p>
              </div>
              <div style={{ marginTop: 14 }}><Crop img="yellow" area="items" /></div>
            </div>
            <div className="inside-list">
              {INSIDE.map(([k, h, p]) => (
                <div className="inside-item reveal" key={k}><Crop img="yellow" area={k} /><div><h4>{h}</h4><p>{p}</p></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div><Counter to={12000} suffix="+" /><span>gia đình đã chơi</span></div>
          <div><Counter to={8} /><span>nghề nghiệp</span></div>
          <div><Counter to={120} suffix="+" /><span>thẻ bài</span></div>
          <div><b>4.9★</b><span>đánh giá trung bình</span></div>
        </div>
      </section>

      <section className="section">
        <Cloud className="deco-l" style={{ top: 40 }} />
        <Cloud className="deco-r" style={{ bottom: 30 }} />
        <div className="container">
          <SectionHead eyebrow="Phụ huynh nói gì" title="Đánh giá của khách hàng" sub="Những gia đình đã trải nghiệm Ước Mơ Kids nói gì về sản phẩm" />
          <ReviewSlider />
        </div>
      </section>

      <section className="section section-alt">
        <Cloud className="deco-r" style={{ top: 40 }} />
        <div className="container">
          <SectionHead eyebrow="Góc phụ huynh" title="Tin tức & bài viết" />
          <div className="grid grid-3">{BLOG.slice(0, 3).map(b => <BlogCard key={b.id} b={b} />)}</div>
          <div style={{ textAlign: 'center', marginTop: 36 }}><Link to="/blog" className="btn btn-yellow">Xem tất cả bài viết <Arrow /></Link></div>
        </div>
      </section>
      <div style={{ height: 60 }} />
      <CommitStrip />
    </>
  );
}

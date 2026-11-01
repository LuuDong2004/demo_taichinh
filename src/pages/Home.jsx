import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogCard, CommitStrip, Counter, ProductCard, ReviewSlider, SectionHead } from '../components/Blocks';
import { DECKS, DeckFan, JobExplorer, Lightbox, TileGrid } from '../components/Game';
import { Arrow, Bell, Smile, Users } from '../components/Icons';
import ProductArt from '../components/ProductArt';
import { BLOG, BRAND, COMPONENTS, img } from '../data';
import { useShop } from '../lib/ShopContext';

const STEPS = [
  ['var(--orange)', 'Chọn nghề', 'Bốc 1 trong 8 thẻ Nghề nghiệp và ghi nhớ 4 đồ vật cần thu thập.'],
  ['var(--green)', 'Tung xúc xắc', 'Di chuyển theo chiều kim đồng hồ quanh đồng cỏ Moni Yo.'],
  ['var(--blue)', 'Xử lý tình huống', 'Rút thẻ Cộng tiền, Trừ tiền hoặc Túi mù và làm theo thẻ.'],
  ['var(--red)', 'Mua sắm & thắng', 'Dừng ở ô Mua sắm để mua đồ vật. Đủ 4 đồ vật trước là thắng!'],
];

// Thẻ thật bay quanh hộp ở hero
const STAGE_TILES = ['start', 'cong-tien', 'mua-sam', 'tui-mu', 'them-luot', 'dong-bang'];
const FLOAT_CARDS = [
  ['cards/cong/ban-ban-nuoc-chanh-tu-pha', 'Thẻ Cộng tiền – Bạn bán nước chanh tự pha'],
  ['items/ong-nghe', 'Thẻ Đồ vật – Ống nghe (nghề Bác sĩ)'],
  ['cards/tui-mu/sinh-nhat-vui-ve', 'Thẻ Túi mù – Sinh nhật vui vẻ'],
  ['cards/tru/troi-nong-ban-mua-mot-cay-kem', 'Thẻ Trừ tiền – Trời nóng, bạn mua một cây kem'],
];
const CARD_ITEMS = FLOAT_CARDS.map(([src, caption]) => ({ src: img(src), caption }));

export default function Home() {
  const { products } = useShop();
  const [zoom, setZoom] = useState(null);
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow launch"><i />Sắp ra mắt</span>
            <h1>Chơi thật vui, <span className="accent">giỏi quản lý tiền</span></h1>
            <div className="tagline">Chọn nghề – Kiếm tiền – Xử lý tình huống – Mua đủ đồ vật!</div>
            <p className="lead">Moni Yo giúp bé hiểu giá trị đồng tiền, hình thành tư duy tài chính và kỹ năng giải quyết vấn đề qua những tình huống gần gũi – bên bàn cờ cùng cả nhà.</p>
            <div className="hero-ctas">
              <Link to="/san-pham/moni-yo" className="btn btn-lg"><Bell /> Nhận tin ra mắt</Link>
              <Link to="/gioi-thieu" className="btn btn-lg btn-light">Xem cách chơi <Arrow /></Link>
            </div>
            <div className="hero-trust">
              <span className="with-ic"><Users size={18} /><b>2–4</b> người chơi</span><i />
              <span className="with-ic"><Smile size={18} />Từ <b>5 tuổi</b></span><i />
              <span><b>8</b> nghề nghiệp</span>
            </div>
          </div>
          {/* Chỉ dùng phần tử thiết kế đã có (logo, nhân vật, thẻ, icon ô bàn cờ) – chưa có ảnh sản phẩm */}
          <div className="hero-stage reveal">
            <span className="stage-rays" />
            <span className="stage-blob" />
            {/* Đường bàn cờ dưới chân nhân vật: từng ô lần lượt sáng lên, quân cờ nhảy sang ô kế tiếp */}
            <div className="stage-track">
              {STAGE_TILES.map((t, i) => (
                <span className="track-tile" key={t} style={{ '--i': i }}><img src={img(`tiles/${t}`)} alt="" /></span>
              ))}
            </div>
            {/* Rê chuột: thẻ nổi lên, đứng thẳng; bấm: phóng to xem */}
            {FLOAT_CARDS.map(([src, caption], i) => (
              <button type="button" className={`fcard f${i + 1}`} key={src} onClick={() => setZoom(i)} aria-label={`Xem ${caption}`}><img src={img(src)} alt="" /></button>
            ))}
            {[1, 2, 3, 4, 5].map(i => <span className={`stage-spark k${i}`} key={i} />)}
            <img className="stage-logo" src={img('brand/logo')} alt="" />
            <img className="stage-kids" src={img('brand/kids-jump')} alt="" />
          </div>
        </div>
      </section>
      {zoom !== null && <Lightbox items={CARD_ITEMS} index={zoom} onClose={() => setZoom(null)} />}

      <div className="container">
        <div className="story-banner reveal">
          <div className="txt">
            <h2>Sứ mệnh Moni Yo</h2>
            <p>Mỗi đứa trẻ đều có mong muốn và ước mơ riêng. Để đạt được điều mình muốn, con cần học cách lựa chọn, kiên nhẫn và hiểu giá trị của những gì mình có. Moni Yo đưa giáo dục tài chính đến gần hơn với trẻ, bắt đầu từ những bài học đơn giản về kiếm tiền, chi tiêu và tiết kiệm.</p>
            <p className="motto">“{BRAND.motto}”</p>
            <div><Link to="/gioi-thieu" className="btn btn-yellow btn-sm">Tìm hiểu thêm <Arrow /></Link></div>
          </div>
          <div className="visual brand-visual"><img src={img('brand/kids-peek')} alt="Hai bạn nhỏ Moni Yo" loading="lazy" /></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Sản phẩm" title="Bộ đồ chơi & phụ kiện Moni Yo" sub="Bộ đồ chơi Moni Yo đã sẵn sàng. Các phụ kiện lẻ đang hoàn thiện thiết kế và sắp ra mắt." />
          <div className="grid grid-4">{products.slice(0, 4).map(p => <ProductCard key={p.id} p={p} />)}</div>
          <div style={{ textAlign: 'center', marginTop: 24 }}><Link to="/san-pham" className="btn btn-yellow">Xem tất cả sản phẩm <Arrow /></Link></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Nhập vai" title="Khám phá 8 nghề nghiệp" sub="Mỗi nghề có một bộ 4 thẻ Đồ vật. Bé chọn nghề và thu thập các vật dụng cần thiết trong quá trình chơi." />
          <JobExplorer />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Cách chơi" title="Cách chơi đơn giản" sub="Mỗi lượt chỉ gồm 3 bước: tung xúc xắc, di chuyển quân cờ và thực hiện hành động của ô." />
          <div className="steps-wrap">
            <div className="steps">
              {STEPS.map(([c, h, p], i) => (
                <div className="step reveal" key={h}><div className="num" style={{ background: c }}>{i + 1}</div><h4>{h}</h4><p>{p}</p></div>
              ))}
            </div>
          </div>
          <h3 className="sub-title">Các ô trên bàn cờ</h3>
          <TileGrid compact />
          <div style={{ textAlign: 'center', marginTop: 24 }}><Link to="/gioi-thieu#cach-choi" className="btn btn-light">Xem luật chơi đầy đủ <Arrow /></Link></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="65 thẻ tình huống" title="Mỗi lá bài là một bài học" sub="Những tình huống gần gũi giúp bé hiểu tiền đến từ đâu, đi về đâu và cách xử lý khi có điều bất ngờ." />
          <div className="decks">
            {DECKS.map(d => (
              <Link to="/gioi-thieu#bo-the" className="deck reveal" key={d.id} style={{ '--deck': d.color }}>
                <DeckFan deck={d} picks={d.id === 'tui-mu' ? [0, 7, 21] : [2, 0, 13]} />
                <h3>{d.name}<small>{d.cards.length} thẻ</small></h3>
                <p>{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Trong hộp có gì?" title="Thành phần bộ đồ chơi" />
          <div className="inside">
            <div className="inside-main art reveal"><ProductArt size="lg" /></div>
            <div className="inside-side reveal">
              <ul className="comp-list">
                {COMPONENTS.map(([n, q]) => <li key={n}><b>{q}</b>{n}</li>)}
              </ul>
              <img src={img('product/money')} alt="Tiền Moni Yo mệnh giá 1, 2, 5, 10 đồng" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div><Counter to={8} /><span>nghề nghiệp</span></div>
          <div><Counter to={65} /><span>thẻ tình huống</span></div>
          <div><Counter to={32} /><span>thẻ đồ vật</span></div>
          <div><Counter to={240} /><span>tờ tiền Moni Yo</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Phụ huynh nói gì" title="Đánh giá của khách hàng" sub="Những gia đình đã chơi Moni Yo nói gì về sản phẩm" />
          <ReviewSlider />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Góc phụ huynh" title="Tin tức & bài viết" />
          <div className="grid grid-3">{BLOG.slice(0, 3).map(b => <BlogCard key={b.id} b={b} />)}</div>
          <div style={{ textAlign: 'center', marginTop: 24 }}><Link to="/blog" className="btn btn-yellow">Xem tất cả bài viết <Arrow /></Link></div>
        </div>
      </section>
      <div style={{ height: 44 }} />
      <CommitStrip />
    </>
  );
}

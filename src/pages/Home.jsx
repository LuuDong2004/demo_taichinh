import { Link } from 'react-router-dom';
import { BlogCard, CommitStrip, Counter, PressCard, ReviewSlider, SectionHead, SetCard } from '../components/Blocks';
import { DECKS, DeckFan, JobExplorer, TileGrid } from '../components/Game';
import { Arrow, Bell, Smile, Users } from '../components/Icons';
import { BusinessCards } from '../components/Set2';
import { BLOG, BRAND, COMPONENTS, COMPONENTS_2, HOUSES, PRESS, img } from '../data';
import { useShop } from '../lib/ShopContext';

const STEPS = [
  ['var(--orange)', 'Chọn nghề', 'Bốc 1 trong 8 thẻ nghề, xem nghề đó cần 4 món đồ gì.'],
  ['var(--green)', 'Tung xúc xắc', 'Đi theo chiều kim đồng hồ quanh bàn cờ.'],
  ['var(--blue)', 'Gặp tình huống', 'Rút thẻ Cộng tiền, Trừ tiền hoặc Túi mù rồi làm theo thẻ.'],
  ['var(--red)', 'Mua đồ và thắng', 'Dừng ở ô Mua sắm thì được mua đồ. Ai đủ 4 món trước là thắng.'],
];

// Thẻ thật bay quanh hộp ở hero
const STAGE_TILES = ['start', 'cong-tien', 'mua-sam', 'tui-mu', 'them-luot', 'dong-bang'];
// Trộn thẻ của cả 2 bộ: Bộ 1 (cộng tiền, túi mù) và Bộ 2 (doanh nghiệp, túi mù), thêm tờ 500 đồng của Bộ 2
const FLOAT_CARDS = [
  ['cards/cong/ban-ban-nuoc-chanh-tu-pha', 'Thẻ Cộng tiền Bộ 1 – Bạn bán nước chanh tự pha'],
  ['product/bo2-biz/2', 'Thẻ Doanh nghiệp Bộ 2 – Trường học, giá mua 220 đồng'],
  ['cards/tui-mu/sinh-nhat-vui-ve', 'Thẻ Túi mù Bộ 1 – Sinh nhật vui vẻ'],
  ['product/bo2-tuimu/9', 'Thẻ Túi mù Bộ 2 – May mắn, nhận 100 đồng'],
  ['product/bo2-notes/500', 'Tiền Moni Yo Bộ 2 – tờ 500 đồng'],
];

export default function Home() {
  const { products } = useShop();
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="reveal">
            <span className="eyebrow launch"><i />moniyo.vn</span>
            <h1>Chơi thật vui, <span className="accent">giỏi quản lý tiền</span></h1>
            {/* Máy tính: một dòng "A – B – C – D!"; điện thoại: 4 nhãn bước nối mũi tên, không rớt chữ lẻ */}
            <div className="tagline">
              {['Chọn nghề', 'Kiếm tiền', 'Xử lý tình huống', 'Mua đủ đồ vật!'].map(s => <span key={s}>{s}</span>)}
            </div>
            <p className="lead">Moni Yo là board game để con tập kiếm tiền, tiêu tiền và để dành ngay trên bàn cờ, cùng bố mẹ. Có hai bộ: Bộ 1 cho bé 5–8 tuổi, Bộ 2 cho trẻ 9–15 tuổi.</p>
            <div className="hero-ctas">
              <Link to="/san-pham" className="btn btn-lg"><Bell /> Xem 2 bộ sản phẩm</Link>
              <Link to="/gioi-thieu" className="btn btn-lg btn-light">Xem cách chơi <Arrow /></Link>
            </div>
            <div className="hero-trust">
              <span className="with-ic"><Users size={18} /><b>2–4</b> người chơi</span><i />
              <span className="with-ic"><Smile size={18} /><b>5–15</b> tuổi</span><i />
              <span><b>2</b> bộ theo tuổi</span>
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
            {/* Rê chuột: thẻ nổi lên, đứng thẳng (không bấm phóng to) */}
            {FLOAT_CARDS.map(([src, caption], i) => (
              <div className={`fcard f${i + 1}`} key={src}><img src={img(src)} alt={caption} /></div>
            ))}
            {[1, 2, 3, 4, 5].map(i => <span className={`stage-spark k${i}`} key={i} />)}
            <img className="stage-logo" src={img('brand/logo')} alt="" />
            <img className="stage-kids" src={img('brand/kids-jump')} alt="" />
          </div>
        </div>
      </section>

      <div className="container">
        <div className="story-banner reveal">
          <div className="txt">
            <h2>Sứ mệnh Moni Yo</h2>
            <p>Bố mẹ luôn mong con biết quý trọng đồng tiền và cân nhắc trước mỗi lần chi tiêu – nhưng làm thế nào để con thực sự hiểu, thay vì chỉ nghe những lời nhắc nhở? Từ trăn trở ấy, Moni Yo ra đời với mong muốn đưa giáo dục tài chính đến gần hơn với trẻ em thông qua những trải nghiệm vui chơi gần gũi.</p>
            <p className="motto">“{BRAND.motto}”</p>
            <div><Link to="/gioi-thieu" className="btn btn-yellow btn-sm">Tìm hiểu thêm <Arrow /></Link></div>
          </div>
          <div className="visual brand-visual"><img src={img('brand/kids-peek')} alt="Hai bạn nhỏ Moni Yo" loading="lazy" /></div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Sản phẩm" title="Hai bộ Moni Yo cho hai độ tuổi" sub="Hai bộ dùng chung nhân vật và tiền Moni Yo. Bộ 2 có số tiền lớn hơn, nhiều mệnh giá hơn và luật chơi khó hơn." />
          <div className="set-grid">{products.filter(p => p.set).map(p => <SetCard key={p.id} p={p} />)}</div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Bộ 1 · Nhập vai" title="8 nghề nghiệp, mỗi nghề 4 món đồ" sub="Bấm vào từng nghề để xem thẻ nghề và 4 thẻ đồ vật bé cần gom." />
          <JobExplorer />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Bộ 1 · Cách chơi" title="Chơi thế nào?" sub="Mỗi lượt chỉ có 3 việc: tung xúc xắc, đi quân cờ, dừng ô nào làm theo ô đó." />
          <div className="steps-wrap">
            <div className="steps">
              {STEPS.map(([c, h, p], i) => (
                <div className="step reveal" key={h}><div className="num" style={{ background: c }}>{i + 1}</div><h4>{h}</h4><p>{p}</p></div>
              ))}
            </div>
          </div>
          <h3 className="sub-title">Các ô trên bàn cờ</h3>
          <TileGrid compact />
          <div style={{ textAlign: 'center', marginTop: 24 }}><Link to="/gioi-thieu#cach-choi" className="btn btn-light">Xem luật Bộ 1 đầy đủ <Arrow /></Link></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Bộ 1 · 65 thẻ tình huống" title="Tình huống lấy từ chuyện hằng ngày" sub="Bán nước chanh, làm ướt sách thư viện, được lì xì Tết… Bé đọc thẻ rồi tự cộng trừ tiền." />
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
          <SectionHead eyebrow="Bộ 2 · 9–15 tuổi" title="Mua doanh nghiệp, tiết kiệm, đầu tư và xây nhà" sub="Mỗi người có 500 đồng. Ai mua doanh nghiệp trước sẽ thu phí người khác đi vào. Ai xây đủ 4 mức nhà trước là thắng." />
          <BusinessCards limit={6} small />
          <div className="houses mini reveal">
            {HOUSES.map(([h, price, c]) => (
              <div className="house" key={h} style={{ '--c': c }}>
                <svg viewBox="0 0 64 56" aria-hidden="true"><path d="M32 4 4 28h8v24h40V28h8L46 15.5V7h-7v2.4Z" fill="var(--c)" /><rect x="26" y="34" width="12" height="18" rx="2" fill="#fff" opacity=".85" /></svg>
                <b>{h}</b><span>{price.toLocaleString('vi-VN')} đồng</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}><Link to="/san-pham/moni-yo-bo-2" className="btn btn-light">Xem Bộ 2 và luật chơi <Arrow /></Link></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Trong hộp có gì?" title="Thành phần từng bộ" />
          <div className="box-compare">
            {[[1, 'bo1-box', COMPONENTS, '#FFC928'], [2, 'bo2-box', COMPONENTS_2, '#3BB54A']].map(([n, pic, list, c]) => (
              <Link to={`/san-pham/moni-yo-bo-${n}`} className="box-col reveal" key={n} style={{ '--set': c }}>
                <img src={img(`product/${pic}`)} alt={`Hộp Moni Yo Bộ ${n}`} loading="lazy" />
                <h3>Bộ {n}</h3>
                <ul className="comp-list">{list.map(([name, q]) => <li key={name}><b>{q}</b>{name}</li>)}</ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-band">
        <div className="container">
          <div><Counter to={2} /><span>bộ trò chơi</span></div>
          <div><Counter to={8} /><span>nghề nghiệp</span></div>
          <div><Counter to={12} /><span>doanh nghiệp</span></div>
          <div><Counter to={105} /><span>thẻ tình huống</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Phụ huynh nói gì" title="Cảm nhận sau khi chơi thử" sub="Ý kiến của các gia đình đã chơi bản thử của Moni Yo" />
          <ReviewSlider />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Góc phụ huynh" title="Tin tức & bài viết" />
          <div className="grid grid-3">{BLOG.slice(0, 3).map(b => <BlogCard key={b.id} b={b} />)}</div>
          <h3 className="sub-title">Báo chí viết về giáo dục tài chính cho trẻ</h3>
          <div className="press-grid">{PRESS.slice(0, 3).map(a => <PressCard key={a.url} a={a} />)}</div>
          <div style={{ textAlign: 'center', marginTop: 24 }}><Link to="/blog" className="btn btn-yellow">Xem tất cả bài viết <Arrow /></Link></div>
        </div>
      </section>
      <div style={{ height: 44 }} />
      <CommitStrip />
    </>
  );
}

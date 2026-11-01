import { Link } from 'react-router-dom';
import { CommitStrip, PageHero, SectionHead } from '../components/Blocks';
import { CardBrowser, JobExplorer, TileGrid } from '../components/Game';
import ProductArt from '../components/ProductArt';
import { useShop } from '../lib/ShopContext';
import { Bell, Bulb, Heart, Users, Wallet } from '../components/Icons';
import { BRAND, COMPONENTS, ITEM_PRICE, KID_TIPS, LEARN, NOTES, PARENT_TIPS, RULES, SETUP, SHOP_STEPS, START_MONEY, TURN, WIN, img } from '../data';

const LEARN_STYLE = [['var(--yellow-2)', Wallet], ['var(--orange)', Bulb], ['var(--blue)', Users], ['var(--green)', Heart]];
const TOC = [['su-menh', 'Sứ mệnh'], ['thanh-phan', 'Thành phần'], ['cach-choi', 'Cách chơi'], ['nghe-nghiep', '8 nghề'], ['bo-the', 'Bộ thẻ'], ['phu-huynh', 'Phụ huynh']];
const FAQ = [
  ['Bé mấy tuổi chơi được?', 'Moni Yo dành cho bé từ 5 tuổi. Bé nhỏ hơn có thể chơi cùng bố mẹ, người lớn giúp đọc thẻ và đếm tiền.'],
  ['Một ván chơi mấy người?', 'Từ 2 đến 4 người chơi. Mỗi người chọn 1 nghề và 1 quân cờ.'],
  ['Khi nào thì thắng?', WIN],
  ['Có dùng tiền thật không?', 'Không. Trò chơi dùng tiền giấy Moni Yo mệnh giá 1, 2, 5 và 10 đồng, giúp bé làm quen khái niệm tiền mà không lo thất lạc tiền thật.'],
  ['Chính sách đổi trả?', 'Đổi mới trong 7 ngày nếu lỗi sản xuất hoặc thiếu thành phần. Các thành phần bị thất lạc có bán lẻ ở trang Sản phẩm.'],
];

export default function About() {
  const mainArt = useShop().products.find(p => p.id === 'moni-yo')?.art;
  return (
    <>
      <PageHero eyebrow="Giới thiệu sản phẩm" title="Moni Yo – Bộ đồ chơi giáo dục tài chính">Giới thiệu</PageHero>
      <nav className="toc" aria-label="Mục lục trang">
        <div className="container">{TOC.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
      </nav>

      <section className="section" id="su-menh">
        <div className="container split">
          <div className="reveal"><img className="art" src={img('brand/kids-jump')} alt="Hai bạn nhỏ Moni Yo" loading="lazy" /></div>
          <div className="reveal">
            <span className="eyebrow left">Sứ mệnh Moni Yo</span>
            <h2 className="title" style={{ fontSize: 34 }}>{BRAND.tagline}</h2>
            <p>Mỗi đứa trẻ đều có những mong muốn và ước mơ của riêng mình. Nhưng để đạt được điều mình muốn, con cần học cách lựa chọn, kiên nhẫn và hiểu giá trị của những gì mình có.</p>
            <p><b>Moni Yo</b> ra đời với mong muốn đưa giáo dục tài chính đến gần hơn với trẻ em, bắt đầu từ những bài học đơn giản về kiếm tiền, chi tiêu và tiết kiệm. Thay vì chỉ tiếp nhận lời dạy từ người lớn, con được tự mình khám phá, đưa ra quyết định và học hỏi từ chính những trải nghiệm ấy.</p>
            <p>Bởi học cách quản lý tiền cũng là học cách làm chủ những lựa chọn đầu đời.</p>
            <p className="motto">Moni Yo – {BRAND.motto}</p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Giá trị cho bé" title="Trẻ sẽ học được gì?" />
          <div className="values">
            {LEARN.map(([h, p], i) => {
              const [c, Icon] = LEARN_STYLE[i];
              return <div className="value reveal" key={h}><div className="ic" style={{ background: c }}><Icon size={30} /></div><h4>{h}</h4><p>{p}</p></div>;
            })}
          </div>
        </div>
      </section>

      <section className="section" id="thanh-phan">
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow left">Trong hộp Moni Yo có gì?</span>
            <h2 className="title" style={{ fontSize: 34 }}>Thành phần bộ đồ chơi</h2>
            <table className="comp-table">
              <thead><tr><th>Thành phần</th><th>Số lượng</th></tr></thead>
              <tbody>{COMPONENTS.map(([n, q]) => <tr key={n}><td>{n}</td><td>{q}</td></tr>)}</tbody>
            </table>
            <div style={{ marginTop: 20 }}><Link to="/san-pham/moni-yo" className="btn"><Bell /> Nhận tin khi ra mắt</Link></div>
          </div>
          <div className="reveal stack-imgs">
            <div className="art-box"><ProductArt art={mainArt} size="lg" /></div>
            <img src={img('product/money')} alt="Tiền Moni Yo mệnh giá 1, 2, 5, 10 đồng" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section-alt" id="cach-choi">
        <div className="container">
          <SectionHead eyebrow="Sẵn sàng bắt đầu!" title="Cách chuẩn bị chơi" />
          <ol className="rule-steps">
            {SETUP.map(([h, p], i) => <li className="reveal" key={h}><b>Bước {i + 1} – {h}</b><p>{p}</p></li>)}
          </ol>
          <div className="start-money reveal">
            <span>Mỗi người nhận <b>20 đồng</b> khởi đầu:</span>
            {START_MONEY.map(([v, n]) => <span className="note-chip" key={v} data-v={v}><b>{n}</b> tờ {v} đồng</span>)}
            <small>Tiền Moni Yo có 4 mệnh giá: {NOTES.join(', ')} đồng</small>
          </div>

          <SectionHead eyebrow="Bắt đầu hành trình" title="Luật chơi" sub="Mỗi lượt chơi gồm 3 bước" style={{ marginTop: 40 }} />
          <div className="turn">
            {TURN.map(([h, p], i) => <div className="step reveal" key={h}><div className="num" style={{ background: ['var(--orange)', 'var(--green)', 'var(--red)'][i] }}>{i + 1}</div><h4>{h}</h4><p>{p}</p></div>)}
          </div>
          <div className="panel rules-box reveal">
            <h3>Quy tắc cần nhớ</h3>
            <ol>{RULES.map(r => <li key={r}>{r}</li>)}</ol>
          </div>

          <h3 className="sub-title">Các ô trên bàn cờ</h3>
          <TileGrid />

          <h3 className="sub-title">Mua sắm & cơ chế chiến thắng</h3>
          <div className="shop-steps">
            {SHOP_STEPS.map(([h, p], i) => <div className="tile reveal" key={h}><span className="tile-num">{i + 1}</span><div><h4>{h}</h4><p>{p}</p></div></div>)}
          </div>
          <div className="panel rules-box reveal">
            <h3>Quy tắc mua sắm</h3>
            <ol>
              <li>Mỗi lần dừng ở ô Mua sắm chỉ được mua tối đa 1 thẻ Đồ vật (giá {ITEM_PRICE} đồng).</li>
              <li>Bé chỉ được mua vật dụng thuộc nghề nghiệp của mình.</li>
              <li>Nếu chưa đủ tiền hoặc chưa muốn mua, bé có thể bỏ qua.</li>
            </ol>
          </div>
          <div className="win reveal">
            <img src={img('jobs/bac-si-items')} alt="" loading="lazy" />
            <p><b>Chiến thắng:</b> {WIN}</p>
          </div>
        </div>
      </section>

      <section className="section" id="nghe-nghiep">
        <div className="container">
          <SectionHead eyebrow="Thẻ nghề nghiệp & đồ vật" title="Khám phá 8 nghề nghiệp" sub="Mỗi thẻ Nghề nghiệp có tên nghề, hình nhân vật và bộ 4 vật dụng tương ứng." />
          <JobExplorer />
        </div>
      </section>

      <section className="section section-alt" id="bo-the">
        <div className="container">
          <SectionHead eyebrow="Nội dung các bộ thẻ" title="65 thẻ tình huống" sub="Bấm vào thẻ để xem lớn. Hãy đọc kỹ nội dung trên thẻ và thực hiện đúng hướng dẫn." />
          <CardBrowser />
        </div>
      </section>

      <section className="section" id="phu-huynh">
        <div className="container">
          <div className="tips-2">
            <div>
              <SectionHead eyebrow="Dành cho bé" title="Bí quyết tài chính cho trẻ" />
              <div className="tips">{KID_TIPS.map(([h, p], i) => <div className="tip reveal" key={h}><span>{i + 1}</span><div><h4>{h}</h4><p>{p}</p></div></div>)}</div>
            </div>
            <div>
              <SectionHead eyebrow="Dành cho bố mẹ" title="Góc dành cho phụ huynh" />
              <div className="tips">{PARENT_TIPS.map(([h, p], i) => <div className="tip reveal" key={h}><span>{i + 1}</span><div><h4>{h}</h4><p>{p}</p></div></div>)}</div>
            </div>
          </div>
          <p className="motto center">“Điều quan trọng không chỉ là con đạt được mục tiêu, mà còn là cách con học hỏi và trưởng thành qua từng lựa chọn.”</p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>
          <SectionHead eyebrow="Hỏi đáp" title="Câu hỏi thường gặp" />
          <div className="faq">
            {FAQ.map(([q, a]) => <details className="reveal" key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </div>
      </section>
      <CommitStrip />
    </>
  );
}

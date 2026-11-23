import { Link } from 'react-router-dom';
import { CommitStrip, PageHero, SectionHead } from '../components/Blocks';
import { CardBrowser, JobExplorer, TileGrid } from '../components/Game';
import Set2Guide from '../components/Set2';
import { Arrow, Bulb, Heart, Users, Wallet } from '../components/Icons';
import { BRAND, COMPONENTS, ITEM_PRICE, KID_TIPS, LEARN, NOTES, PARENT_TIPS, RULES, SETUP, SHOP_STEPS, START_MONEY, TURN, WIN, WIN_2, img } from '../data';

const LEARN_STYLE = [['var(--yellow-2)', Wallet], ['var(--orange)', Bulb], ['var(--blue)', Users], ['var(--green)', Heart]];
const TOC = [['su-menh', 'Sứ mệnh'], ['thanh-phan', 'Bộ 1'], ['cach-choi', 'Cách chơi Bộ 1'], ['nghe-nghiep', '8 nghề'], ['bo-the', 'Bộ thẻ'], ['bo-2', 'Bộ 2'], ['phu-huynh', 'Phụ huynh']];
const FAQ = [
  ['Con nhà mình nên chơi bộ nào?', 'Bé 5–8 tuổi chơi Bộ 1: luật đơn giản, tiền chỉ có 1, 2, 5, 10 đồng. Khoảng 9–15 tuổi, khi con đã cộng trừ số hàng trăm khá nhanh, chuyển sang Bộ 2 với doanh nghiệp, tiết kiệm và đầu tư. Bé dưới 5 tuổi vẫn chơi Bộ 1 được nếu có bố mẹ ngồi cùng đọc thẻ.'],
  ['Một ván chơi mấy người, bao lâu?', 'Cả hai bộ đều từ 2 đến 4 người. Bộ 1 mất khoảng 30–60 phút, Bộ 2 khoảng 60–90 phút.'],
  ['Khi nào thì thắng?', `Bộ 1: ${WIN.charAt(0).toLowerCase()}${WIN.slice(1)} Bộ 2: ${WIN_2.charAt(0).toLowerCase()}${WIN_2.slice(1)}`],
  ['Có dùng tiền thật không?', 'Không. Mỗi bộ có tiền giấy Moni Yo riêng: Bộ 1 có 4 mệnh giá 1, 2, 5, 10 đồng, Bộ 2 có 9 mệnh giá từ 1 đến 500 đồng.'],
  ['Thiếu hoặc mất thành phần thì sao?', 'Đổi mới trong 7 ngày nếu lỗi sản xuất hoặc thiếu thành phần. Lỡ làm mất thẻ, tiền hay quân cờ thì nhắn fanpage Moni Yo để được hỗ trợ.'],
];

export default function About() {
  return (
    <>
      <PageHero title="Giới thiệu Moni Yo">Giới thiệu</PageHero>
      <nav className="toc" aria-label="Mục lục trang">
        <div className="container">{TOC.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}</div>
      </nav>

      <section className="section" id="su-menh">
        <div className="container split">
          <div className="reveal"><img className="art" src={img('brand/kids-jump')} alt="Hai bạn nhỏ Moni Yo" loading="lazy" /></div>
          <div className="reveal">
            <span className="eyebrow left">Sứ mệnh Moni Yo</span>
            <h2 className="title" style={{ fontSize: 34 }}>{BRAND.tagline}</h2>
            <p>Bố mẹ luôn mong con biết quý trọng đồng tiền và cân nhắc trước mỗi lần chi tiêu – nhưng làm thế nào để con thực sự hiểu, thay vì chỉ nghe những lời nhắc nhở? Từ trăn trở ấy, <b>Moni Yo</b> ra đời với mong muốn đưa giáo dục tài chính đến gần hơn với trẻ em thông qua những trải nghiệm vui chơi gần gũi.</p>
            <p><b>Moni Yo</b> có hai bộ. <Link to="/san-pham/moni-yo-bo-1">Bộ 1</Link> cho bé 5–8 tuổi: chọn một nghề, đi làm kiếm tiền và mua đủ đồ của nghề đó. <Link to="/san-pham/moni-yo-bo-2">Bộ 2</Link> cho trẻ 9–15 tuổi: mua doanh nghiệp, gửi tiết kiệm, đầu tư và xây nhà.</p>
            <p>Chơi xong một ván, con hiểu thêm một chút về chuyện tiền đến từ đâu và đi đâu. Bố mẹ thì có thêm một buổi ngồi chơi cùng con, và có sẵn chuyện để hỏi: vì sao lúc nãy con lại chọn như vậy?</p>
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
            <span className="eyebrow left">Bộ 1 · Dành cho bé 5–8 tuổi</span>
            <h2 className="title" style={{ fontSize: 34 }}>Trong hộp Bộ 1 có gì?</h2>
            <table className="comp-table">
              <thead><tr><th>Thành phần</th><th>Số lượng</th></tr></thead>
              <tbody>{COMPONENTS.map(([n, q]) => <tr key={n}><td>{n}</td><td>{q}</td></tr>)}</tbody>
            </table>
            <div style={{ marginTop: 20 }}><Link to="/san-pham/moni-yo-bo-1" className="btn">Xem Bộ 1 <Arrow /></Link></div>
          </div>
          <div className="reveal stack-imgs">
            <img className="box-img" src={img('product/bo1-box')} alt="Hộp Moni Yo Bộ 1" loading="lazy" />
            <img src={img('product/money')} alt="Tiền Moni Yo mệnh giá 1, 2, 5, 10 đồng" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section section-alt" id="cach-choi">
        <div className="container">
          <SectionHead eyebrow="Bộ 1" title="Chuẩn bị chơi" />
          <ol className="rule-steps">
            {SETUP.map(([h, p], i) => <li className="reveal" key={h}><b>Bước {i + 1} – {h}</b><p>{p}</p></li>)}
          </ol>
          <div className="start-money reveal">
            <span>Mỗi người nhận <b>20 đồng</b> khởi đầu:</span>
            {START_MONEY.map(([v, n]) => <span className="note-chip" key={v} data-v={v}><b>{n}</b> tờ {v} đồng</span>)}
            <small>Tiền Moni Yo có 4 mệnh giá: {NOTES.join(', ')} đồng</small>
          </div>

          <SectionHead eyebrow="Bộ 1" title="Luật chơi" sub="Mỗi lượt có 3 bước" style={{ marginTop: 40 }} />
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
          <SectionHead eyebrow="Bộ 1 · Thẻ nghề và đồ vật" title="8 nghề nghiệp" sub="Mỗi thẻ nghề có tên nghề, hình nhân vật và 4 món đồ bé cần gom." />
          <JobExplorer />
        </div>
      </section>

      <section className="section section-alt" id="bo-the">
        <div className="container">
          <SectionHead eyebrow="Bộ 1 · Các bộ thẻ" title="65 thẻ tình huống" sub="Bấm vào thẻ để xem lớn." />
          <CardBrowser />
        </div>
      </section>

      <section className="section section-alt" id="bo-2">
        <div className="container">
          <div className="split set2-intro">
            <div className="reveal"><img className="box-img" src={img('product/bo2-box')} alt="Hộp Moni Yo Bộ 2" loading="lazy" /></div>
            <div className="reveal">
              <span className="eyebrow left">Bộ 2 · Dành cho trẻ 9–15 tuổi</span>
              <h2 className="title" style={{ fontSize: 34 }}>Doanh nghiệp, tiết kiệm và đầu tư</h2>
              <p>Lớn hơn một chút, con cần bài toán khó hơn. Ở Bộ 2, mỗi người có 500 đồng và phải tự quyết: mua doanh nghiệp để thu phí, gửi tiết kiệm cho chắc, hay đầu tư để có thể được nhân 2, nhân 3 nhưng cũng có thể mất một nửa.</p>
              <p>Ai xây đủ 4 mức nhà trước thì thắng, nên con phải tính trước mình cần bao nhiêu tiền và để dành thế nào.</p>
              <div style={{ marginTop: 20 }}><Link to="/san-pham/moni-yo-bo-2" className="btn">Xem Bộ 2 <Arrow /></Link></div>
            </div>
          </div>
          <Set2Guide />
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

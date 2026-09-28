import { Link } from 'react-router-dom';
import { CommitStrip, PageHero, SectionHead } from '../components/Blocks';
import Crop from '../components/Crop';
import { Arrow, Cloud } from '../components/Icons';

const VALUES = [
  ['var(--orange)', '👩‍🚒', 'Khám phá nghề nghiệp', '8 nghề quen thuộc giúp bé hiểu mỗi công việc đều có giá trị.'],
  ['var(--green)', '💵', 'Quản lý tiền', 'Nhận, đếm, chi tiêu và để dành xu một cách có kế hoạch.'],
  ['var(--blue)', '🧩', 'Phát triển tư duy', 'Ra quyết định, so sánh, ước lượng và chấp nhận rủi ro.'],
  ['var(--red)', '🤗', 'Gắn kết gia đình', 'Bố mẹ và bé cùng chơi, cùng trò chuyện về tiền bạc.'],
];
const SPECS = [
  'Độ tuổi: 5–7 tuổi (chơi cùng người lớn từ 4 tuổi)', 'Số người chơi: 2–4 người · Thời gian: 20–30 phút',
  'Kích thước hộp: 30 × 30 × 6 cm · Nặng 900g', 'Chất liệu: giấy mỹ thuật 350gsm cán mờ, xu nhựa ABS',
  'Đạt chuẩn an toàn đồ chơi QCVN 3:2019/BKHCN', 'Sản xuất tại Việt Nam',
];
const FAQ = [
  ['Bé 4 tuổi chơi được không?', 'Được, nếu có bố mẹ chơi cùng và bỏ qua thẻ Kiến thức. Từ 5 tuổi bé có thể tự chơi.'],
  ['Bản Vàng và Xanh Ngọc khác nhau thế nào?', 'Chỉ khác bảng màu. Luật chơi, số thẻ và phụ kiện giống hệt nhau. Ghép 2 bộ để mở chế độ 8 người chơi.'],
  ['Có dùng tiền thật không?', 'Không. Trò chơi dùng xu nhựa an toàn, giúp bé làm quen khái niệm tiền mà không lo thất lạc tiền thật.'],
  ['Chính sách đổi trả?', 'Đổi mới trong 7 ngày nếu lỗi sản xuất hoặc thiếu phụ kiện. Bổ sung phụ kiện thất lạc với giá gốc.'],
];

export default function About() {
  return (
    <>
      <PageHero eyebrow="Giới thiệu sản phẩm" title="Ước Mơ Nghề Nghiệp">Giới thiệu</PageHero>

      <section className="section">
        <Cloud className="deco-r" style={{ top: 40 }} />
        <div className="container split">
          <div className="reveal"><Crop img="yellow" area="whole" /></div>
          <div className="reveal">
            <span className="eyebrow left">Câu chuyện của chúng tôi</span>
            <h2 className="title" style={{ fontSize: 44 }}>Dạy con về tiền – bằng niềm vui</h2>
            <p>Ước Mơ Kids ra đời từ một câu hỏi của con gái nhà sáng lập: <i>“Mẹ ơi, tiền ở đâu ra?”</i>. Chúng tôi tin rằng hiểu biết tài chính nên bắt đầu từ sớm, và cách tốt nhất để trẻ học là <b>chơi</b>.</p>
            <p>Bộ trò chơi <b>Ước Mơ Nghề Nghiệp</b> được thiết kế cùng giáo viên mầm non và chuyên gia giáo dục tài chính, giúp trẻ 5–7 tuổi hình thành 4 thói quen: <b>làm việc – kiếm tiền – chi tiêu thông minh – theo đuổi mục tiêu</b>.</p>
            <b style={{ color: 'var(--brown)' }}>Bảng màu vui tươi, an toàn cho mắt bé</b>
            <div className="palette">
              {['#FFD23F', '#FFFFD6', '#FF8A3D', '#22C55E', '#EF4444', '#FACC15'].map(c => <span key={c} style={{ background: c }} title={c} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHead eyebrow="Giá trị cho bé" title="Bé học được gì?" />
          <div className="values">
            {VALUES.map(([c, i, h, p]) => <div className="value reveal" key={h}><div className="ic" style={{ background: c }}>{i}</div><h4>{h}</h4><p>{p}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <Cloud className="deco-l" style={{ top: 40 }} />
        <div className="container split">
          <div className="reveal">
            <span className="eyebrow left">Thông số</span>
            <h2 className="title" style={{ fontSize: 40 }}>Chi tiết bộ trò chơi</h2>
            <ul className="includes" style={{ gridTemplateColumns: '1fr' }}>{SPECS.map(s => <li key={s}>{s}</li>)}</ul>
            <div style={{ marginTop: 24 }}><Link to="/san-pham" className="btn">Chọn phiên bản <Arrow /></Link></div>
          </div>
          <div className="reveal" style={{ display: 'grid', gap: 16 }}>
            <Crop img="teal" area="board" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}><Crop img="teal" area="events" /><Crop img="teal" area="mission" /></div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
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

import { Link } from 'react-router-dom';
import { noAccent } from './utils';

// Trợ lý mô phỏng: khớp từ khoá (không dấu) → câu trả lời. Thay bằng API thật khi có backend.
const RULES = [
  {
    k: ['tuoi', 'be ', 'con toi', 'nen choi', 'phu hop', 'goi y', 'qua'],
    a: q => {
      const age = parseInt((q.match(/\d+/) || [])[0]);
      if (age && age < 5) return <>Với bé {age} tuổi, bố mẹ nên chơi cùng bé bộ <Link to="/san-pham/bo-xu-phu-kien">Xu Game &amp; Quân Cờ</Link> để tập đếm tiền trước. Khi bé 5 tuổi có thể lên <Link to="/san-pham/uoc-mo-vang">Ước Mơ Nghề Nghiệp</Link> 💛</>;
      if (age && age > 7) return <>Bé {age} tuổi sẽ rất hợp <Link to="/san-pham/combo-gia-dinh">Combo Gia Đình</Link> – ghép 2 bộ để mở chế độ “Thành phố lớn” có ngân hàng và lãi tiết kiệm 🏦</>;
      return <>Mình gợi ý <Link to="/san-pham/uoc-mo-vang">Ước Mơ Nghề Nghiệp – Bản Vàng</Link> (349.000đ) cho bé 5–7 tuổi. Nếu nhà có 2 bé trở lên, <Link to="/san-pham/combo-gia-dinh">Combo Gia Đình</Link> sẽ tiết kiệm hơn 29% nhé!</>;
    },
  },
  { k: ['tieu vat', 'bao nhieu tien', 'tien tieu'], a: () => <>Quy tắc gợi ý: <b>tuổi của bé × 5.000đ mỗi tuần</b>. Ví dụ bé 6 tuổi → 30.000đ/tuần.{'\n'}Hãy kèm theo 3 hũ: 50% Tiêu – 40% Tiết kiệm – 10% Chia sẻ. Bố mẹ có thể thử tab “3 hũ” ở phía trên!</> },
  { k: ['luat', 'cach choi', 'choi the nao', 'huong dan'], a: () => '1️⃣ Mỗi người rút 1 thẻ nghề.\n2️⃣ Tung xúc xắc, đi quanh bàn cờ: ô + nhận xu, ô − mất xu, ô ? rút thẻ sự kiện.\n3️⃣ Đi qua cửa hàng thì được mua món đồ nghề.\n4️⃣ Ai mua đủ 4 món trước sẽ “Hoàn thành ước mơ!” 🏆' },
  { k: ['giao hang', 'ship', 'van chuyen', 'bao lau'], a: () => <>Giao toàn quốc trong 2–4 ngày 🚚. <b>Miễn phí</b> cho đơn từ 500.000đ, đơn nhỏ hơn phí 30.000đ.</> },
  { k: ['tiet kiem', 'de danh'], a: () => <>3 mẹo giúp bé tiết kiệm:{'\n'}• Đặt mục tiêu có hình ảnh (dán ảnh món đồ lên hũ).{'\n'}• Dùng hũ trong suốt để bé “thấy” tiền lớn lên.{'\n'}• Thưởng thêm 10% khi bé giữ được đến cuối tháng – như lãi ngân hàng!{'\n'}Đọc thêm: <Link to="/blog/3-hu-tien">Phương pháp 3 hũ tiền</Link></> },
  { k: ['mung tuoi', 'li xi', 'tet'], a: () => <>Gợi ý: để bé giữ ~30% tiền mừng tuổi để tự chi tiêu, phần còn lại cùng bé gửi vào mục tiêu dài hạn và ghi chép minh bạch. Xem bài <Link to="/blog/tien-mung-tuoi">Tiền mừng tuổi: ai giữ?</Link></> },
  { k: ['gia', 'bao nhieu', 'khuyen mai', 'giam', 'ma'], a: () => <>Bộ Ước Mơ Nghề Nghiệp đang ưu đãi <b>349.000đ</b> (giá gốc 420.000đ). Nhập mã <b>UOCMO10</b> ở giỏ hàng để giảm thêm 10% 🎁</> },
  { k: ['doi tra', 'bao hanh', 'loi', 'thieu'], a: () => <>Đổi mới trong 7 ngày nếu lỗi sản xuất hoặc thiếu phụ kiện. Liên hệ hotline 0900 123 456 hoặc <Link to="/lien-he">gửi lời nhắn</Link> nhé.</> },
  { k: ['xin chao', 'chao', 'hello', 'hi'], a: () => 'Chào bạn! Mình là Heo Vàng. Bạn muốn tìm đồ chơi cho bé, hay cần mẹo dạy con về tiền?' },
];

export function aiReply(text) {
  const q = ' ' + noAccent(text) + ' ';
  const rule = RULES.find(r => r.k.some(k => q.includes(k)));
  return rule ? rule.a(q) : <>Câu hỏi hay quá! Mình chưa chắc câu trả lời, bạn có thể hỏi về <b>độ tuổi phù hợp</b>, <b>tiền tiêu vặt</b>, <b>luật chơi</b>, <b>giao hàng</b> – hoặc để lại lời nhắn ở trang <Link to="/lien-he">Liên hệ</Link> để đội ngũ tư vấn gọi lại nhé 💛</>;
}

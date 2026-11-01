import { Link } from 'react-router-dom';
import { BRAND, ITEM_PRICE, JOBS } from '../data';
import { noAccent } from './utils';

// Trợ lý mô phỏng: khớp từ khoá (không dấu) → câu trả lời. Thay bằng API thật khi có backend.
const RULES = [
  {
    k: ['tuoi', 'be ', 'con toi', 'nen choi', 'phu hop', 'goi y', 'qua'],
    a: q => {
      const age = parseInt((q.match(/\d+/) || [])[0]);
      if (age && age < 5) return <>Moni Yo dành cho bé từ 5 tuổi. Với bé {age} tuổi, bố mẹ có thể chơi cùng con và giúp con đếm tiền, đọc thẻ. Bố mẹ có thể bắt đầu bằng việc cho bé tập nhận biết 4 mệnh giá tiền có trong hộp 💛</>;
      return <>Mình gợi ý <Link to="/san-pham/moni-yo">Bộ đồ chơi Moni Yo</Link> (sắp ra mắt) – dành cho bé từ 5 tuổi, 2–4 người chơi. Bé chọn 1 trong 8 nghề, đi làm kiếm tiền và mua đủ 4 đồ vật để chiến thắng!</>;
    },
  },
  { k: ['luat', 'cach choi', 'choi the nao', 'huong dan'], a: () => <>Mỗi lượt có 3 bước: <b>tung xúc xắc → di chuyển theo chiều kim đồng hồ → làm theo ô vừa dừng</b>.{'\n'}Ô xanh rút thẻ Cộng tiền, ô đỏ rút thẻ Trừ tiền, ô vàng rút thẻ Túi mù, ô Mua sắm được mua 1 thẻ Đồ vật ({ITEM_PRICE} đồng). Ai gom đủ 4 đồ vật của nghề mình trước sẽ thắng 🏆{'\n'}Xem đầy đủ ở <Link to="/gioi-thieu">trang Giới thiệu</Link>.</> },
  { k: ['nghe nghiep', 'nghe nao', 'may nghe', '8 nghe'], a: () => <>Moni Yo có 8 nghề: {JOBS.map(j => j.name).join(', ')}. Mỗi nghề cần thu thập 4 đồ vật riêng, ví dụ Bác sĩ cần kim tiêm, ống nghe, hộp cứu thương và xe cấp cứu.</> },
  { k: ['bat dau', 'khoi dau', 'tien ban dau', 'moi nguoi nhan'], a: () => 'Mỗi người nhận 20 đồng khởi đầu: 2 tờ 5 đồng, 3 tờ 2 đồng và 4 tờ 1 đồng. Mỗi lần đi qua START được thưởng thêm 5 đồng.' },
  { k: ['tui mu'], a: () => 'Thẻ Túi mù là điều bất ngờ: có thể được thưởng (+10 đồng, tiến 2 ô, thẻ thưởng đúng nghề +15 đồng), mất tiền (−10 đồng, kho báu bị cướp) hoặc hiệu ứng đặc biệt như Lá chắn may mắn hủy 1 thẻ Trừ tiền.' },
  { k: ['tieu vat', 'bao nhieu tien', 'tien tieu'], a: () => <>Quy tắc gợi ý: <b>tuổi của bé × 5.000đ mỗi tuần</b>. Ví dụ bé 6 tuổi → 30.000đ/tuần.{'\n'}Hãy kèm theo 3 hũ: 50% Tiêu – 40% Tiết kiệm – 10% Chia sẻ. Bố mẹ có thể thử tab “3 hũ” ở phía trên!</> },
  { k: ['giao hang', 'ship', 'van chuyen', 'bao lau'], a: () => <>Giao toàn quốc trong 2–4 ngày 🚚. <b>Miễn phí</b> cho đơn từ 500.000đ, đơn nhỏ hơn phí 30.000đ.</> },
  { k: ['tiet kiem', 'de danh'], a: () => <>3 mẹo giúp bé tiết kiệm:{'\n'}• Đặt mục tiêu có hình ảnh (dán ảnh món đồ lên hũ).{'\n'}• Dùng hũ trong suốt để bé “thấy” tiền lớn lên.{'\n'}• Tiết kiệm từ những điều nhỏ bé – không cần nhiều tiền mới bắt đầu.{'\n'}Đọc thêm: <Link to="/blog/bi-quyet-tai-chinh-cho-tre">4 bí quyết tài chính cho bé</Link></> },
  { k: ['gia', 'bao nhieu', 'khuyen mai', 'giam', 'ma', 'mua', 'dat hang'], a: () => <>Moni Yo đang <b>sắp ra mắt</b> nên chưa mở bán. Bạn để lại thông tin ở <Link to="/san-pham/moni-yo">trang sản phẩm</Link>, Moni Yo sẽ báo giá và ưu đãi ra mắt sớm nhất 🔔</> },
  { k: ['doi tra', 'bao hanh', 'loi', 'thieu'], a: () => <>Đổi mới trong 7 ngày nếu lỗi sản xuất hoặc thiếu thành phần. Liên hệ hotline {BRAND.hotline} hoặc <Link to="/lien-he">gửi lời nhắn</Link> nhé.</> },
  { k: ['xin chao', 'chao', 'hello', 'hi'], a: () => 'Chào bạn! Mình là trợ lý Moni Yo. Bạn muốn tìm hiểu luật chơi, chọn quà cho bé, hay cần mẹo dạy con về tiền?' },
];

export function aiReply(text) {
  const q = ' ' + noAccent(text) + ' ';
  const rule = RULES.find(r => r.k.some(k => q.includes(k)));
  return rule ? rule.a(q) : <>Câu hỏi hay quá! Mình chưa chắc câu trả lời, bạn có thể hỏi về <b>luật chơi</b>, <b>8 nghề</b>, <b>thẻ Túi mù</b>, <b>độ tuổi</b>, <b>giao hàng</b> – hoặc để lại lời nhắn ở trang <Link to="/lien-he">Liên hệ</Link> để đội ngũ tư vấn gọi lại nhé 💛</>;
}

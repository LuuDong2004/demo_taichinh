import { Link } from 'react-router-dom';
import { BRAND, BUSINESSES, DEFAULT_PRODUCTS, ITEM_PRICE, JOBS } from '../data';
import { money, noAccent } from './utils';

// Câu trả lời có sẵn – dùng khi chưa bật AI thật (/api/chat) hoặc mất kết nối.
// Khớp từ khoá không dấu; câu hỏi ngoài phạm vi Moni Yo / giáo dục tài chính cho trẻ thì từ chối.
const p1 = DEFAULT_PRODUCTS.find(p => p.set === 1);
const p2 = DEFAULT_PRODUCTS.find(p => p.set === 2);
const L1 = <Link to={`/san-pham/${p1.id}`}>Bộ 1</Link>;
const L2 = <Link to={`/san-pham/${p2.id}`}>Bộ 2</Link>;

const RULES = [
  { k: ['xin chao', 'chao ban', 'chao em', 'hello', ' hi ', ' alo '], a: () => 'Chào bạn! Mình là trợ lý Moni Yo. Bạn muốn hỏi về 2 bộ trò chơi, cách đặt hàng, hay mẹo dạy con về tiền?' },
  { k: ['cam on', 'thank'], a: () => 'Không có gì ạ! Cần gì thêm về Moni Yo bạn cứ hỏi mình nhé 💛' },
  { k: ['tieu vat', 'tien tieu', 'cho con tien', 'bao nhieu tien moi tuan'], a: () => <>Gợi ý: cho một khoản cố định mỗi tuần, ví dụ <b>tuổi của bé × 5.000đ</b> (bé 6 tuổi → 30.000đ/tuần), và để bé tự quyết cách tiêu, kể cả khi lúc đầu tiêu chưa khéo.{'\n'}Kèm 3 hũ: 50% Tiêu – 40% Tiết kiệm – 10% Chia sẻ. Bạn thử tab “3 hũ” ở phía trên nhé!</> },
  { k: ['tiet kiem', 'de danh', 'heo dat', 'hu tien'], a: () => <>3 mẹo giúp bé tiết kiệm:{'\n'}• Đặt mục tiêu có hình ảnh (dán ảnh món đồ lên hũ).{'\n'}• Dùng hũ trong suốt để bé thấy tiền lớn dần.{'\n'}• Bắt đầu từ khoản nhỏ, không cần nhiều tiền.{'\n'}Tab “Mục tiêu” phía trên giúp bé tính cần để dành bao nhiêu tuần. Đọc thêm: <Link to="/blog/bi-quyet-tai-chinh-cho-tre">4 điều về tiền con nên biết sớm</Link>.</> },
  { k: ['li xi', 'mung tuoi', ' tet '], a: () => 'Tiền lì xì là dịp tốt để dạy con: cùng con đếm tổng, chia vào 3 hũ Tiêu – Tiết kiệm – Chia sẻ, và cho con tự chọn một món muốn mua bằng phần “Tiêu”. Phần tiết kiệm nên có mục tiêu rõ ràng để con có động lực.' },
  { k: ['day con', 'giao duc tai chinh', 'quan ly tien', 'tieu tien', 'mua sam', 'doi mua', 'day tre', 'cach day'], a: () => <>Vài cách dễ làm:{'\n'}• Cho con tự trả tiền khi đi chợ, để con thấy mua đồ phải đổi bằng tiền.{'\n'}• Trước khi mua, hỏi con: “Con có thật sự cần không?”.{'\n'}• Kể về công việc của bố mẹ để con hiểu tiền đến từ công sức.{'\n'}• Chơi một ván Moni Yo cùng con rồi hỏi lại vì sao con chọn như vậy.{'\n'}Xem thêm ở <Link to="/blog">Góc phụ huynh</Link>.</> },
  {
    k: [' tuoi', 'be may', 'nen choi', 'phu hop', 'chon bo', 'bo nao', 'qua tang', 'tang qua', 'mua cho con', 'mua cho be'],
    a: q => {
      const age = parseInt((q.match(/\d+/) || [])[0], 10);
      if (age && age < 3) return <>Moni Yo có chi tiết nhỏ nên không dành cho bé dưới 3 tuổi. Khi bé lớn hơn, {L1} là bộ hợp nhất để bắt đầu.</>;
      if (age && age < 5) return <>Bé {age} tuổi hơi sớm để tự chơi, nhưng bố mẹ có thể chơi {L1} cùng con, giúp con đọc thẻ và đếm tiền. Bắt đầu từ việc cho con nhận ra 4 mệnh giá 1, 2, 5, 10 đồng là được 💛</>;
      if (age && age >= 9) return <>Bé {age} tuổi hợp với {L2} ({money(p2.price)}): mua doanh nghiệp, thu phí, gửi tiết kiệm, đầu tư và xây đủ 4 mức nhà. Mỗi ván {p2.time}, {p2.players}.</>;
      if (age) return <>Bé {age} tuổi hợp với {L1} ({money(p1.price)}): chọn 1 trong 8 nghề, đi làm kiếm tiền và mua đủ 4 món đồ để thắng. Mỗi ván {p1.time}, {p1.players}.</>;
      return <>• Bé 5–8 tuổi: {L1} ({money(p1.price)}) – chọn nghề, kiếm tiền, mua đủ 4 món đồ.{'\n'}• Trẻ 9–15 tuổi: {L2} ({money(p2.price)}) – doanh nghiệp, tiết kiệm, đầu tư, xây nhà.{'\n'}Bé mấy tuổi để mình gợi ý kỹ hơn?</>;
    },
  },
  { k: ['khac nhau', 'so sanh', 'bo 2', 'doanh nghiep', 'dau tu', 'xay nha', 'phi di qua'], a: () => <>{L2} cho trẻ 9–15 tuổi: mỗi người có 500 đồng, mua 12 doanh nghiệp (Nhà hàng 200 đồng đến Bệnh viện 650 đồng) để thu phí người đi qua. Ô Tiết kiệm trả lại gấp 1,5 lần khi xây nhà, ô Đầu tư có thể được nhân 2, nhân 3 hoặc mất một nửa. Ai xây đủ 4 mức nhà trước là thắng.{'\n'}{L1} cho bé 5–8 tuổi thì đơn giản hơn: chọn nghề, mua đủ 4 món đồ. Xem bảng so sánh ở <Link to="/san-pham">trang Sản phẩm</Link>.</> },
  { k: ['luat', 'cach choi', 'choi the nao', 'huong dan', 'choi sao'], a: () => <>Bộ 1: mỗi lượt <b>tung xúc xắc → đi theo chiều kim đồng hồ → làm theo ô vừa dừng</b>. Ô xanh rút thẻ Cộng tiền, ô đỏ rút thẻ Trừ tiền, ô vàng rút Túi mù, ô Mua sắm được mua 1 thẻ Đồ vật ({ITEM_PRICE} đồng). Ai gom đủ 4 đồ vật của nghề mình trước sẽ thắng 🏆{'\n'}Bộ 2 thì mua doanh nghiệp và xây nhà. Luật đủ cả hai bộ ở <Link to="/gioi-thieu">trang Giới thiệu</Link>.</> },
  { k: ['nghe nghiep', 'nghe nao', 'may nghe', '8 nghe'], a: () => <>Bộ 1 có 8 nghề: {JOBS.map(j => j.name).join(', ')}. Mỗi nghề cần gom 4 đồ vật riêng, ví dụ Bác sĩ cần kim tiêm, ống nghe, hộp cứu thương và xe cấp cứu.</> },
  { k: ['bat dau', 'khoi dau', 'tien ban dau', 'moi nguoi nhan'], a: () => 'Bộ 1: mỗi người nhận 20 đồng (2 tờ 5 đồng, 3 tờ 2 đồng, 4 tờ 1 đồng), mỗi lần qua START được thêm 5 đồng. Bộ 2: mỗi người nhận 500 đồng.' },
  { k: ['tui mu'], a: () => 'Thẻ Túi mù là điều bất ngờ. Bộ 1 có 25 thẻ: được thưởng, mất tiền hoặc hiệu ứng như Lá chắn may mắn hủy 1 thẻ Trừ tiền. Bộ 2 có 40 thẻ: May mắn +30 đến +300 đồng, Đánh thuế, Sinh nhật, Tiến thẳng tới một ô, Phá nhà, Bảo vệ nhà…' },
  { k: ['trong hop', 'thanh phan', 'gom nhung gi', 'hop co gi', 'bo co gi'], a: () => <>{L1}: bàn cờ, 8 thẻ nghề, 32 thẻ đồ vật, 65 thẻ tình huống, 4 quân cờ, 1 xúc xắc, 180 tờ tiền, sách hướng dẫn.{'\n'}{L2}: bàn cờ, 12 thẻ doanh nghiệp, 40 thẻ Túi mù, 4 quân cờ, 4 nhà, 2 xúc xắc, 240 tờ tiền, sách hướng dẫn.</> },
  { k: ['bao lau', 'may nguoi', 'bao nhieu nguoi', 'thoi gian choi'], a: () => `Cả 2 bộ đều 2–4 người chơi. Bộ 1 mỗi ván ${p1.time}, Bộ 2 mỗi ván ${p2.time}.` },
  { k: [' gia ', 'gia ban', 'bao nhieu tien', 'khuyen mai', 'giam gia', 'ma giam', 'mua o dau', 'dat hang', 'mua hang'], a: () => <>{L1} giá <b>{money(p1.price)}</b>, {L2} giá <b>{money(p2.price)}</b>. Mua cả hai là {money(p1.price + p2.price)}, được miễn phí ship. Hiện Moni Yo chưa có mã giảm giá.{'\n'}Bộ 3, Bộ 4, Bộ 5 đang hoàn thiện, chưa có giá. Bấm chuông ở trang sản phẩm để được báo khi mở bán nhé 🔔</> },
  { k: ['giao hang', 'ship', 'van chuyen', 'nhan hang'], a: () => <>Giao toàn quốc, thường 2–4 ngày 🚚. <b>Miễn phí</b> cho đơn từ 500.000đ, đơn nhỏ hơn phí 30.000đ.</> },
  { k: ['thanh toan', 'chuyen khoan', ' cod ', ' qr ', 'tra tien'], a: () => 'Bạn chọn chuyển khoản (quét mã VietQR, đơn tự xác nhận khi nhận được tiền) hoặc trả tiền khi nhận hàng (COD). Sau khi đặt, trang đơn hàng hiện mã QR và tự cập nhật khi tiền về.' },
  { k: ['don hang', 'kiem tra don', 'theo doi don', 'ma don'], a: () => <>Bạn vào <Link to="/gio-hang">Giỏ hàng</Link>, kéo xuống mục <b>Tra cứu đơn hàng</b> và nhập số điện thoại hoặc email đã dùng khi đặt là thấy các đơn của mình. Đơn chuyển khoản được giữ 15 phút, quá hạn chưa chuyển thì tự hủy. Cần hỗ trợ thêm thì gọi {BRAND.hotline} hoặc <Link to="/lien-he">gửi lời nhắn</Link>.</> },
  { k: ['doi tra', 'bao hanh', 'bi loi', 'thieu the', 'thieu tien moni', 'mat the', 'bi hong'], a: () => <>Đổi mới trong 7 ngày nếu lỗi sản xuất hoặc thiếu thành phần. Lỡ làm mất thẻ, tiền hay quân cờ thì nhắn fanpage Moni Yo nhé. Hotline {BRAND.hotline} hoặc <Link to="/lien-he">gửi lời nhắn</Link>.</> },
  { k: ['lien he', 'hotline', 'so dien thoai', 'email', 'fanpage', 'facebook'], a: () => <>Hotline {BRAND.hotline}, email {BRAND.email}, hoặc <Link to="/lien-he">trang Liên hệ</Link>. Fanpage: Moni Yo trên Facebook.</> },
  { k: ['moni yo', 'moniyo', 'board game', 'tro choi'], a: () => <>Moni Yo là board game dạy trẻ về tiền, có 2 bộ: {L1} cho bé 5–8 tuổi và {L2} cho trẻ 9–15 tuổi. Bạn muốn biết về bộ nào?</> },
];

// Có chữ liên quan trẻ em / tiền bạc → coi là trong phạm vi, chỉ là chưa có câu trả lời sẵn
const IN_SCOPE = [' tien', ' con ', ' be ', ' tre ', 'moni', 'bo 1', 'bo 2', ' choi', ' mua', ' gia ', ' hop ', ' the '];

// Chủ đề hay gặp nhưng ngoài phạm vi (kể cả khi có chữ "giá", "tiền")
const OFF_TOPIC = [' vang ', 'gia vang', 'chung khoan', 'co phieu', 'bitcoin', 'crypto', 'tien ao', 'ty gia', 'lai suat ngan hang', 'vay tien', 'xo so',
  'thoi tiet', 'bong da', 'world cup', 'chinh tri', 'bau cu', 'viet code', 'lap trinh', 'python', 'javascript', 'giai bai tap', 'giai toan', 'dich giup', 'viet van',
  'trieu chung', 'chua benh', 'nau an', 'cong thuc mon', 'xem phim', 'game online'];

export function aiReply(text) {
  const q = ' ' + noAccent(text).replace(/[?!.,;:]/g, ' ') + ' ';
  if (OFF_TOPIC.some(k => q.includes(k)) && !q.includes('moni')) return refuse();
  // Hỏi về một thẻ doanh nghiệp cụ thể của Bộ 2
  const biz = BUSINESSES.find(([n]) => q.includes(noAccent(n)));
  if (biz) return <>Thẻ doanh nghiệp <b>{biz[0]}</b> ({L2}): giá mua {biz[1]} đồng, ai đi vào phải trả phí {biz[2]} đồng cho chủ. Đây là tiền trong trò chơi, không phải tiền thật.</>;
  const rule = RULES.find(r => r.k.some(k => q.includes(k)));
  if (rule) return rule.a(q);
  if (IN_SCOPE.some(k => q.includes(k))) {
    return <>Câu này mình chưa có câu trả lời sẵn. Bạn thử hỏi về <b>luật chơi</b>, <b>chọn Bộ 1 hay Bộ 2</b>, <b>giá và giao hàng</b>, <b>tiền tiêu vặt</b>, hoặc để lại lời nhắn ở <Link to="/lien-he">trang Liên hệ</Link> để nhóm Moni Yo gọi lại nhé 💛</>;
  }
  return refuse();
}

function refuse() {
  return <>Xin lỗi, mình chỉ hỗ trợ các câu hỏi về <b>Moni Yo</b> và <b>giáo dục tài chính cho trẻ</b>. Bạn có thể hỏi: “Bé 7 tuổi nên chơi bộ nào?” hoặc “Nên cho con bao nhiêu tiền tiêu vặt?”.</>;
}

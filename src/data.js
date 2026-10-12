// Dữ liệu mẫu. Ảnh sản phẩm được cắt từ 2 ảnh gốc bằng CSS (xem components/Crop.jsx).
// Ảnh hiển thị là bản phóng 2x đã làm nét (3072x2048); toạ độ cắt vẫn tính theo ảnh gốc 1536x1024
export const IMG = { yellow: '/assets/set-yellow-2x.webp', teal: '/assets/set-teal-2x.webp', W: 1536, H: 1024 };

// Vùng cắt [x, y, w, h] trên ảnh gốc 1536x1024
export const CROPS = {
  box: [0, 0, 650, 720],
  board: [612, 262, 700, 455],
  jobs: [660, 65, 870, 185],
  kit: [1320, 255, 216, 480],
  items: [20, 755, 710, 180],
  events: [765, 755, 380, 180],
  mission: [1230, 740, 300, 200],
  whole: [0, 0, 1536, 940],
  // Từng thẻ lẻ – dùng cho các thẻ bay quanh hộp ở hero
  cardChef: [668, 72, 97, 166],
  cardFire: [866, 72, 97, 166],
  cardArtist: [1282, 72, 100, 166],
  cardChance: [778, 765, 118, 170],
};

export const DEFAULT_PRODUCTS = [
  {
    id: 'uoc-mo-vang', name: 'Ước Mơ Nghề Nghiệp – Bản Vàng', price: 349000, oldPrice: 420000,
    img: 'yellow', crop: 'box', age: '5–7 tuổi', badge: 'Bán chạy', stock: 120, rating: 4.9, sold: 1284,
    short: 'Board game nhập vai 8 nghề nghiệp: làm việc, kiếm tiền, mua đồ và hoàn thành ước mơ.',
    desc: 'Bé chọn một nghề mơ ước, đi quanh bàn cờ để “đi làm” kiếm xu, gặp thẻ Cơ hội – Thử thách – Kiến thức, rồi dùng tiền mua đủ 4 món đồ nghề để hoàn thành ước mơ. Trò chơi giúp bé hiểu tiền đến từ lao động, biết so sánh giá và lên kế hoạch chi tiêu.',
    includes: ['1 bàn cờ gấp 50×50cm', '8 thẻ nghề nghiệp', '32 thẻ món đồ', '24 thẻ sự kiện', '8 thẻ nhiệm vụ', '60 xu game', '4 quân cờ + 1 xúc xắc'],
  },
  {
    id: 'uoc-mo-xanh', name: 'Ước Mơ Nghề Nghiệp – Bản Xanh Ngọc', price: 349000, oldPrice: 420000,
    img: 'teal', crop: 'box', age: '5–7 tuổi', badge: 'Mới', stock: 85, rating: 4.8, sold: 642,
    short: 'Phiên bản màu xanh ngọc dịu mắt, cùng luật chơi và bộ thẻ đầy đủ.',
    desc: 'Cùng nội dung với bản Vàng nhưng bảng màu xanh ngọc – kem nhẹ nhàng, phù hợp làm quà tặng. Ô trên bàn cờ in biểu tượng đồng xu và dấu hỏi giúp bé nhận biết nhanh.',
    includes: ['1 bàn cờ gấp 50×50cm', '8 thẻ nghề nghiệp', '32 thẻ món đồ', '24 thẻ sự kiện', '8 thẻ nhiệm vụ', '60 xu game', '4 quân cờ + 1 xúc xắc'],
  },
  {
    id: 'combo-gia-dinh', name: 'Combo Gia Đình (2 bản màu)', price: 599000, oldPrice: 840000,
    img: 'yellow', crop: 'whole', age: '5–10 tuổi', badge: 'Tiết kiệm 29%', stock: 40, rating: 5.0, sold: 318,
    short: 'Hai bộ Vàng + Xanh Ngọc, chơi được tới 8 người – lý tưởng cho gia đình đông con.',
    desc: 'Ghép 2 bộ để mở chế độ “Thành phố lớn” với 16 nghề và luật chơi mở rộng có ngân hàng, tiết kiệm có lãi. Kèm sổ tay hướng dẫn phụ huynh 20 trang.',
    includes: ['2 bộ Ước Mơ Nghề Nghiệp đầy đủ', 'Sổ tay phụ huynh 20 trang', 'Túi vải đựng xu'],
  },
  {
    id: 'the-nghe-mo-rong', name: 'Bộ Thẻ Nghề Nghiệp Mở Rộng', price: 129000,
    img: 'yellow', crop: 'jobs', age: '5–8 tuổi', stock: 200, rating: 4.7, sold: 530,
    short: '8 nghề mới: phi công, kỹ sư, bác sĩ thú y, đầu bếp bánh, lập trình viên…',
    desc: 'Mở rộng thế giới nghề nghiệp với 8 nghề mới kèm 32 thẻ món đồ tương ứng. Dùng chung với bàn cờ Ước Mơ Nghề Nghiệp.',
    includes: ['8 thẻ nghề mới', '32 thẻ món đồ mới'],
  },
  {
    id: 'ban-co-lon', name: 'Bàn Cờ Khổ Lớn 80cm', price: 159000,
    img: 'yellow', crop: 'board', age: '5–7 tuổi', stock: 60, rating: 4.8, sold: 211,
    short: 'Bàn cờ khổ lớn trải sàn, chất liệu vải canvas chống nước.',
    desc: 'Phiên bản trải sàn cho lớp học, câu lạc bộ hoặc sinh nhật. Vải canvas in sắc nét, gấp gọn, lau chùi dễ dàng.',
    includes: ['1 bàn cờ canvas 80×80cm', 'Túi đựng'],
  },
  {
    id: 'bo-xu-phu-kien', name: 'Bộ Xu Game & Quân Cờ', price: 89000,
    img: 'yellow', crop: 'kit', age: '3+ tuổi', stock: 300, rating: 4.6, sold: 980,
    short: '100 xu nhựa mệnh giá 1–5, 6 quân cờ gỗ và 2 xúc xắc.',
    desc: 'Bổ sung hoặc thay thế phụ kiện. Xu nhựa ABS an toàn, cạnh bo tròn, in nổi mệnh giá giúp bé tập đếm tiền.',
    includes: ['100 xu (1, 2, 5)', '6 quân cờ gỗ', '2 xúc xắc'],
  },
  {
    id: 'the-mon-do', name: 'Bộ 32 Thẻ Món Đồ', price: 99000,
    img: 'teal', crop: 'items', age: '5–7 tuổi', stock: 150, rating: 4.7, sold: 402,
    short: 'Thẻ món đồ in giá, giúp bé so sánh và lựa chọn khi mua sắm.',
    desc: 'Mỗi thẻ in hình món đồ nghề và giá tiền. Có thể dùng độc lập để chơi “Đi chợ” – bé nhận ngân sách và chọn mua đủ món.',
    includes: ['32 thẻ món đồ', 'Hướng dẫn trò “Đi chợ”'],
  },
  {
    id: 'the-su-kien', name: 'Thẻ Sự Kiện & Nhiệm Vụ', price: 79000,
    img: 'yellow', crop: 'events', age: '5–7 tuổi', badge: 'Hot', stock: 180, rating: 4.9, sold: 755,
    short: '48 thẻ Cơ hội – Thử thách – Kiến thức tài chính cho bé.',
    desc: 'Tình huống thực tế: làm thêm giờ, làm rơi đồ, tiết kiệm được khen thưởng… cùng câu hỏi kiến thức giúp cả nhà trò chuyện về tiền bạc.',
    includes: ['16 thẻ Cơ hội', '16 thẻ Thử thách', '16 thẻ Kiến thức'],
  },
];

export const BLOG = [
  { id: 'day-con-ve-tien-tu-5-tuoi', title: 'Dạy con về tiền từ 5 tuổi: bắt đầu từ đâu?', cat: 'Kiến thức', date: '2026-09-20', img: 'yellow', crop: 'kit', read: 6,
    excerpt: 'Trẻ 5 tuổi đã có thể hiểu tiền dùng để trao đổi. Đây là 5 bước nhẹ nhàng để bắt đầu.',
    body: ['Nhiều phụ huynh nghĩ nói chuyện tiền bạc với con là quá sớm. Thực tế, từ 5 tuổi trẻ đã có khả năng nhận biết mệnh giá, so sánh nhiều – ít và hiểu rằng muốn có đồ vật cần trao đổi bằng tiền.', 'Bước 1: Cho con cầm và đếm tiền thật trong những lần đi chợ. Bước 2: Giải thích tiền đến từ công việc – bố mẹ đi làm mới có lương. Bước 3: Dùng 3 hũ Tiêu – Tiết kiệm – Chia sẻ. Bước 4: Để con tự quyết một khoản nhỏ. Bước 5: Chơi board game nhập vai như Ước Mơ Nghề Nghiệp để luyện tập an toàn.', 'Điều quan trọng là kiên nhẫn và biến bài học thành trò chơi, thay vì những lời răn dạy khô khan.'] },
  { id: '3-hu-tien', title: 'Phương pháp 3 hũ tiền cho bé: Tiêu – Tiết kiệm – Chia sẻ', cat: 'Phương pháp', date: '2026-09-12', img: 'teal', crop: 'events', read: 5,
    excerpt: 'Chiếc hũ trong suốt giúp bé “nhìn thấy” tiền lớn lên mỗi ngày.',
    body: ['Hãy chuẩn bị 3 hũ thủy tinh trong suốt và dán nhãn. Mỗi khi bé nhận tiền mừng tuổi hay tiền thưởng việc nhà, cùng bé chia theo tỉ lệ 50 – 40 – 10.', 'Hũ Tiết kiệm nên gắn với một mục tiêu cụ thể có hình ảnh, ví dụ chiếc xe đạp. Khi đạt mục tiêu, hãy để bé tự đi mua – cảm giác ấy sẽ in sâu hơn mọi lời dạy.'] },
  { id: 'board-game-va-tu-duy', title: 'Vì sao board game giúp trẻ phát triển tư duy tài chính?', cat: 'Nghiên cứu', date: '2026-08-30', img: 'yellow', crop: 'board', read: 7,
    excerpt: 'Chơi là cách học tự nhiên nhất. Board game cho phép bé thử – sai mà không mất gì.',
    body: ['Trong board game, bé phải ra quyết định liên tục: mua ngay hay để dành, chấp nhận rủi ro hay an toàn. Mỗi lượt chơi là một vòng lặp hành động – kết quả – rút kinh nghiệm.', 'Các nghiên cứu về giáo dục sớm cho thấy trẻ ghi nhớ tốt hơn khi được trải nghiệm bằng tay và bằng cảm xúc. Board game kết hợp cả hai, lại có bố mẹ cùng tham gia.'] },
  { id: 'nghe-nghiep-va-tien', title: 'Kể con nghe về nghề nghiệp: mỗi công việc đều đáng quý', cat: 'Nuôi dạy', date: '2026-08-18', img: 'teal', crop: 'jobs', read: 4,
    excerpt: 'Giúp con hiểu mỗi nghề đều tạo ra giá trị và thu nhập theo cách riêng.',
    body: ['Đầu bếp nấu món ngon, bác sĩ chữa bệnh, nông dân trồng rau… Hãy kể cho con về công việc của những người xung quanh và giá trị họ mang lại.', 'Khi hiểu rằng tiền là phần thưởng cho giá trị mình tạo ra, trẻ sẽ trân trọng tiền bạc và có động lực học hỏi.'] },
  { id: 'tien-mung-tuoi', title: 'Tiền mừng tuổi: cho con giữ hay bố mẹ giữ?', cat: 'Hỏi đáp', date: '2026-08-02', img: 'yellow', crop: 'mission', read: 5,
    excerpt: 'Câu hỏi muôn thuở mỗi dịp Tết – và gợi ý cách vẹn cả đôi đường.',
    body: ['Thay vì “bố mẹ giữ hộ” rồi quên, hãy cùng con mở một sổ tiết kiệm nhỏ hoặc hũ tiền có ghi chép. Để con giữ một phần để tự chi tiêu, phần còn lại gửi vào mục tiêu dài hạn.', 'Minh bạch với con: ghi lại số tiền, cho con xem định kỳ. Đó là bài học đầu tiên về quản lý tài sản.'] },
  { id: 'choi-cung-con-cuoi-tuan', title: '5 trò chơi tài chính cuối tuần không cần mua gì', cat: 'Hoạt động', date: '2026-07-22', img: 'teal', crop: 'items', read: 4,
    excerpt: 'Bán hàng tại nhà, đi chợ giả, săn giá rẻ… đơn giản mà hiệu quả.',
    body: ['1. Cửa hàng tại nhà: bé bán đồ chơi cho bố mẹ bằng tiền giấy tự vẽ. 2. Đi chợ với ngân sách: cho bé 50.000đ chọn món ăn sáng cả nhà. 3. Săn giá: so sánh 2 món cùng loại. 4. Đổi việc nhà lấy xu. 5. Chơi board game Ước Mơ Nghề Nghiệp buổi tối.'] },
];

export const REVIEWS = [
  { name: 'Chị Thu Hà', city: 'Hà Nội', text: 'Con mình 6 tuổi giờ đi siêu thị biết hỏi “cái này bao nhiêu tiền, mẹ có đủ không”. Cả nhà tối nào cũng đòi chơi một ván!', stars: 5 },
  { name: 'Anh Minh Quân', city: 'TP.HCM', text: 'Thẻ in đẹp, xu cứng cáp. Luật chơi đơn giản, bé tự đọc được sau 2 ván. Rất đáng tiền.', stars: 5 },
  { name: 'Cô Lan – GV mầm non', city: 'Đà Nẵng', text: 'Mình dùng bàn cờ khổ lớn cho lớp lá, các bé rất hào hứng với phần nhập vai nghề nghiệp.', stars: 5 },
  { name: 'Chị Ngọc Anh', city: 'Hải Phòng', text: 'Mua combo cho 2 bé nhà mình, chơi chung với ông bà cũng vui. Giao hàng nhanh, đóng gói kỹ.', stars: 4 },
];

export const DEMO_ORDERS = [
  { id: 'DH1024', name: 'Nguyễn Thu Hà', phone: '0912 345 678', total: 698000, status: 'Đang giao', date: '2026-09-27', items: 2 },
  { id: 'DH1023', name: 'Trần Minh Quân', phone: '0987 111 222', total: 349000, status: 'Hoàn thành', date: '2026-09-26', items: 1 },
  { id: 'DH1022', name: 'Lê Ngọc Anh', phone: '0903 456 789', total: 599000, status: 'Chờ xác nhận', date: '2026-09-26', items: 1 },
  { id: 'DH1021', name: 'Phạm Hoàng Long', phone: '0938 222 333', total: 228000, status: 'Hoàn thành', date: '2026-09-25', items: 2 },
];

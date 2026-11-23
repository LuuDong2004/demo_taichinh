// Nội dung lấy từ sách hướng dẫn & bộ ảnh Moni Yo (docs/MONI YO). Ảnh web được xuất bằng scripts/build-images.mjs.
// Giá bán, tồn kho, lượt bán, đánh giá và đơn hàng là số liệu mẫu cho bản demo.
export const img = p => `/img/${p}.webp`;

export const BRAND = {
  name: 'Moni Yo',
  tagline: 'Học cách làm chủ đồng tiền, tự tin làm chủ tương lai.',
  motto: 'Khởi đầu từ niềm vui, trưởng thành cùng lựa chọn.',
  desc: 'Board game giáo dục tài chính cho trẻ 5–15 tuổi, gồm 2 bộ theo độ tuổi',
  ages: '5–15 tuổi',
  email: 'moniyoforchildren@gmail.com',
  fanpage: 'https://www.facebook.com/profile.php?id=61594764340414',
  hotline: '0382 087 738',
  // Người liên hệ (theo thông tin trên fanpage)
  contacts: [
    ['Đại diện dự án', 'Vũ Bích Huệ', '0382 087 738'],
    ['Đại diện truyền thông', 'Nguyễn Thị Thanh Lâm', '0392 735 829'],
  ],
};

// Mỗi người chơi nhận 20 đồng khởi đầu; mỗi thẻ Đồ vật giá 20 đồng
export const START_MONEY = [[5, 2], [2, 3], [1, 4]];
export const ITEM_PRICE = 20;
export const NOTES = [1, 2, 5, 10];

// 8 nghề – thứ tự như sách hướng dẫn. Ảnh: jobs/<id>, jobs/<id>-items, jobs/<id>-bg, items/<item>
export const JOBS = [
  { id: 'phi-cong', name: 'Phi công', color: '#1F5FC8', items: [['may-bay', 'Máy bay'], ['tai-nghe-pc', 'Tai nghe'], ['ban-do-bay', 'Bản đồ bay'], ['du-bao-ho', 'Dù bảo hộ']],
    about: 'Lái máy bay đưa hành khách đến khắp nơi trên thế giới.' },
  { id: 'linh-cuu-hoa', name: 'Lính cứu hỏa', color: '#DC3B33', items: [['mu-bao-ho-lch', 'Mũ bảo hộ'], ['voi-chua-chay', 'Vòi chữa cháy'], ['binh-chua-chay', 'Bình chữa cháy'], ['xe-cuu-hoa', 'Xe cứu hỏa']],
    about: 'Dập lửa, cứu người và bảo vệ an toàn cho mọi nhà.' },
  { id: 'ky-su', name: 'Kỹ sư', color: '#C27A22', items: [['mu-bao-ho', 'Mũ bảo hộ'], ['bua', 'Búa'], ['gach', 'Gạch'], ['may-xuc', 'Máy xúc']],
    about: 'Thiết kế và xây nên những ngôi nhà, cây cầu vững chắc.' },
  { id: 'giao-vien', name: 'Giáo viên', color: '#3A9E3F', items: [['sach', 'Sách'], ['bang', 'Bảng'], ['but', 'Bút'], ['thuoc', 'Thước']],
    about: 'Dạy chữ, dạy điều hay và chắp cánh ước mơ cho học trò.' },
  { id: 'bac-si', name: 'Bác sĩ', color: '#2C84DD', items: [['kim-tiem', 'Kim tiêm'], ['ong-nghe', 'Ống nghe'], ['hop-cuu-thuong', 'Hộp cứu thương'], ['xe-cap-cuu', 'Xe cấp cứu']],
    about: 'Khám bệnh, chữa bệnh và chăm sóc sức khỏe cho mọi người.' },
  { id: 'ca-si', name: 'Ca sĩ', color: '#8A45D2', items: [['mirco', 'Micro'], ['tai-nghe', 'Tai nghe'], ['dan-ghi-ta', 'Đàn ghi-ta'], ['piano', 'Piano']],
    about: 'Mang lời ca, tiếng hát và niềm vui đến cho khán giả.' },
  { id: 'canh-sat-giao-thong', name: 'Cảnh sát giao thông', short: 'Cảnh sát GT', color: '#D9A100', items: [['mu-csgt', 'Mũ cảnh sát'], ['huy-hieu', 'Huy hiệu'], ['bo-dam', 'Bộ đàm'], ['xe-tuan-tra', 'Xe tuần tra']],
    about: 'Giữ trật tự, giúp mọi người đi lại an toàn trên đường.' },
  { id: 'dau-bep', name: 'Đầu bếp', color: '#E0482E', items: [['bep', 'Bếp'], ['noi', 'Nồi'], ['chao', 'Chảo'], ['mu-dau-bep', 'Mũ đầu bếp']],
    about: 'Nấu những món ăn ngon, đẹp mắt cho cả gia đình.' },
];

// Các ô trên bàn cờ (icon: tiles/<id>)
export const TILES = [
  { id: 'start', name: 'Ô START', color: '#5BB3F5', text: 'Đi hết một vòng, qua hoặc dừng tại START được thưởng thêm 5 đồng.' },
  { id: 'cong-tien', name: 'Ô Cộng tiền', color: '#3DBE4E', text: 'Rút 1 thẻ Cộng tiền và nhận số tiền ghi trên thẻ.' },
  { id: 'tru-tien', name: 'Ô Trừ tiền', color: '#EF4B45', text: 'Rút 1 thẻ Trừ tiền và trả số tiền ghi trên thẻ.' },
  { id: 'tui-mu', name: 'Ô Túi mù', color: '#FFC928', text: 'Rút 1 thẻ Túi mù và làm theo điều bất ngờ ghi trên thẻ.' },
  { id: 'dong-bang', name: 'Ô Đóng băng', color: '#4FA6F0', text: 'Bỏ qua 1 lượt tung xúc xắc tiếp theo.' },
  { id: 'them-luot', name: 'Ô Thêm lượt', color: '#9B55E0', text: 'Được tung xúc xắc thêm 1 lần, di chuyển và thực hiện hành động ở ô mới.' },
  { id: 've-start', name: 'Ô Quay về START', color: '#9AA3AB', text: 'Đưa quân cờ về START. Do bị đưa về nên không nhận thưởng 5 đồng.' },
  { id: 'mua-sam', name: 'Ô Mua sắm', color: '#F6E7CB', text: `Được mua tối đa 1 thẻ Đồ vật của nghề mình nếu đủ tiền (${ITEM_PRICE} đồng/thẻ).` },
];

export const SETUP = [
  ['Chọn nghề nghiệp', 'Mỗi người bốc ngẫu nhiên 1 trong 8 thẻ Nghề nghiệp và ghi nhớ 4 thẻ Đồ vật cần thu thập.'],
  ['Chọn quân cờ', 'Mỗi người chọn một quân cờ và đặt tại ô START.'],
  ['Chuẩn bị các chồng thẻ', 'Xáo riêng thẻ Cộng tiền, Trừ tiền và Túi mù, đặt úp từng chồng tại khu vực tương ứng trên bàn cờ.'],
  ['Chuẩn bị tiền và vật dụng', 'Đặt tiền Moni Yo và các thẻ Đồ vật ở khu vực chung. Mỗi người nhận 20 đồng khởi đầu: 2 tờ 5 đồng, 3 tờ 2 đồng, 4 tờ 1 đồng.'],
  ['Xác định người đi trước', 'Lần lượt tung xúc xắc, ai được số chấm cao nhất đi trước. Nếu hòa, những người hòa tung lại.'],
];

export const TURN = [
  ['Tung xúc xắc', 'Đến lượt mình, bé tung xúc xắc để biết số bước di chuyển.'],
  ['Di chuyển quân cờ', 'Đi đúng số chấm trên xúc xắc, theo chiều kim đồng hồ.'],
  ['Thực hiện hành động', 'Quân cờ dừng ở ô nào, bé làm theo hành động của ô đó.'],
];

export const RULES = [
  'Người chơi lần lượt thực hiện lượt theo thứ tự đã xác định.',
  'Cân đối số tiền đang có để chọn thời điểm mua vật dụng.',
  'Chưa đủ tiền mua vật dụng thì tiếp tục chơi để kiếm thêm.',
  'Gặp ô có hiệu ứng đặc biệt thì làm theo hướng dẫn của ô đó.',
  'Nhiều quân cờ cùng dừng ở một ô thì được đứng chung.',
];

export const SHOP_STEPS = [
  ['Dừng đúng ô Mua sắm', 'Chỉ được mua vật dụng khi quân cờ dừng tại ô Mua sắm.'],
  ['Chọn vật dụng', `Chọn 1 thẻ Đồ vật thuộc nghề của mình và chưa có. Mỗi thẻ giá ${ITEM_PRICE} đồng.`],
  ['Kiểm tra số tiền', 'So giá vật dụng với số tiền đang có.'],
  ['Thanh toán', 'Đủ tiền thì trả tiền và nhận thẻ Đồ vật.'],
];

export const WIN = 'Người đầu tiên thu thập đủ 4 thẻ Đồ vật thuộc nghề đã chọn sẽ giành chiến thắng.';

// Thành phần Bộ 1 (sách hướng dẫn Bộ 1, trang 4)
export const COMPONENTS = [
  ['Bàn cờ Moni Yo', 1], ['Thẻ Nghề nghiệp', 8], ['Thẻ Đồ vật', 32], ['Thẻ Cộng tiền', 20], ['Thẻ Trừ tiền', 20],
  ['Thẻ Túi mù', 25], ['Xúc xắc', 1], ['Quân cờ người chơi', 4], ['Tiền Moni Yo', '180 tờ'],
];

// ===== Bộ 2 (9–15 tuổi) – theo sách hướng dẫn & mặt sau hộp Bộ 2 =====
export const COMPONENTS_2 = [
  ['Bàn cờ Moni Yo', 1], ['Thẻ Doanh nghiệp', 12], ['Thẻ Túi mù', 40], ['Quân cờ', 4],
  ['Xúc xắc', 2], ['Nhà', 4], ['Tiền Moni Yo', '240 tờ'], ['Sách hướng dẫn', 1],
];
export const NOTES_2 = [1, 2, 5, 10, 20, 50, 100, 200, 500];
export const START_MONEY_2 = 500;

// 12 doanh nghiệp: [tên, giá mua, phí đi qua] – ảnh product/bo2-biz/<thứ tự>
export const BUSINESSES = [
  ['Trung tâm thương mại', 580, 58], ['Trường học', 220, 22], ['Khu vui chơi', 370, 37], ['Thủy cung', 610, 61],
  ['Khách sạn', 630, 63], ['Rạp chiếu phim', 360, 36], ['Nhà sách', 210, 21], ['Bệnh viện', 650, 65],
  ['Sở thú', 350, 35], ['Nhà hàng', 200, 20], ['Bảo tàng', 240, 24], ['Trạm xăng', 380, 38],
];

export const SETUP_2 = [
  ['Chọn quân cờ', 'Mỗi người chọn một quân cờ và đặt ở ô START cùng màu.'],
  ['Chia tiền', `Mỗi người nhận ${START_MONEY_2} đồng để bắt đầu.`],
  ['Xếp thẻ Túi mù', 'Xáo đều rồi đặt cạnh bàn cờ.'],
  ['Xếp thẻ Doanh nghiệp và nhà', 'Đặt chung một chỗ cạnh bàn cờ, ai mua thì lấy.'],
  ['Chọn người đi trước', 'Mỗi người tung 2 xúc xắc, ai được tổng điểm cao nhất đi trước.'],
];

export const TILES_2 = [
  ['Ô START (A, B, C, D)', 'Mỗi người xuất phát ở ô cùng màu quân cờ và đi theo chiều kim đồng hồ. Muốn xây nhà hay nâng mức nhà thì phải về đúng ô START của mình.'],
  ['Ô Doanh nghiệp', 'Đủ tiền thì mua được. Mỗi doanh nghiệp chỉ có một chủ, đã có chủ thì không ai mua lại được.'],
  ['Ô Đầu tư', 'Đặt 10, 20, 30… đồng. Khoản này chỉ tính trong 1 vòng.'],
  ['Ô Tiết kiệm', 'Gửi 10, 20, 30… đồng. Tiền gửi chỉ rút ra khi xây nhà và được nhận lại gấp 1,5 lần.'],
  ['Ô x2, x3', 'Nếu đang có tiền ở ô Đầu tư, số tiền đó được nhân 2 hoặc nhân 3.'],
  ['Ô Túi mù', 'Rút 1 thẻ Túi mù và làm theo thẻ.'],
  ['Ô Đóng băng', 'Phải tung được 2 mặt xúc xắc giống nhau mới được đi tiếp.'],
  ['Ô Thêm lượt', 'Được tung xúc xắc thêm một lần.'],
];

export const RULES_2 = [
  'Đi vào doanh nghiệp của người khác thì trả ngay phí đi qua ghi trên thẻ cho chủ doanh nghiệp.',
  'Không đủ tiền trả phí thì phải bán lại nhà hoặc doanh nghiệp của mình cho ngân hàng.',
  'Đầu tư mà đi hết 1 vòng không gặp ô x2, x3 thì mất một nửa số tiền đã đặt. Ví dụ đặt 20 đồng, gặp ô x2 thì nhận về 40 đồng.',
  'Tiết kiệm thì không mất, nhưng chỉ rút được khi xây nhà. Ví dụ gửi 20 đồng, lúc xây nhà nhận lại 30 đồng.',
];

// 40 thẻ Túi mù Bộ 2 = 20 mẫu × 2 lá. [nhóm, tên thẻ, hiệu ứng, nội dung in trên thẻ] – ảnh product/bo2-tuimu/<thứ tự>
export const TUIMU_2 = [
  ['dac-biet', 'Phá 1 nhà', 'Phá nhà', 'Phá 1 nhà của người chơi tiếp theo. Nếu người chơi tiếp theo không có nhà thì lá bài vô hiệu.'],
  ['dac-biet', 'Bảo vệ nhà', 'Giữ lại', 'Bảo vệ nhà của bạn khỏi 1 lần bị phá. Bạn được quyền giữ lại lá này.'],
  ['mat', 'Đánh thuế', '−10 đồng', 'Bạn bị đánh thuế 10 đồng. Hãy nộp 10 đồng cho ngân hàng.'],
  ['mat', 'Đánh thuế', '−20 đồng', 'Bạn bị đánh thuế 20 đồng. Hãy nộp 20 đồng cho ngân hàng.'],
  ['mat', 'Đánh thuế', '−50 đồng', 'Bạn bị đánh thuế 50 đồng. Hãy nộp 50 đồng cho ngân hàng.'],
  ['mat', 'Đánh thuế', '−100 đồng', 'Bạn bị đánh thuế 100 đồng. Hãy nộp 100 đồng cho ngân hàng.'],
  ['duoc', 'May mắn', '+30 đồng', 'Bạn tìm thấy 30 đồng trong túi quần của mình. Hãy lấy 30 đồng từ ngân hàng nhé!'],
  ['duoc', 'May mắn', '+50 đồng', 'Bạn tìm được nhà cung cấp có giá tốt hơn, giúp tiết kiệm 50 đồng. Nhận 50 đồng từ ngân hàng.'],
  ['duoc', 'May mắn', '+100 đồng', 'Cửa hàng của bạn có nhiều khách hàng trong dịp lễ. Nhận 100 đồng từ ngân hàng.'],
  ['duoc', 'May mắn', '+200 đồng', 'Khoản đầu tư của bạn đã sinh lời. Nhận 200 đồng từ ngân hàng.'],
  ['duoc', 'May mắn', '+300 đồng', 'Doanh nghiệp của bạn đạt chứng nhận quốc gia. Bạn nhận được 300 đồng tiền thưởng từ ngân hàng.'],
  ['duoc', 'Sinh nhật', '+20 đồng mỗi người', 'Chúc mừng sinh nhật! Mỗi người chơi còn lại tặng bạn 20 đồng.'],
  ['di', 'Tiến thẳng', 'Tới ô Đầu tư', 'Tiến thẳng đến ô Đầu tư.'],
  ['di', 'Tiến thẳng', 'Tới ô Tiết kiệm', 'Tiến thẳng đến ô Tiết kiệm.'],
  ['di', 'Tiến thẳng', 'Tới ô Đóng băng', 'Tiến thẳng đến ô Đóng băng.'],
  ['di', 'Tiến thẳng', 'Tới ô nhân gần nhất', 'Tiến thẳng đến ô Nhân (x2, x3) gần nhất.'],
  ['di', 'Nhảy cóc', 'Về nhà', 'Bạn được nhảy cóc về nhà của mình.'],
  ['duoc', 'Tiết kiệm', '+20 đồng vào ô Tiết kiệm', 'Ngân hàng trả lãi. Bạn được tặng 20 đồng vào ô Tiết kiệm.'],
  ['dac-biet', 'Băng tan', 'Ra khỏi ô Đóng băng', 'Ra khỏi ô Đóng băng. Được giữ lại thẻ nếu chưa dùng, chỉ dùng được 1 lần.'],
  ['mat', 'Tết đến rồi', '−10 đồng mỗi người', 'Tết đến rồi. Bạn hãy lì xì mỗi người chơi 10 đồng.'],
];
export const TUIMU_2_GROUPS = [
  ['duoc', 'Được tiền', 'Thưởng, tiền lãi, sinh nhật'],
  ['mat', 'Mất tiền', 'Đóng thuế, lì xì Tết'],
  ['di', 'Di chuyển', 'Tiến thẳng tới một ô, nhảy cóc về nhà'],
  ['dac-biet', 'Đặc biệt', 'Phá nhà, bảo vệ nhà, thoát ô Đóng băng'],
];

// 4 mức nhà – ai xây đủ cả 4 mức trước thì thắng
export const HOUSES = [['Mức 1', 500, '#E5473D'], ['Mức 2', 600, '#8A5BD6'], ['Mức 3', 800, '#F2C21B'], ['Mức Win', 1000, '#3BB54A']];
export const WIN_2 = 'Người đầu tiên xây đủ 4 mức nhà sẽ thắng.';

export const STRATEGY_2 = [
  ['Đừng tiêu hết tiền', 'Luôn giữ lại một khoản để trả phí hoặc chớp cơ hội mua doanh nghiệp.'],
  ['Hỏi trước khi mua', '“Mình có thật sự cần không?” và “Mua xong còn lại bao nhiêu?”'],
  ['Để tiền làm ra tiền', 'Doanh nghiệp mua sớm sẽ thu phí suốt cả ván.'],
  ['Có mục tiêu rõ ràng', 'Biết mức nhà tiếp theo cần bao nhiêu thì biết nên để dành bao nhiêu.'],
];

// Thông số in trên mặt sau hộp (giống nhau ở cả 2 bộ)
export const SPECS = [
  ['Chất liệu', 'Bìa carton cứng, giấy couche C300 và C150, nhựa in 3D (PLA)'],
  ['Kích thước hộp', '30 × 25 × 7 cm'],
  ['Xuất xứ', 'Việt Nam, sản xuất năm 2026'],
  ['Lưu ý', 'Có chi tiết nhỏ, không dành cho trẻ dưới 3 tuổi. Trẻ chơi cần có người lớn trông.'],
];

// Thẻ tình huống: [ảnh cards/<loại>/<slug>, nội dung, giá trị]
export const CARDS = {
  cong: [
    ['ban-ban-do-choi-cu-khong-dung-den', 'Bạn bán đồ chơi cũ không dùng đến', 5],
    ['ban-ban-nhung-quyen-truyen-cu-khong-doc-nua', 'Bạn bán những quyển truyện cũ không đọc nữa', 2],
    ['ban-ban-nuoc-chanh-tu-pha', 'Bạn bán nước chanh tự pha', 5],
    ['ban-bieu-dien-van-nghe-va-nhan-tien-thuong', 'Bạn biểu diễn văn nghệ và nhận tiền thưởng', 2],
    ['ban-bo-1-dong-vao-heo-dat-de-tiet-kiem', 'Bạn bỏ 1 đồng vào heo đất để tiết kiệm', 1],
    ['ban-cham-soc-mot-chau-cay-roi-ban-cho-nguoi-khac', 'Bạn chăm sóc một chậu cây rồi bán cho người khác', 2],
    ['ban-cung-gia-dinh-thu-hoach-rau-de-dem-ban', 'Bạn cùng gia đình thu hoạch rau để đem bán', 5],
    ['ban-giai-dung-cau-do', 'Bạn giải đúng câu đố và nhận tiền thưởng', 2],
    ['ban-gom-chai-nhua-di-ban', 'Bạn gom chai nhựa đi bán', 2],
    ['ban-khong-mua-mon-do-minh-chua-can', 'Bạn không mua món đồ mình chưa cần', 2],
    ['ban-lam-banh-cung-me-de-ban', 'Bạn làm bánh cùng mẹ để bán', 5],
    ['ban-lam-hoa-giay-de-ban', 'Bạn làm hoa giấy để bán', 1],
    ['ban-lam-thiep-de-ban', 'Bạn làm thiệp để bán', 2],
    ['ban-so-sanh-gia-truoc-khi-mua-va-chon-mon-do-re-hon', 'Bạn so sánh giá trước khi mua và chọn món đồ rẻ hơn', 5],
    ['ban-sua-lai-mon-do-choi-cu-de-choi-tiep', 'Bạn sửa lại món đồ chơi cũ để chơi tiếp', 5],
    ['ban-tham-gia-mot-cuoc-thi-va-nhan-duoc-phan-thuong', 'Bạn tham gia một cuộc thi và nhận được phần thưởng', 5],
    ['ban-tiet-kiem-duoc-mot-khoan-tien-nho', 'Bạn tiết kiệm được một khoản tiền nhỏ', 2],
    ['ban-tim-lai-duoc-1-dong-bo-quen-trong-tui', 'Bạn tìm lại được 1 đồng bỏ quên trong túi', 1],
    ['ban-tra-lai-do-cho-nguoi-bi-that-lac-va-duoc-thuong', 'Bạn trả lại đồ cho người bị thất lạc và được thưởng', 5],
    ['ban-ve-1-buc-tranh-va-ban', 'Bạn vẽ 1 bức tranh và bán', 5],
  ],
  tru: [
    ['ban-can-mua-them-do-dung-hoc-tap', 'Bạn cần mua thêm đồ dùng học tập', 2],
    ['ban-dang-ky-mot-buoi-hoc-ve-va-can-tra-phi', 'Bạn đăng ký một buổi học vẽ và cần trả phí', 5],
    ['ban-lam-gay-but-cua-ban-cung-lop-va-phai-mua-tra', 'Bạn làm gãy bút của bạn cùng lớp và phải mua trả', 2],
    ['ban-lam-mat-mot-mon-do-va-phai-mua-lai', 'Bạn làm mất một món đồ và phải mua lại', 1],
    ['ban-lam-uot-sach-thu-vien-va-phai-tra-tien-boi-thuong', 'Bạn làm ướt sách thư viện và phải trả tiền bồi thường', 5],
    ['ban-len-nham-chuyen-xe-va-phai-mua-ve-moi', 'Bạn lên nhầm chuyến xe và phải mua vé mới', 2],
    ['ban-mua-1-mon-do-choi-moi', 'Bạn mua 1 món đồ chơi mới', 2],
    ['ban-mua-giay-va-mau-de-lam-do-thu-cong', 'Bạn mua giấy và màu để làm đồ thủ công', 2],
    ['ban-mua-mon-do-dat-hon-ma-khong-so-sanh-gia', 'Bạn mua món đồ đắt hơn mà không so sánh giá', 2],
    ['ban-mua-mot-mon-do-nhung-khong-can-thiet', 'Bạn mua một món đồ nhưng không cần thiết', 2],
    ['ban-mua-mot-mon-qua-luu-niem-trong-chuyen-di', 'Bạn mua một món quà lưu niệm trong chuyến đi', 2],
    ['ban-mua-nguyen-lieu-lam-qua-tang-me-ngay-8-3', 'Bạn mua nguyên liệu làm quà tặng mẹ ngày 8/3', 2],
    ['ban-mua-qua-sinh-nhat-tang-ban-than', 'Bạn mua quà sinh nhật tặng bạn thân', 2],
    ['ban-mua-thuoc-cho-thu-cung-bi-om', 'Bạn mua thuốc cho thú cưng bị ốm', 2],
    ['ban-quen-giu-tien-can-than-va-lam-mat-tien', 'Bạn quên giữ tiền cẩn thận và làm mất tiền', 1],
    ['do-choi-cua-ban-bi-hong-va-phai-dem-di-sua', 'Đồ chơi của bạn bị hỏng và phải đem đi sửa', 1],
    ['doi-giay-bi-ban-ban-tra-tien-de-ve-sinh-giay', 'Đôi giày bị bẩn, bạn trả tiền để vệ sinh giày', 5],
    ['quay-nuoc-chanh-cua-ban-het-nguyen-lieu-ban-phai-mua-them-de-ban-tiep', 'Quầy nước chanh hết nguyên liệu, bạn phải mua thêm để bán tiếp', 2],
    ['troi-nong-ban-mua-mot-cay-kem', 'Trời nóng, bạn mua một cây kem', 1],
    ['xe-dap-bi-hong-giua-duong-ban-phai-sua-gap', 'Xe đạp bị hỏng giữa đường, bạn phải sửa gấp', 2],
  ],
  // [slug, tên thẻ, hiệu ứng]
  tuiMu: [
    ['mo-heo-dat', 'Mở heo đất', '+10 đồng'],
    ['mon-qua-bat-ngo', 'Món quà bất ngờ', '+10 đồng'],
    ['sinh-nhat-vui-ve', 'Sinh nhật vui vẻ!', '+10 đồng'],
    ['tet-den-roi', 'Tết đến rồi!', '+10 đồng'],
    ['ngay-dac-biet', 'Ngày đặc biệt', 'Nhận tiền từ mỗi người chơi khác'],
    ['rut-them-1-the-cong-tien', 'Thẻ may mắn', 'Rút thêm 1 thẻ Cộng tiền'],
    ['van-may-nhan-doi', 'Vận may nhân đôi', 'Rút 2 thẻ Cộng tiền'],
    ['la-chan-may-man', 'Lá chắn may mắn', 'Giữ lại để hủy 1 thẻ Trừ tiền'],
    ['mon-do-dang-giam-gia', 'Món đồ đang giảm giá', 'Món đồ tiếp theo giảm 10 đồng'],
    ['duoc-tung-xuc-xac-them-1-lan', 'Xúc xắc đặc biệt', 'Được tung xúc xắc thêm 1 lần'],
    ['duong-di-thuan-loi', 'Đường đi thuận lợi', 'Tiến 2 ô'],
    ['di-nham-duong', 'Đi nhầm đường', 'Lùi 2 ô'],
    ['ban-quyen-gop-tien-tu-thien', 'Quyên góp từ thiện', '−10 đồng cho trẻ em gặp khó khăn'],
    ['heo-dat-bi-that-lac', 'Heo đất bị thất lạc', '−10 đồng'],
    ['ngay-xui-xeo', 'Ngày xui xẻo', '−10 đồng và lùi 3 ô'],
    ['kho-bau-bi-cuop', 'Kho báu bị cướp', 'Đưa 15 đồng cho người đang có ít tiền nhất'],
    ['tiec-an-mung', 'Tiệc ăn mừng', 'Mời cả nhóm ăn mừng: chia mỗi người 5 đồng'],
    ...[['bac-si', 'Bác sĩ'], ['ca-si', 'Ca sĩ'], ['canh-sat', 'Cảnh sát'], ['dau-bep', 'Đầu bếp'], ['giao-vien', 'Giáo viên'], ['ky-su', 'Kỹ sư'], ['linh-cuu-hoa', 'Lính cứu hỏa'], ['phi-cong', 'Phi công']]
      .map(([s, n]) => [`neu-ban-chon-nghe-${s}`, `Thưởng nghề ${n}`, `+15 đồng nếu bé đang chơi nghề ${n}`]),
  ],
};

export const KID_TIPS = [
  ['Trân trọng đồng tiền', 'Tiền không tự nhiên xuất hiện. Hãy biết trân trọng và sử dụng số tiền mình có một cách hợp lý.'],
  ['Suy nghĩ trước khi mua', 'Trước khi mua, hãy tự hỏi: “Mình có thực sự cần món đồ này không?” và “Mình có đủ tiền không?”.'],
  ['Tiết kiệm từ những điều nhỏ bé', 'Không cần thật nhiều tiền mới bắt đầu tiết kiệm. Dành dụm từng chút giúp bé đến gần mục tiêu.'],
  ['Tự tin đưa ra lựa chọn', 'Đôi khi bé cần chọn giữa tiêu tiền ngay và giữ lại cho sau này. Hãy cân nhắc trước khi quyết định.'],
];

export const PARENT_TIPS = [
  ['Khuyến khích con tự thực hành', 'Để bé tự đếm tiền, tính số tiền nhận được, số phải trả và số còn lại.'],
  ['Đặt câu hỏi gợi mở', '“Con đang có bao nhiêu tiền?”, “Vì sao con muốn mua món này trước?”, “Nếu chưa đủ tiền, con sẽ làm gì?”'],
  ['Kết nối với cuộc sống thực tế', 'Liên hệ các tình huống trong Moni Yo với việc đi siêu thị, tiết kiệm hay chọn món đồ hợp ngân sách.'],
  ['Tôn trọng lựa chọn của con', 'Khuyến khích con giải thích quyết định. Thay vì chỉ nhìn thắng thua, hãy cùng con nhìn lại điều đã học được.'],
];

export const LEARN = [
  ['Hiểu giá trị đồng tiền', 'Tiền đến từ việc làm, tiết kiệm và những lựa chọn đúng.'],
  ['Tư duy tài chính', 'Cân đối thu – chi, so sánh giá và chọn thời điểm mua.'],
  ['Kỹ năng giải quyết vấn đề', 'Xử lý tình huống bất ngờ từ thẻ Trừ tiền và Túi mù.'],
  ['Thói quen tài chính tốt', 'Tiết kiệm, không mua thứ chưa cần và biết chia sẻ.'],
];

const lower = s => s[0].toLowerCase() + s.slice(1);
const qty = list => list.map(([n, q]) => `${q} ${lower(n)}`);

// status: 'soon' = chưa mở bán → hiện "Sắp ra mắt", không hiện giá, chưa cho vào giỏ, cho đăng ký nhận tin
// Giá bán 2 bộ do nhóm dự án chốt: Bộ 1 399.000đ, Bộ 2 369.000đ. Chưa có số đã bán / đánh giá thật nên để 0 (ẩn).
export const isSoon = p => p.status === 'soon';
// Link cũ /san-pham/moni-yo (khi web mới có 1 bộ) → Bộ 1
export const PRODUCT_ALIAS = { 'moni-yo': 'moni-yo-bo-1' };

const shot = (set, name, alt) => ({ src: img(`product/${set}-${name}`), alt });

export const DEFAULT_PRODUCTS = [
  {
    id: 'moni-yo-bo-1', set: 1, status: 'sale', price: 399000,
    name: 'Moni Yo Bộ 1: Nghề nghiệp', line: 'Dành cho bé 5–8 tuổi',
    img: img('product/bo1-box'), theme: '#FFC928',
    gallery: [
      shot('bo1', 'box', 'Hộp Moni Yo Bộ 1'),
      shot('bo1', 'front', 'Mặt trước hộp Bộ 1'),
      shot('bo1', 'back', 'Mặt sau hộp Bộ 1: thành phần, cách chơi, thông tin sản phẩm'),
      shot('bo1', 'board', 'Bàn cờ Bộ 1'),
      shot('bo1', 'guide', 'Bìa sách hướng dẫn Bộ 1'),
    ],
    age: '5–8 tuổi', players: '2–4 người', time: '30–60 phút', notes: '1, 2, 5, 10 đồng',
    rating: 0, sold: 0, kind: 'set',
    short: 'Bé chọn một nghề, đi quanh bàn cờ kiếm tiền rồi mua đủ 4 món đồ của nghề đó.',
    desc: [
      'Mỗi bé bốc một thẻ nghề. Chẳng hạn ai bốc Bác sĩ thì cần gom đủ ống nghe, kim tiêm, hộp cứu thương và xe cấp cứu. Đến lượt thì tung xúc xắc, dừng ô nào làm theo ô đó: rút thẻ Cộng tiền, thẻ Trừ tiền, thẻ Túi mù, hoặc ghé ô Mua sắm để mua đồ. Ai đủ 4 món trước là thắng.',
      'Tiền trong bộ này chỉ có 4 mệnh giá 1, 2, 5 và 10 đồng, bé 5 tuổi vẫn tự đếm được. 65 thẻ tình huống lấy từ chuyện hằng ngày như bán nước chanh, làm mất bút của bạn hay mua quà sinh nhật, nên chơi xong bố mẹ có sẵn chuyện để nói với con.',
    ],
    learn: [
      ['Hiểu giá trị đồng tiền', 'Tiền có được nhờ làm việc, và mỗi món đồ đều có giá của nó.'],
      ['Tập tính toán', 'Cộng tiền nhận, trừ tiền tiêu, so xem có đủ mua chưa.'],
      ['Xử lý tình huống', 'Gặp thẻ Trừ tiền hay Túi mù thì phải tự nghĩ cách xoay xở.'],
      ['Thói quen tốt', 'Biết để dành, không mua thứ chưa cần, biết chia sẻ.'],
    ],
    includes: qty(COMPONENTS).concat('1 sách hướng dẫn 16 trang'),
  },
  {
    id: 'moni-yo-bo-2', set: 2, status: 'sale', price: 369000,
    name: 'Moni Yo Bộ 2: Doanh nghiệp', line: 'Dành cho trẻ 9–15 tuổi',
    img: img('product/bo2-box'), theme: '#3BB54A',
    gallery: [
      shot('bo2', 'box', 'Hộp Moni Yo Bộ 2'),
      shot('bo2', 'front', 'Mặt trước hộp Bộ 2'),
      shot('bo2', 'back', 'Mặt sau hộp Bộ 2: thành phần, cách chơi, thông tin sản phẩm'),
      shot('bo2', 'board', 'Bàn cờ Bộ 2'),
      shot('bo2', 'guide', 'Bìa sách hướng dẫn Bộ 2'),
      shot('bo2', 'cover-dn', 'Hộp 12 thẻ Doanh nghiệp'),
      shot('bo2', 'cover-tuimu', 'Hộp 40 thẻ Túi mù'),
    ],
    age: '9–15 tuổi', players: '2–4 người', time: '60–90 phút', notes: '9 mệnh giá, từ 1 đến 500 đồng',
    rating: 0, sold: 0, kind: 'set',
    short: 'Mua doanh nghiệp, thu phí đi qua, gửi tiết kiệm, đầu tư và xây đủ 4 mức nhà.',
    desc: [
      `Mỗi người bắt đầu với ${START_MONEY_2} đồng. Trên bàn cờ có 12 doanh nghiệp như trường học, bệnh viện, rạp chiếu phim. Ai mua trước thì người khác đi vào phải trả phí cho mình. Muốn thắng thì phải xây đủ 4 mức nhà, mức cuối cùng tốn 1.000 đồng.`,
      'Bộ này có thêm ô Tiết kiệm và ô Đầu tư. Gửi tiết kiệm thì chắc ăn, khi xây nhà rút ra được gấp 1,5 lần. Đầu tư thì có thể được nhân 2, nhân 3, nhưng nếu đi hết một vòng mà không gặp ô x2, x3 thì mất một nửa. Con sẽ phải tự cân nhắc giữ tiền, mua doanh nghiệp hay chấp nhận rủi ro.',
    ],
    learn: [
      ['Hiểu giá trị đồng tiền', 'Làm việc với số tiền lớn hơn, nhiều mệnh giá hơn.'],
      ['Tập đầu tư và tiết kiệm', 'Thấy rõ khác nhau giữa khoản chắc chắn và khoản có rủi ro.'],
      ['Lựa chọn và trao đổi', 'Mua gì trước, bán gì khi thiếu tiền trả phí.'],
      ['Lập kế hoạch', 'Tính trước cần bao nhiêu tiền cho mức nhà tiếp theo.'],
    ],
    includes: qty(COMPONENTS_2),
  },
  {
    id: 'moni-yo-bo-3', status: 'soon', name: 'Moni Yo Bộ 3', price: 0,
    img: img('brand/kids-jump'), art: true, line: 'Bộ trò chơi mới',
    stock: 0, rating: 0, sold: 0, kind: 'set',
    short: 'Bộ trò chơi tiếp theo của Moni Yo đang được hoàn thiện. Nội dung, độ tuổi và giá sẽ công bố khi mở bán.',
    desc: 'Moni Yo Bộ 3 đang trong giai đoạn hoàn thiện. Bấm chuông và để lại số điện thoại, Moni Yo sẽ báo bạn ngay khi bộ này mở bán.',
    includes: [],
  },
  {
    id: 'moni-yo-bo-4', status: 'soon', name: 'Moni Yo Bộ 4', price: 0,
    img: img('brand/kids-jump'), art: true, line: 'Bộ trò chơi mới',
    stock: 0, rating: 0, sold: 0, kind: 'set',
    short: 'Bộ trò chơi tiếp theo của Moni Yo đang được hoàn thiện. Nội dung, độ tuổi và giá sẽ công bố khi mở bán.',
    desc: 'Moni Yo Bộ 4 đang trong giai đoạn hoàn thiện. Bấm chuông và để lại số điện thoại, Moni Yo sẽ báo bạn ngay khi bộ này mở bán.',
    includes: [],
  },
  {
    id: 'moni-yo-bo-5', status: 'soon', name: 'Moni Yo Bộ 5', price: 0,
    img: img('brand/kids-jump'), art: true, line: 'Bộ trò chơi mới',
    stock: 0, rating: 0, sold: 0, kind: 'set',
    short: 'Bộ trò chơi tiếp theo của Moni Yo đang được hoàn thiện. Nội dung, độ tuổi và giá sẽ công bố khi mở bán.',
    desc: 'Moni Yo Bộ 5 đang trong giai đoạn hoàn thiện. Bấm chuông và để lại số điện thoại, Moni Yo sẽ báo bạn ngay khi bộ này mở bán.',
    includes: [],
  },
];

export const BLOG = [
  { id: 'day-con-ve-tien-tu-5-tuoi', title: 'Dạy con về tiền từ 5 tuổi: bắt đầu từ đâu?', cat: 'Kiến thức', date: '2026-10-20', img: img('brand/kids-steps'), read: 6,
    excerpt: 'Năm tuổi là lúc con đã phân biệt được nhiều và ít, đủ để bắt đầu những bài học tiền bạc đầu tiên.',
    body: ['Nhiều bố mẹ nghĩ nói chuyện tiền với con 5 tuổi là sớm. Thật ra ở tuổi này con đã nhận ra tờ tiền nào lớn hơn, biết muốn có đồ thì phải trả tiền. Mình chỉ cần bắt đầu từ những việc rất nhỏ.', 'Lúc đi chợ, đưa con cầm tiền và tự trả cho cô bán hàng. Khi con hỏi tiền ở đâu ra, nói thật là bố mẹ đi làm mới có lương. Ở nhà, chuẩn bị ba cái hũ: một hũ để tiêu, một hũ để dành, một hũ để cho đi. Thỉnh thoảng giao cho con tự quyết một khoản nhỏ, kể cả khi con tiêu chưa khéo.', 'Một ván cờ như Moni Yo Bộ 1 cũng là chỗ tập rất tốt, vì con được tiêu, được mất tiền mà không có gì phải tiếc. Quan trọng nhất là đừng biến chuyện này thành bài giảng. Con nhớ lâu hơn khi được tự làm.'] },
  { id: 'bi-quyet-tai-chinh-cho-tre', title: '4 điều về tiền con nên biết sớm', cat: 'Phương pháp', date: '2026-10-12', img: img('product/money'), read: 5,
    excerpt: 'Quý đồng tiền, hỏi trước khi mua, để dành từ khoản nhỏ và dám tự chọn.',
    body: ['Thứ nhất, tiền không tự có. Khi con hiểu mỗi đồng đều đến từ công sức của ai đó, con sẽ cẩn thận hơn lúc tiêu.', 'Thứ hai, hỏi mình trước khi mua. Chỉ cần hai câu: “Mình có thật sự cần không?” và “Mình có đủ tiền không?”. Tập nhiều lần, con sẽ tự hỏi mà không cần bố mẹ nhắc.', 'Thứ ba, để dành không cần nhiều tiền. Vài nghìn mỗi tuần bỏ vào hũ cũng đủ để con thấy số tiền lớn dần. Thứ tư, cho con tự chọn. Có lần con sẽ chọn sai, nhưng sai lúc còn nhỏ thì cái giá rất rẻ.'] },
  { id: 'board-game-va-tu-duy', title: 'Vì sao chơi cờ giúp con hiểu chuyện tiền bạc?', cat: 'Nghiên cứu', date: '2026-09-30', img: img('brand/kids-sit'), read: 7,
    excerpt: 'Trong một ván cờ, con được thử, được sai và làm lại ngay ở lượt sau.',
    body: ['Chơi cờ là chuỗi quyết định liên tục: mua bây giờ hay chờ, liều một chút hay đi chắc. Mỗi lượt con thấy ngay kết quả của lựa chọn vừa rồi, rồi điều chỉnh ở lượt sau. Đây là thứ rất khó dạy bằng lời.', 'Trẻ cũng nhớ tốt hơn những gì mình tự tay làm và có cảm xúc đi kèm, như vui khi gom đủ đồ hay tiếc khi lỡ tiêu mất. Cả nhà ngồi chơi cùng thì bố mẹ còn có dịp hỏi con vì sao lại chọn như thế.'] },
  { id: 'nghe-nghiep-va-tien', title: 'Kể con nghe về nghề nghiệp của mọi người', cat: 'Nuôi dạy', date: '2026-09-18', img: img('jobs/bac-si'), read: 4,
    excerpt: 'Mỗi nghề làm ra một thứ có ích, và tiền lương là phần trả lại cho công sức đó.',
    body: ['Đầu bếp nấu món ngon, bác sĩ chữa bệnh, kỹ sư xây nhà, ca sĩ làm người khác vui. Lúc rảnh, hãy kể cho con về công việc của ông bà, bố mẹ, cô hàng xóm, mỗi người làm gì và giúp được ai.', 'Hiểu rằng tiền là phần trả cho công sức mình bỏ ra, con sẽ quý tiền hơn và có thêm lý do để chăm học.'] },
  { id: 'cau-hoi-goi-mo-cho-phu-huynh', title: '3 câu hỏi giúp con tự nghĩ về tiền', cat: 'Hỏi đáp', date: '2026-09-02', img: img('brand/kids-peek'), read: 5,
    excerpt: '“Con đang có bao nhiêu?”, “Sao con muốn mua món này trước?”, “Chưa đủ tiền thì con làm gì?”',
    body: ['Thay vì đưa đáp án, bố mẹ thử hỏi lại con. Ba câu đơn giản ở trên đủ để con dừng lại một chút và nói ra lý do của mình.', 'Sau mỗi ván Moni Yo, ngồi lại với con vài phút: lúc nào con mua hợp lý, lúc nào lẽ ra nên chờ? Thắng hay thua không quan trọng bằng việc con nhận ra mình đã nghĩ gì.'] },
  { id: 'choi-cung-con-cuoi-tuan', title: '5 trò chơi về tiền cuối tuần, không cần mua gì', cat: 'Hoạt động', date: '2026-08-22', img: img('brand/kids-jump'), read: 4,
    excerpt: 'Bán hàng ở nhà, đi chợ có ngân sách, thi xem ai tìm được món rẻ hơn.',
    body: ['Một: mở cửa hàng ở nhà, con bán đồ chơi cho bố mẹ bằng tiền giấy tự vẽ. Hai: cho con 50.000đ chọn đồ ăn sáng cho cả nhà. Ba: ra siêu thị, thi xem ai tìm được món cùng loại mà rẻ hơn. Bốn: làm việc nhà nhận một khoản thưởng nhỏ. Năm: tối thứ bảy cả nhà chơi một ván Moni Yo.'] },
];

// Bài báo về giáo dục tài chính cho trẻ (2025–2026), mở link gốc ở tab mới. Tóm tắt do Moni Yo viết lại.
export const PRESS = [
  { source: 'Nhân Dân', date: '2026-06-16', url: 'https://nhandan.vn/tre-em-buoc-vao-doi-song-tai-chinh-ngay-cang-som-post969380.html',
    title: 'Trẻ em bước vào đời sống tài chính ngày càng sớm',
    excerpt: 'Trẻ cầm tiền và mua sắm trên mạng từ sớm nhưng nhiều em chưa hiểu lãi suất, ngân sách hay rủi ro. Chuyên gia cho rằng việc dạy trong trường còn rời rạc.' },
  { source: 'Giáo dục & Thời đại', date: '2026-03-26', url: 'https://giaoducthoidai.vn/day-tre-cach-su-dung-tien-tieu-vat-hop-ly-post768459.html',
    title: 'Dạy trẻ cách sử dụng tiền tiêu vặt hợp lý',
    excerpt: 'Gợi ý cho con một khoản cố định mỗi tuần và để con tự quyết, kể cả khi lúc đầu tiêu chưa đúng. Kèm theo đó là dạy con so giá, phân biệt món cần và món thích.' },
  { source: 'Giáo dục & Thời đại', date: '2026-01-31', url: 'https://giaoducthoidai.vn/khi-hoc-sinh-dua-di-san-van-hoa-vao-boardgame-giao-duc-post766032.html',
    title: 'Khi học sinh đưa di sản văn hóa vào boardgame giáo dục',
    excerpt: 'Năm học sinh chuyên Lê Hồng Phong (TP.HCM) làm board game “Hành trình Đất Việt” trong sáu tháng. Một ví dụ về việc dùng trò chơi để học.' },
  { source: 'VnExpress', date: '2025-08-18', url: 'https://vnexpress.net/lan-dau-co-sach-day-tai-chinh-cho-hoc-sinh-lop-1-12-4928404.html',
    title: 'Lần đầu có sách dạy tài chính cho học sinh lớp 1-12',
    excerpt: 'NXB Giáo dục Việt Nam ra bộ 12 cuốn giáo dục tài chính. Tiểu học học nhận biết tiền và tiết kiệm, lớp lớn học dần về chi tiêu, thanh toán và đầu tư.' },
  { source: 'Dân trí', date: '2025-04-19', url: 'https://dantri.com.vn/giao-duc/vi-sao-cho-con-tien-tieu-vat-la-bai-hoc-quan-trong-dau-doi-20250416105646841.htm',
    title: 'Vì sao cho con tiền tiêu vặt là bài học quan trọng đầu đời?',
    excerpt: 'Chuyên gia khuyên coi tiền tiêu vặt là cách dạy con, không dùng để thưởng phạt, và để con được sai ở những khoản nhỏ.' },
  { source: 'VietnamPlus', date: '2025-04-11', url: 'https://www.vietnamplus.vn/tao-san-choi-giao-duc-tai-chinh-gieo-mam-kien-thuc-cho-the-he-tre-post1027155.vnp',
    title: 'Tạo sân chơi giáo dục tài chính, gieo mầm kiến thức cho thế hệ trẻ',
    excerpt: 'Thời báo Ngân hàng và FPT mở sân chơi “Tài chính thông minh” trên VioEdu cho học sinh cả nước, có thi trực tuyến và hoạt động về chi tiêu, tiết kiệm.' },
  { source: 'Giáo dục & Thời đại', date: '2025-03-09', url: 'https://giaoducthoidai.vn/giao-duc-tai-chinh-buoc-di-chien-luoc-post720603.html',
    title: 'Giáo dục tài chính: Bước đi chiến lược',
    excerpt: 'Giáo viên dùng trò chơi, phiên chợ để dạy học sinh chi tiêu. Chuyên gia Viện Khoa học Giáo dục và UNICEF đề nghị đưa nội dung này vào các môn học.' },
];

export const REVIEWS = [
  { name: 'Chị Thu Hà', city: 'Thanh Xuân, Hà Nội', text: 'Con mình 6 tuổi giờ đi siêu thị biết hỏi “cái này bao nhiêu tiền, mẹ có đủ không”. Cả nhà tối nào cũng đòi chơi một ván!', stars: 5 },
  { name: 'Anh Minh Quân', city: 'Cầu Giấy, Hà Nội', text: 'Thẻ in đẹp, nhân vật dễ thương. Bé thích nhất thẻ Túi mù vì không biết sẽ được thưởng hay bị trừ tiền.', stars: 5 },
  { name: 'Cô Lan – GV mầm non', city: 'Đống Đa, Hà Nội', text: 'Mình dùng Moni Yo cho lớp lá, các bé rất hào hứng với phần chọn nghề và đếm tiền khi mua đồ vật.', stars: 5 },
  { name: 'Chị Ngọc Anh', city: 'Hai Bà Trưng, Hà Nội', text: 'Luật chơi đơn giản, 2 bé nhà mình chơi chung với ông bà cũng vui. Ván nào cũng có tiếng cười.', stars: 4 },
  { name: 'Anh Hoàng Long', city: 'Long Biên, Hà Nội', text: 'Bé nhà mình 9 tuổi, chơi xong tự lập sổ ghi tiền tiêu vặt. Bố mẹ không cần nhắc nhiều nữa.', stars: 5 },
  { name: 'Chị Phương Thảo', city: 'Hoàng Mai, Hà Nội', text: 'Thích nhất là bé được chọn nghề mình mơ ước rồi tự tính toán mua đủ đồ vật. Vừa chơi vừa học rất tự nhiên.', stars: 5 },
];


export const COUPON = 'MONIYO10';

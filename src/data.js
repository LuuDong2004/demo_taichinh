// Nội dung lấy từ sách hướng dẫn & bộ ảnh Moni Yo (docs/MONI YO). Ảnh web được xuất bằng scripts/build-images.mjs.
// Giá bán, tồn kho, lượt bán, đánh giá và đơn hàng là số liệu mẫu cho bản demo.
export const img = p => `/img/${p}.webp`;

export const BRAND = {
  name: 'Moni Yo',
  tagline: 'Học cách làm chủ đồng tiền, tự tin làm chủ tương lai.',
  motto: 'Khởi đầu từ niềm vui, trưởng thành cùng lựa chọn.',
  desc: 'Bộ đồ chơi giáo dục tài chính dành cho trẻ em',
  email: 'xinchao@moniyo.vn',
  hotline: '0900 123 456',
  address: '123 Đường Hạnh Phúc, Q. Cầu Giấy, Hà Nội',
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

// Thành phần trong hộp (sách hướng dẫn, trang 4)
export const COMPONENTS = [
  ['Bàn cờ Moni Yo', 1], ['Thẻ Nghề nghiệp', 8], ['Thẻ Đồ vật', 32], ['Thẻ Cộng tiền', 20], ['Thẻ Trừ tiền', 20],
  ['Thẻ Túi mù', 25], ['Xúc xắc', 1], ['Quân cờ người chơi', 4], ['Tiền Moni Yo', '240 tờ'],
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

const FULL_SET = COMPONENTS.map(([n, q]) => `${q} ${n}`).concat('1 Sách hướng dẫn 16 trang');

// status: 'soon' = sản phẩm chưa hoàn thiện thiết kế → hiện "Sắp ra mắt", không bán, cho đăng ký nhận tin
export const isSoon = p => p.status === 'soon';

export const DEFAULT_PRODUCTS = [
  {
    id: 'moni-yo', name: 'Bộ đồ chơi Moni Yo', price: 349000, oldPrice: 420000,
    img: img('product/box'), gallery: ['product/box', 'product/box-back', 'product/board', 'product/kit', 'product/card-stacks', 'product/pawns'].map(img),
    age: '5+ tuổi', badge: 'Bán chạy', stock: 120, rating: 4.9, sold: 1284, kind: 'set',
    short: 'Board game nhập vai 8 nghề nghiệp: đi làm kiếm tiền, xử lý tình huống, mua đủ 4 đồ vật để chiến thắng.',
    desc: 'Mỗi bé chọn một nghề trong 8 nghề, tung xúc xắc đi quanh bàn cờ, rút thẻ Cộng tiền, Trừ tiền, Túi mù và dừng ở ô Mua sắm để mua đồ vật của nghề mình. Ai thu thập đủ 4 thẻ Đồ vật trước sẽ thắng. Qua từng lượt, bé học cách kiếm tiền, cân nhắc chi tiêu, tiết kiệm và tự đưa ra lựa chọn.',
    includes: FULL_SET,
  },
  {
    id: 'bo-the-tinh-huong', status: 'soon', name: 'Bộ 65 thẻ tình huống', price: 99000,
    img: img('product/card-stacks'), gallery: ['product/card-stacks', 'cards/cong/ban-ban-nuoc-chanh-tu-pha', 'cards/tru/troi-nong-ban-mua-mot-cay-kem', 'cards/tui-mu/sinh-nhat-vui-ve'].map(img),
    age: '5+ tuổi', stock: 0, rating: 0, sold: 0, kind: 'addon',
    short: '20 thẻ Cộng tiền, 20 thẻ Trừ tiền và 25 thẻ Túi mù – thay thế hoặc bổ sung cho bộ chính.',
    desc: 'Mỗi thẻ là một tình huống gần gũi: bán nước chanh, gom chai nhựa, mua quà sinh nhật bạn, làm mất tiền… Bố mẹ có thể dùng riêng bộ thẻ để kể chuyện và hỏi bé “nếu là con, con sẽ làm gì?”.',
    includes: ['20 thẻ Cộng tiền', '20 thẻ Trừ tiền', '25 thẻ Túi mù'],
  },
  {
    id: 'bo-the-nghe-nghiep', status: 'soon', name: 'Bộ thẻ 8 nghề & 32 đồ vật', price: 99000,
    img: img('items/may-bay'), gallery: ['items/may-bay', 'items/ong-nghe', 'items/mu-dau-bep', 'items/dan-ghi-ta'].map(img),
    age: '5+ tuổi', stock: 0, rating: 0, sold: 0, kind: 'addon',
    short: '8 thẻ Nghề nghiệp và 32 thẻ Đồ vật minh họa sinh động, giúp bé làm quen các công việc.',
    desc: 'Phi công, Lính cứu hỏa, Kỹ sư, Giáo viên, Bác sĩ, Ca sĩ, Cảnh sát giao thông và Đầu bếp – mỗi nghề có 4 đồ vật đặc trưng. Bộ thẻ cũng dùng được cho trò ghép cặp nghề – đồ vật.',
    includes: ['8 thẻ Nghề nghiệp', '32 thẻ Đồ vật'],
  },
  {
    id: 'tien-moni-yo', status: 'soon', name: 'Tiền Moni Yo (240 tờ)', price: 59000,
    img: img('product/money'), gallery: ['product/money', 'product/kit'].map(img),
    age: '5+ tuổi', stock: 0, rating: 0, sold: 0, kind: 'addon',
    short: 'Tiền giấy 4 mệnh giá 1, 2, 5, 10 đồng – in màu dễ phân biệt, giúp bé tập đếm và đổi tiền.',
    desc: 'Mỗi mệnh giá một màu riêng: vàng 1 đồng, xanh dương 2 đồng, hồng 5 đồng, xanh lá 10 đồng. Ngoài trò chơi, bé có thể dùng để chơi bán hàng, đi chợ tại nhà.',
    includes: ['240 tờ tiền Moni Yo', '4 mệnh giá: 1, 2, 5, 10 đồng'],
  },
  {
    id: 'quan-co-nhan-vat', status: 'soon', name: 'Bộ 8 quân cờ nhân vật', price: 79000,
    img: img('product/pawns'), gallery: ['product/pawns', 'jobs/bac-si', 'jobs/phi-cong'].map(img),
    age: '5+ tuổi', stock: 0, rating: 0, sold: 0, kind: 'addon',
    short: 'Quân cờ hình 8 nhân vật nghề nghiệp, kèm 1 xúc xắc.',
    desc: 'Mỗi quân cờ là một nhân vật: bác sĩ, ca sĩ, cảnh sát giao thông, đầu bếp, giáo viên, kỹ sư, lính cứu hỏa, phi công. Bé chọn đúng nhân vật của nghề mình để nhập vai.',
    includes: ['8 quân cờ nhân vật', '1 xúc xắc'],
  },
  {
    id: 'ban-co-moni-yo', status: 'soon', name: 'Bàn cờ Moni Yo', price: 89000,
    img: img('product/board'), gallery: ['product/board', 'brand/cover'].map(img),
    age: '5+ tuổi', stock: 0, rating: 0, sold: 0, kind: 'addon',
    short: 'Bàn cờ đồng cỏ – dòng suối với đường đi uốn lượn và 8 loại ô hành động.',
    desc: 'Đường đi gồm ô START, Cộng tiền, Trừ tiền, Túi mù, Đóng băng, Thêm lượt, Quay về START và Mua sắm. Phù hợp để thay thế khi bàn cờ cũ bị hỏng.',
    includes: ['1 bàn cờ Moni Yo'],
  },
];

export const BLOG = [
  { id: 'day-con-ve-tien-tu-5-tuoi', title: 'Dạy con về tiền từ 5 tuổi: bắt đầu từ đâu?', cat: 'Kiến thức', date: '2026-10-20', img: img('brand/cover'), read: 6,
    excerpt: 'Trẻ 5 tuổi đã có thể hiểu tiền dùng để trao đổi. Đây là 5 bước nhẹ nhàng để bắt đầu.',
    body: ['Nhiều phụ huynh nghĩ nói chuyện tiền bạc với con là quá sớm. Thực tế, từ 5 tuổi trẻ đã có khả năng nhận biết mệnh giá, so sánh nhiều – ít và hiểu rằng muốn có đồ vật cần trao đổi bằng tiền.', 'Bước 1: Cho con cầm và đếm tiền trong những lần đi chợ. Bước 2: Giải thích tiền đến từ công việc – bố mẹ đi làm mới có lương. Bước 3: Dùng 3 hũ Tiêu – Tiết kiệm – Chia sẻ. Bước 4: Để con tự quyết một khoản nhỏ. Bước 5: Chơi board game nhập vai như Moni Yo để luyện tập an toàn.', 'Điều quan trọng là kiên nhẫn và biến bài học thành trò chơi, thay vì những lời răn dạy khô khan.'] },
  { id: 'bi-quyet-tai-chinh-cho-tre', title: '4 bí quyết tài chính bé nào cũng nên biết', cat: 'Phương pháp', date: '2026-10-12', img: img('product/money'), read: 5,
    excerpt: 'Trân trọng đồng tiền, suy nghĩ trước khi mua, tiết kiệm từ điều nhỏ và tự tin lựa chọn.',
    body: ['Trân trọng đồng tiền: tiền không tự nhiên xuất hiện. Khi bé hiểu mỗi đồng đều đến từ công sức, bé sẽ dùng tiền cẩn thận hơn.', 'Suy nghĩ trước khi mua: hãy tập cho bé hai câu hỏi “Mình có thực sự cần món này không?” và “Mình có đủ tiền không?”.', 'Tiết kiệm từ những điều nhỏ bé và tự tin đưa ra lựa chọn: không cần nhiều tiền mới bắt đầu để dành, và đôi khi giữ tiền lại cho sau này là quyết định đáng giá.'] },
  { id: 'board-game-va-tu-duy', title: 'Vì sao board game giúp trẻ phát triển tư duy tài chính?', cat: 'Nghiên cứu', date: '2026-09-30', img: img('product/board'), read: 7,
    excerpt: 'Chơi là cách học tự nhiên nhất. Board game cho phép bé thử – sai mà không mất gì.',
    body: ['Trong board game, bé phải ra quyết định liên tục: mua ngay hay để dành, chấp nhận rủi ro hay an toàn. Mỗi lượt chơi là một vòng lặp hành động – kết quả – rút kinh nghiệm.', 'Trẻ ghi nhớ tốt hơn khi được trải nghiệm bằng tay và bằng cảm xúc. Board game kết hợp cả hai, lại có bố mẹ cùng tham gia.'] },
  { id: 'nghe-nghiep-va-tien', title: 'Kể con nghe về nghề nghiệp: mỗi công việc đều đáng quý', cat: 'Nuôi dạy', date: '2026-09-18', img: img('product/pawns'), read: 4,
    excerpt: 'Giúp con hiểu mỗi nghề đều tạo ra giá trị và thu nhập theo cách riêng.',
    body: ['Đầu bếp nấu món ngon, bác sĩ chữa bệnh, kỹ sư xây nhà, ca sĩ mang lại niềm vui… Hãy kể cho con về công việc của những người xung quanh và giá trị họ mang lại.', 'Khi hiểu rằng tiền là phần thưởng cho giá trị mình tạo ra, trẻ sẽ trân trọng tiền bạc và có động lực học hỏi.'] },
  { id: 'cau-hoi-goi-mo-cho-phu-huynh', title: '3 câu hỏi gợi mở giúp con nghĩ về tiền', cat: 'Hỏi đáp', date: '2026-09-02', img: img('guide/08'), read: 5,
    excerpt: '“Con đang có bao nhiêu tiền?”, “Vì sao con muốn mua món này trước?”, “Nếu chưa đủ tiền, con sẽ làm gì?”',
    body: ['Thay vì đưa ra đáp án, hãy đặt câu hỏi để con tự suy nghĩ. Những câu hỏi đơn giản giúp bé dừng lại trước khi quyết định và hiểu lý do của chính mình.', 'Sau mỗi ván Moni Yo, hãy cùng con nhìn lại: lúc nào con mua đúng, lúc nào nên chờ thêm? Điều quan trọng không chỉ là thắng thua mà là điều con học được.'] },
  { id: 'choi-cung-con-cuoi-tuan', title: '5 trò chơi tài chính cuối tuần không cần mua gì', cat: 'Hoạt động', date: '2026-08-22', img: img('product/card-stacks'), read: 4,
    excerpt: 'Bán hàng tại nhà, đi chợ giả, săn giá rẻ… đơn giản mà hiệu quả.',
    body: ['1. Cửa hàng tại nhà: bé bán đồ chơi cho bố mẹ bằng tiền giấy tự vẽ. 2. Đi chợ với ngân sách: cho bé 50.000đ chọn món ăn sáng cả nhà. 3. Săn giá: so sánh 2 món cùng loại. 4. Đổi việc nhà lấy tiền thưởng nhỏ. 5. Chơi Moni Yo buổi tối cùng cả nhà.'] },
];

export const REVIEWS = [
  { name: 'Chị Thu Hà', city: 'Hà Nội', text: 'Con mình 6 tuổi giờ đi siêu thị biết hỏi “cái này bao nhiêu tiền, mẹ có đủ không”. Cả nhà tối nào cũng đòi chơi một ván!', stars: 5 },
  { name: 'Anh Minh Quân', city: 'TP.HCM', text: 'Thẻ in đẹp, nhân vật dễ thương. Bé thích nhất thẻ Túi mù vì không biết sẽ được thưởng hay bị trừ tiền.', stars: 5 },
  { name: 'Cô Lan – GV mầm non', city: 'Đà Nẵng', text: 'Mình dùng Moni Yo cho lớp lá, các bé rất hào hứng với phần chọn nghề và đếm tiền khi mua đồ vật.', stars: 5 },
  { name: 'Chị Ngọc Anh', city: 'Hải Phòng', text: 'Luật chơi đơn giản, 2 bé nhà mình chơi chung với ông bà cũng vui. Giao hàng nhanh, đóng gói kỹ.', stars: 4 },
];

export const DEMO_ORDERS = [
  { id: 'DH1024', name: 'Nguyễn Thu Hà', phone: '0912 345 678', total: 448000, status: 'Đang giao', date: '2026-10-27', items: 2 },
  { id: 'DH1023', name: 'Trần Minh Quân', phone: '0987 111 222', total: 349000, status: 'Hoàn thành', date: '2026-10-26', items: 1 },
  { id: 'DH1022', name: 'Lê Ngọc Anh', phone: '0903 456 789', total: 698000, status: 'Chờ xác nhận', date: '2026-10-26', items: 2 },
  { id: 'DH1021', name: 'Phạm Hoàng Long', phone: '0938 222 333', total: 158000, status: 'Hoàn thành', date: '2026-10-25', items: 2 },
];

export const COUPON = 'MONIYO10';

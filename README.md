# Moni Yo – Web bộ đồ chơi giáo dục tài chính cho trẻ em (Vite + React)

Nội dung (luật chơi, 8 nghề, 65 thẻ tình huống, thành phần hộp) lấy từ sách hướng dẫn và bộ ảnh Moni Yo.

## Chạy
```
npm install
npm run dev       # http://localhost:5173
npm run build     # xuất ra dist/
npm run preview   # xem thử bản build
```

## Các trang (react-router-dom)
| Trang | Đường dẫn |
|---|---|
| Trang chủ | `/` |
| Danh sách sản phẩm (lọc, tìm, sắp xếp) | `/san-pham` |
| Chi tiết sản phẩm | `/san-pham/:id` |
| Giỏ hàng (mã giảm giá `MONIYO10`) | `/gio-hang` |
| Thanh toán | `/thanh-toan` |
| Giới thiệu: sứ mệnh, thành phần, luật chơi, 8 nghề, 65 thẻ, góc phụ huynh, sách hướng dẫn | `/gioi-thieu` |
| Liên hệ | `/lien-he` |
| Trợ lý AI Moni Yo (cửa sổ nổi góc phải) | `/ai` chuyển về trang chủ và mở cửa sổ |
| Blog / bài viết | `/blog`, `/blog/:id` |
| Quản trị (admin / 123456) – tạm ẩn khỏi menu, gõ trực tiếp URL | `/admin` |

## Cấu trúc
```
src/
  main.jsx              BrowserRouter + ShopProvider
  App.jsx               Khai báo routes
  styles.css            Toàn bộ giao diện, biến màu ở :root
  data.js               Nội dung game (8 nghề, ô bàn cờ, 65 thẻ, luật chơi) + sản phẩm, blog, đơn mẫu
  lib/ShopContext.jsx   State chung: sản phẩm, giỏ hàng, đơn, liên hệ, admin, toast (lưu localStorage)
  lib/ai.jsx            Luật trả lời của trợ lý AI mô phỏng
  components/           Layout, Icons, Blocks (thẻ sản phẩm/blog...), Game (8 nghề, ô bàn cờ, bộ thẻ, xem ảnh lớn), Assistant
  pages/                Mỗi trang một file
scripts/build-images.mjs  Xuất ảnh web từ bộ ảnh gốc
public/img/             Ảnh web (WebP) đã xuất – được commit
docs/MONI YO/           Bộ ảnh gốc (~660MB) – KHÔNG commit (.gitignore)
```

## Ảnh
Ảnh gốc rất nặng (file in, tới 9000px / 48MB) nên không đưa lên git. Khi có ảnh gốc mới:
1. Đặt vào `docs/MONI YO/` (giữ nguyên tên thư mục/tên file như hiện tại).
2. Chạy `node scripts/build-images.mjs` → ghi đè `public/img/` (~8MB tổng).

Ảnh minh hoạ lớn: thu về kích thước hiển thị 2x rồi nén WebP chất lượng 82–85. Logo, icon ô bàn cờ, tiền: WebP lossless.

## Ghi chú
- Giá bán, tồn kho, lượt bán, đánh giá, đơn hàng mẫu, địa chỉ/hotline/email là số liệu demo – cần thay bằng thông tin thật.
- Dữ liệu (giỏ hàng, đơn hàng, sản phẩm sửa trong admin, liên hệ) lưu ở `localStorage` của trình duyệt.
- Trợ lý AI là bản mô phỏng theo từ khoá. Muốn dùng AI thật cần backend gọi Claude API (không để API key ở phía trình duyệt).
- Đăng nhập admin chỉ là demo phía client.
- Khi deploy dùng BrowserRouter, cần cấu hình server trả `index.html` cho mọi đường dẫn (Vercel/Netlify làm sẵn với SPA rewrite).

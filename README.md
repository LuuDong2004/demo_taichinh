# Ước Mơ Kids – Web đồ chơi giáo dục tài chính (Vite + React)

Tông vàng, bố cục lấy cảm hứng từ banhcaynguvi.com.

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
| Giỏ hàng (mã giảm giá `UOCMO10`) | `/gio-hang` |
| Thanh toán | `/thanh-toan` |
| Giới thiệu sản phẩm | `/gioi-thieu` |
| Liên hệ | `/lien-he` |
| Trợ lý AI Heo Vàng + công cụ tiết kiệm | `/ai` |
| Blog / bài viết | `/blog`, `/blog/:id` |
| Quản trị (admin / 123456) – tạm ẩn khỏi menu, gõ trực tiếp URL | `/admin` |

## Cấu trúc
```
src/
  main.jsx              BrowserRouter + ShopProvider
  App.jsx               Khai báo routes
  styles.css            Toàn bộ giao diện, biến màu ở :root
  data.js               Dữ liệu mẫu + vùng cắt ảnh (CROPS)
  lib/ShopContext.jsx   State chung: sản phẩm, giỏ hàng, đơn, liên hệ, admin, toast (lưu localStorage)
  lib/ai.jsx            Luật trả lời của trợ lý AI mô phỏng
  lib/utils.js          money, noAccent, storage...
  components/           Layout (header/footer), Crop, Icons, Blocks (ProductCard, BlogCard, PageHero...)
  pages/                Mỗi trang một file
public/assets/          2 ảnh bộ sản phẩm (ảnh từng món được cắt bằng CSS)
```

## Ghi chú
- Dữ liệu (giỏ hàng, đơn hàng, sản phẩm sửa trong admin, liên hệ) lưu ở `localStorage` của trình duyệt.
- Trợ lý AI là bản mô phỏng theo từ khoá. Muốn dùng AI thật cần backend gọi Claude API (không để API key ở phía trình duyệt).
- Đăng nhập admin chỉ là demo phía client.
- Khi deploy dùng BrowserRouter, cần cấu hình server trả `index.html` cho mọi đường dẫn (Vercel/Netlify làm sẵn với SPA rewrite).

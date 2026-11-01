import { img } from '../data';

// Sản phẩm chưa ra mắt → chưa có ảnh: dùng chung MỘT khung "Hình ảnh sản phẩm" cho mọi sản phẩm.
// Khi có ảnh thật: thêm img/gallery cho sản phẩm và bỏ cờ `art` trong src/data.js.
export default function ProductArt({ size = 'md' }) {
  return (
    <div className={`p-ph ${size}`} role="img" aria-label="Hình ảnh sản phẩm đang cập nhật">
      <img src={img('brand/logo')} alt="" />
      {size !== 'sm' && <><b>Hình ảnh sản phẩm</b><span>Đang cập nhật</span></>}
    </div>
  );
}

// Thumbnail dùng chung: sản phẩm chưa có ảnh (art) thì hiện khung chung, ngược lại dùng ảnh (sản phẩm do admin thêm)
export function ProductThumb({ p, size }) {
  return p.art ? <ProductArt size={size} /> : <img src={p.img} alt={p.name} loading="lazy" decoding="async" />;
}

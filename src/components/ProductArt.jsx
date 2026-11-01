import { img } from '../data';

// Ảnh đại diện sản phẩm khi CHƯA được dùng ảnh sản phẩm thật: ghép từ các yếu tố nhận diện
// (nền màu, nhân vật, icon ô bàn cờ, logo) + chuyển động nhẹ.
// art = { bg: [màu1, màu2], logo?, kids?: ảnh nhân vật lớn, chars?: [id nghề], icons?: [id icon ô bàn cờ] }
export default function ProductArt({ art, size = 'md' }) {
  const { bg = ['#FFE27A', '#FFC928'], logo, kids, chars = [], icons = [] } = art || {};
  const layout = kids ? 'kids' : chars.length ? 'chars' : 'icons';
  return (
    <div className={`p-art ${size} ${layout}`} style={{ '--a': bg[0], '--b': bg[1] }} aria-hidden="true">
      <span className="p-art-sun" />
      <span className="p-art-dots" />
      {logo && <img className="p-art-logo" src={img('brand/logo')} alt="" />}
      {kids && <img className="p-art-kids" src={img(kids)} alt="" />}
      {chars.length > 0 && (
        <div className="p-art-chars">{chars.map(c => <img key={c} src={img(`jobs/${c}`)} alt="" loading="lazy" />)}</div>
      )}
      <div className="p-art-icons">
        {icons.map((ic, i) => <span key={ic} style={{ '--i': i }}><img src={img(`tiles/${ic}`)} alt="" loading="lazy" /></span>)}
      </div>
    </div>
  );
}

// Thumbnail dùng chung: có art thì vẽ khung minh hoạ, không thì dùng ảnh (sản phẩm do admin thêm)
export function ProductThumb({ p, size }) {
  return p.art ? <ProductArt art={p.art} size={size} /> : <img src={p.img} alt={p.name} loading="lazy" decoding="async" />;
}

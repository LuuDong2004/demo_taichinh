import { Link } from 'react-router-dom';
import { EmptyState } from '../components/Blocks';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <EmptyState as="h1" pic="kids-peek" title="Ối! Không tìm thấy trang"
          action={<div className="es-actions"><Link to="/" className="btn">Về trang chủ</Link><Link to="/san-pham" className="btn btn-light">Xem sản phẩm</Link></div>}>
          Trang bạn tìm có thể đã đổi địa chỉ hoặc không còn nữa.
        </EmptyState>
      </div>
    </section>
  );
}

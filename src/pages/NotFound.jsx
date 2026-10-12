import { Link } from 'react-router-dom';
import { Pig } from '../components/Icons';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container empty">
        <div className="big"><Pig size={96} /></div>
        <h1 className="title">Không tìm thấy trang</h1>
        <Link to="/" className="btn">Về trang chủ</Link>
      </div>
    </section>
  );
}

import { CommitStrip, PageHero } from '../components/Blocks';
import { Clock, Mail, Phone, Pin } from '../components/Icons';
import { useShop } from '../lib/ShopContext';

const INFO = [[<Pin size={22} />, 'Địa chỉ', '123 Đường Hạnh Phúc, Q. Cầu Giấy, Hà Nội'], [<Phone size={22} />, 'Hotline / Zalo', '0900 123 456'], [<Mail size={22} />, 'Email', 'xinchao@uocmokids.vn'], [<Clock size={22} />, 'Giờ làm việc', '08:00 – 21:00, cả thứ 7 & chủ nhật']];

export default function Contact() {
  const { setMessages, toast } = useShop();
  const submit = e => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    setMessages(m => [{ ...d, date: new Date().toISOString().slice(0, 10) }, ...m]);
    e.target.reset();
    toast('Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm 💛');
  };

  return (
    <>
      <PageHero eyebrow="Liên hệ" title="Kết nối với chúng tôi">Liên hệ</PageHero>
      <section className="section">
        <div className="container contact">
          <div className="panel">
            <h3>Thông tin liên hệ</h3>
            <div className="info-list">
              {INFO.map(([i, h, t]) => <div className="info-item" key={h}><span className="ic">{i}</span><div><b>{h}</b><div style={{ color: 'var(--muted)' }}>{t}</div></div></div>)}
            </div>
            <div className="map">
              <span className="pin"><Pin size={46} /></span>
              <span style={{ position: 'absolute', bottom: 12, fontWeight: 700, color: 'var(--brown)', fontSize: 13 }}>Ước Mơ Kids – Cầu Giấy</span>
            </div>
          </div>
          <form className="panel" onSubmit={submit}>
            <h3>Gửi lời nhắn</h3>
            <p style={{ marginTop: -8, color: 'var(--muted)' }}>Đại lý, trường học, đặt số lượng lớn hay chỉ muốn góp ý – chúng tôi luôn lắng nghe!</p>
            <div className="form-grid">
              <div className="field"><label>Họ và tên *</label><input className="input" name="name" required /></div>
              <div className="field"><label>Số điện thoại *</label><input className="input" name="phone" required /></div>
              <div className="field full"><label>Email</label><input className="input" name="email" type="email" /></div>
              <div className="field full"><label>Chủ đề</label>
                <select className="input" name="topic"><option>Tư vấn sản phẩm</option><option>Đăng ký đại lý</option><option>Đơn hàng trường học</option><option>Góp ý</option></select>
              </div>
              <div className="field full"><label>Nội dung *</label><textarea className="input" name="msg" rows="5" required /></div>
            </div>
            <button className="btn" style={{ marginTop: 16 }}>Gửi liên hệ</button>
          </form>
        </div>
      </section>
      <CommitStrip />
    </>
  );
}

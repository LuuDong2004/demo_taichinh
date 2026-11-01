import { CommitStrip, PageHero } from '../components/Blocks';
import { Arrow, Facebook, Mail, Phone } from '../components/Icons';
import { BRAND, img } from '../data';
import { useShop } from '../lib/ShopContext';

// Thông tin liên hệ theo fanpage Moni Yo
const INFO = [
  [<Facebook size={22} />, 'Fanpage', <a href={BRAND.fanpage} target="_blank" rel="noopener noreferrer">Moni Yo trên Facebook</a>],
  [<Mail size={22} />, 'Email', <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>],
  ...BRAND.contacts.map(([role, name, phone]) => [<Phone size={22} />, role, <>{name} – <a href={`tel:${phone.replace(/ /g, '')}`}>{phone}</a></>]),
];

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
            {/* Chưa có địa chỉ cửa hàng → thay bản đồ bằng lời mời theo dõi fanpage */}
            <a className="fb-card" href={BRAND.fanpage} target="_blank" rel="noopener noreferrer">
              <img src={img('brand/kids-peek')} alt="" />
              <span><b>Theo dõi fanpage Moni Yo</b>Cập nhật bộ trò chơi và những bài học tài chính thú vị cho bé</span>
              <Arrow />
            </a>
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

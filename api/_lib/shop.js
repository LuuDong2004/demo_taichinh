import { randomBytes, randomInt } from 'node:crypto';
import { COUPON, DEFAULT_PRODUCTS, isSoon } from '../../src/data.js';

// Giá luôn tính lại ở máy chủ theo danh mục sản phẩm, không tin giá trình duyệt gửi lên
const CATALOG = new Map(DEFAULT_PRODUCTS.map(p => [p.id, p]));
export const FREE_SHIP_FROM = 500000;
export const SHIP_FEE = 30000;
const MAX_QTY = 20;

const bad = msg => Object.assign(new Error(msg), { status: 400 });

export function priceCart(items, coupon) {
  if (!Array.isArray(items) || !items.length) throw bad('Giỏ hàng trống');
  if (items.length > 20) throw bad('Giỏ hàng có quá nhiều sản phẩm');
  const merged = new Map();
  for (const it of items) {
    const p = CATALOG.get(String(it?.id));
    const qty = Number(it?.qty);
    if (!p) throw bad('Có sản phẩm không còn tồn tại, vui lòng tải lại trang');
    if (isSoon(p)) throw bad(`${p.name} chưa mở bán`);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw bad(`Số lượng ${p.name} không hợp lệ (1–${MAX_QTY})`);
    merged.set(p.id, (merged.get(p.id) || 0) + qty);
  }
  const lines = [...merged].map(([id, qty]) => {
    const p = CATALOG.get(id);
    if (qty > MAX_QTY) throw bad(`Số lượng ${p.name} không hợp lệ (1–${MAX_QTY})`);
    return { product_id: id, name: p.name, price: p.price, qty };
  });
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const code = String(coupon || '').trim().toUpperCase();
  const validCoupon = code === COUPON ? code : null;
  const discount = validCoupon ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= FREE_SHIP_FROM ? 0 : SHIP_FEE;
  return { lines, subtotal, discount, shipping, total: subtotal - discount + shipping, coupon: validCoupon };
}

// Mã đơn "DH" + 8 chữ số – trùng cấu hình "Cấu trúc mã thanh toán" trên SePay (tiền tố DH, 8 chữ số)
export const ORDER_PREFIX = 'DH';
export const newOrderCode = () => ORDER_PREFIX + String(randomInt(0, 1e8)).padStart(8, '0');
export const newAccessKey = () => randomBytes(12).toString('hex');
// Tìm mã đơn trong trường code hoặc nội dung chuyển khoản (ngân hàng có thể xóa dấu cách, đổi chữ thường)
export const findOrderCode = (...texts) => {
  for (const t of texts) {
    const m = String(t || '').toUpperCase().match(/DH\d{8}/);
    if (m) return m[0];
  }
  return null;
};

// Tài khoản nhận tiền (cấu hình trên Vercel). Ảnh QR theo tài liệu SePay: https://docs.sepay.vn/tao-qr-code-vietqr-dong.html
export function bankInfo() {
  const bank = process.env.SEPAY_BANK;
  const acc = process.env.SEPAY_ACCOUNT_NUMBER;
  if (!bank || !acc) return null;
  return { bank, account: acc, holder: process.env.SEPAY_ACCOUNT_NAME || '' };
}

export function qrUrl(info, amount, content) {
  const q = new URLSearchParams({ acc: info.account, bank: info.bank, amount: String(amount), des: content, template: 'compact' });
  return `https://vietqr.app/img?${q}`;
}

const clean = (v, max) => String(v ?? '').trim().slice(0, max);

export function readCustomer(c = {}) {
  const out = {
    name: clean(c.name, 80), phone: clean(c.phone, 20).replace(/\s+/g, ''), email: clean(c.email, 120),
    city: clean(c.city, 60), district: clean(c.district, 80), address: clean(c.address, 200), note: clean(c.note, 500),
  };
  if (!out.name) throw bad('Vui lòng nhập họ tên');
  if (!/^(\+?84|0)\d{8,10}$/.test(out.phone)) throw bad('Số điện thoại không hợp lệ');
  if (out.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(out.email)) throw bad('Email không hợp lệ');
  if (!out.city || !out.district || !out.address) throw bad('Vui lòng nhập đủ địa chỉ giao hàng');
  return out;
}

// Dữ liệu đơn trả về cho khách (không lộ khóa truy cập)
export function publicOrder(o, items = []) {
  return {
    code: o.code, name: o.name, phone: o.phone, payMethod: o.pay_method,
    subtotal: o.subtotal, discount: o.discount, shipping: o.shipping, total: o.total,
    status: o.status, paymentStatus: o.payment_status, paidAmount: o.paid_amount, paidAt: o.paid_at, createdAt: o.created_at,
    items: items.map(i => ({ id: i.product_id, name: i.name, price: i.price, qty: i.qty })),
  };
}

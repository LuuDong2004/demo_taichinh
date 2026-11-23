// Gọi API trong thư mục api/ (Vercel khi chạy thật, Vite khi chạy trên máy)
const ADMIN_KEY = 'moniyo_admin';

export const adminPass = {
  get: () => { try { return sessionStorage.getItem(ADMIN_KEY) || ''; } catch { return ''; } },
  set: v => { try { v ? sessionStorage.setItem(ADMIN_KEY, v) : sessionStorage.removeItem(ADMIN_KEY); } catch { /* bỏ qua */ } },
};

export async function api(path, { method = 'GET', body, admin } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (admin) headers.Authorization = `Bearer ${adminPass.get()}`;
  let res;
  try {
    res = await fetch(`/api${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
  } catch {
    throw Object.assign(new Error('Không kết nối được máy chủ, kiểm tra mạng rồi thử lại'), { status: 0 });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || `Lỗi ${res.status}`), { status: res.status });
  return data;
}

// Nhãn tiếng Việt cho trạng thái lưu trong cơ sở dữ liệu
export const ORDER_STATUS = {
  pending: ['Chờ xác nhận', 'st-wait'],
  confirmed: ['Đã xác nhận', 'st-ship'],
  shipping: ['Đang giao', 'st-ship'],
  done: ['Hoàn thành', 'st-ok'],
  cancelled: ['Đã hủy', 'st-cancel'],
};
export const PAY_STATUS = {
  unpaid: ['Chưa thanh toán', 'st-wait'],
  partial: ['Thiếu tiền', 'st-cancel'],
  paid: ['Đã thanh toán', 'st-ok'],
};
export const PAY_METHOD = { cod: 'Khi nhận hàng', bank: 'Chuyển khoản' };

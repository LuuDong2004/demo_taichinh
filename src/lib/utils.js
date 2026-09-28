export const money = n => n.toLocaleString('vi-VN') + 'đ';
export const fmtDate = d => new Date(d).toLocaleDateString('vi-VN');
export const noAccent = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
export const stars = n => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));

// localStorage có thể bị chặn (chế độ ẩn danh…) nên luôn bọc try/catch
export const storage = {
  get(k, fallback) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* chạy tạm trong phiên */ } },
};

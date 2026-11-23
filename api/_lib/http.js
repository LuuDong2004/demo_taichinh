import { timingSafeEqual } from 'node:crypto';

export function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

export const fail = (res, status, message) => send(res, status, { error: message });

// Vercel đã parse JSON sẵn vào req.body; khi chạy trên máy (Vite) thì tự đọc luồng dữ liệu
export async function readJson(req) {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') return req.body ? JSON.parse(req.body) : {};
    if (Buffer.isBuffer(req.body)) return JSON.parse(req.body.toString('utf8') || '{}');
    return req.body ?? {};
  }
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 100_000) throw Object.assign(new Error('Dữ liệu quá lớn'), { status: 413 });
    chunks.push(c);
  }
  const text = Buffer.concat(chunks).toString('utf8');
  return text ? JSON.parse(text) : {};
}

// Lấy tham số trên URL (?code=…) – Vercel có sẵn req.query, khi chạy trên máy thì tự tách
export function getQuery(req) {
  if (req.query) return req.query;
  return Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
}

export function safeEqual(a, b) {
  const x = Buffer.from(String(a ?? ''));
  const y = Buffer.from(String(b ?? ''));
  return x.length === y.length && timingSafeEqual(x, y);
}

// Trang quản trị gửi mật khẩu dạng "Authorization: Bearer <ADMIN_PASSWORD>"
export function isAdmin(req) {
  const pass = process.env.ADMIN_PASSWORD;
  if (!pass) return false;
  const h = req.headers.authorization || '';
  return h.startsWith('Bearer ') && safeEqual(h.slice(7), pass);
}

// Bọc handler: bắt lỗi chung, chỉ cho phép các method đã khai báo
export function handler(methods) {
  return async (req, res) => {
    const fn = methods[req.method];
    if (!fn) {
      res.setHeader('Allow', Object.keys(methods).join(', '));
      return fail(res, 405, 'Method không được hỗ trợ');
    }
    try {
      await fn(req, res);
    } catch (e) {
      if (e instanceof SyntaxError) return fail(res, 400, 'Dữ liệu gửi lên không phải JSON hợp lệ');
      if (!e.status || e.status >= 500) console.error('[api]', req.method, req.url, e);
      fail(res, e.status || 500, e.status ? e.message : 'Lỗi máy chủ, vui lòng thử lại');
    }
  };
}

// Giới hạn số lần gọi theo IP trong một khoảng thời gian (chặn cơ bản, mỗi phiên chạy giữ riêng bộ đếm)
const buckets = new Map();
export function tooManyRequests(req, name, max, windowMs) {
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const key = `${name}:${ip}`;
  const now = Date.now();
  const recent = (buckets.get(key) || []).filter(t => now - t < windowMs);
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 10_000) buckets.clear();
  return recent.length > max;
}

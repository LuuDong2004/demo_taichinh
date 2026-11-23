// Kết nối Postgres.
// - Chạy thật (Vercel): DATABASE_URL trỏ tới Neon Postgres, dùng driver HTTP @neondatabase/serverless.
// - Chạy trên máy khi chưa có DATABASE_URL: dùng PGlite (Postgres chạy trong tiến trình Node, lưu ở .data/pglite)
//   để thử toàn bộ luồng đặt hàng / thanh toán mà không cần tài khoản Neon.
// Thư mục _lib bắt đầu bằng "_" nên Vercel không biến các file này thành API.

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS orders (
    id            BIGSERIAL PRIMARY KEY,
    code          TEXT NOT NULL UNIQUE,              -- mã đơn, cũng là nội dung chuyển khoản (VD: DH12345678)
    access_key    TEXT NOT NULL,                     -- khóa bí mật để khách xem lại đơn của mình
    name          TEXT NOT NULL,
    phone         TEXT NOT NULL,
    email         TEXT,
    city          TEXT NOT NULL,
    district      TEXT NOT NULL,
    address       TEXT NOT NULL,
    note          TEXT,
    pay_method    TEXT NOT NULL CHECK (pay_method IN ('cod', 'bank')),
    subtotal      INTEGER NOT NULL,
    discount      INTEGER NOT NULL DEFAULT 0,
    shipping      INTEGER NOT NULL DEFAULT 0,
    total         INTEGER NOT NULL,
    coupon        TEXT,
    status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'confirmed', 'shipping', 'done', 'cancelled')),
    payment_status TEXT NOT NULL DEFAULT 'unpaid'
                  CHECK (payment_status IN ('unpaid', 'partial', 'paid')),
    paid_amount   INTEGER NOT NULL DEFAULT 0,
    paid_at       TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS orders_created_idx ON orders (created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS order_items (
    id         BIGSERIAL PRIMARY KEY,
    order_id   BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT NOT NULL,
    name       TEXT NOT NULL,
    price      INTEGER NOT NULL,
    qty        INTEGER NOT NULL CHECK (qty > 0)
  )`,
  `CREATE INDEX IF NOT EXISTS order_items_order_idx ON order_items (order_id)`,
  // Giao dịch SePay gửi về. sepay_id UNIQUE để SePay gửi lại (retry) không bị cộng tiền hai lần.
  `CREATE TABLE IF NOT EXISTS payments (
    id               BIGSERIAL PRIMARY KEY,
    sepay_id         BIGINT NOT NULL UNIQUE,
    order_code       TEXT,                           -- NULL nếu không khớp được đơn nào
    gateway          TEXT,
    account_number   TEXT,
    transfer_type    TEXT NOT NULL,
    amount           INTEGER NOT NULL,
    content          TEXT,
    reference_code   TEXT,
    transaction_date TEXT,
    raw              JSONB NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE INDEX IF NOT EXISTS payments_order_idx ON payments (order_code)`,
  // 'expired' = tự hủy vì quá hạn chuyển khoản; NULL = không hủy hoặc quản trị viên hủy
  `ALTER TABLE orders ADD COLUMN IF NOT EXISTS cancel_reason TEXT`,
];

let client = null;
let ready = null;

const dbError = message => Object.assign(new Error(message), { status: 503 });

async function connect() {
  // Tích hợp Neon trên Vercel thường tạo DATABASE_URL; một số cách nối khác chỉ tạo POSTGRES_URL
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (url) {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon(url);
    return { query: (text, params = []) => sql.query(text, params) };
  }
  if (process.env.VERCEL) throw dbError('Chưa kết nối database: thêm Neon Postgres (biến DATABASE_URL) trên Vercel rồi Redeploy');
  // Chỉ dùng khi chạy trên máy. Tên gói để trong biến để Vercel không đóng gói PGlite vào hàm API.
  const pkg = '@electric-sql/pglite';
  const { PGlite } = await import(/* @vite-ignore */ pkg);
  const dir = process.env.PGLITE_DIR || '.data/pglite';
  (await import('node:fs')).mkdirSync(dir, { recursive: true });
  const db = new PGlite(dir);
  return { query: async (text, params = []) => (await db.query(text, params)).rows };
}

// Chạy câu SQL có tham số ($1, $2…), trả về mảng dòng
export async function query(text, params) {
  if (!ready) {
    ready = (async () => {
      client = await connect();
      for (const stmt of SCHEMA) await client.query(stmt);
    })().catch(e => {
      ready = null;
      // Lỗi cấu hình / không kết nối được → báo rõ cho trang quản trị (503) thay vì "Lỗi máy chủ" chung chung
      console.error('[db]', e);
      throw e.status ? e : dbError('Không kết nối được database, kiểm tra lại DATABASE_URL trên Vercel');
    });
  }
  await ready;
  return client.query(text, params);
}

export { SCHEMA };

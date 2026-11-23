import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Chạy thư mục api/ ngay trong `npm run dev`, giống cách Vercel chạy (mỗi file là một API, [ten].js là tham số).
// Trên Vercel không dùng plugin này.
function localApi() {
  const root = path.resolve('api');
  // /api/orders/DH123 → api/orders/[code].js với { code: 'DH123' }
  const resolve = urlPath => {
    const parts = urlPath.replace(/^\/api\/?/, '').split('/').filter(Boolean);
    const walk = (dir, i, params) => {
      if (i === parts.length) {
        const f = `${dir}.js`;
        return fs.existsSync(f) ? { file: f, params } : null;
      }
      const seg = decodeURIComponent(parts[i]);
      if (seg.startsWith('_') || seg.includes('..')) return null;
      const exact = walk(path.join(dir, seg), i + 1, params);
      if (exact) return exact;
      if (!fs.existsSync(dir)) return null;
      for (const name of fs.readdirSync(dir)) {
        const m = name.match(/^\[(\w+)\](\.js)?$/);
        if (!m) continue;
        const next = path.join(dir, name.replace(/\.js$/, ''));
        const hit = walk(next, i + 1, { ...params, [m[1]]: seg });
        if (hit) return hit;
      }
      return null;
    };
    return walk(root, 0, {});
  };
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api/')) return next();
        const url = new URL(req.url, 'http://localhost');
        const hit = resolve(url.pathname);
        if (!hit) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify({ error: 'Không có API này' }));
        }
        req.query = { ...Object.fromEntries(url.searchParams), ...hit.params };
        try {
          const mod = await server.ssrLoadModule(hit.file);
          await mod.default(req, res);
        } catch (e) {
          console.error(e);
          if (!res.headersSent) { res.statusCode = 500; res.end(JSON.stringify({ error: 'Lỗi máy chủ' })); }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Đưa biến trong .env.local (DATABASE_URL, SEPAY_*, ADMIN_PASSWORD…) vào process.env cho API chạy trên máy
  Object.assign(process.env, { ...loadEnv(mode, process.cwd(), ''), ...process.env });
  return {
    plugins: [react(), localApi()],
    server: { port: 8386, strictPort: true, open: true, watch: { ignored: ['**/.data/**'] } },
  };
});

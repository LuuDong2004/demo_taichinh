// Xuất ảnh cho web từ bộ ảnh gốc (docs/MONI YO – không commit) sang public/img (WebP).
// Chạy: node scripts/build-images.mjs   (cần devDependency "sharp")
// Ảnh minh hoạ lớn dùng WebP lossy q≈85 sau khi thu nhỏ về kích thước hiển thị 2x;
// logo, icon, tiền giấy dùng WebP lossless để giữ nét viền và chữ.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SRC = 'docs/MONI YO';
const OUT = 'public/img';
const E = `${SRC}/elements`;

export const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
  .toLowerCase().replace(/\.[a-z]+$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const open = f => sharp(f, { limitInputPixels: false });
let total = 0;

async function out(src, dest, { width, lossless = false, quality = 85 } = {}) {
  const file = path.join(OUT, dest);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  let img = open(src);
  if (width) img = img.resize({ width, withoutEnlargement: true });
  await img.webp(lossless ? { lossless: true, effort: 6 } : { quality, alphaQuality: 90, effort: 6, smartSubsample: true }).toFile(file);
  const kb = fs.statSync(file).size / 1024;
  total += kb;
  console.log(`${kb.toFixed(0).padStart(5)} KB  ${dest}`);
}

// Tách các icon nằm cạnh nhau theo hàng ngang trên nền trong suốt (chiếu kênh alpha theo cột)
async function splitRow(src, names, dir, { top = 0, height } = {}) {
  const meta = await open(src).metadata();
  const h = height ?? meta.height - top;
  const { data, info } = await open(src).extract({ left: 0, top, width: meta.width, height: h }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const filled = x => { for (let y = 0; y < info.height; y++) if (data[(y * info.width + x) * 4 + 3] > 24) return true; return false; };
  const segs = [];
  let start = -1;
  for (let x = 0; x <= info.width; x++) {
    const on = x < info.width && filled(x);
    if (on && start < 0) start = x;
    if (!on && start >= 0) { if (x - start > 20) segs.push([start, x]); start = -1; }
  }
  if (segs.length !== names.length) throw new Error(`${src}: tìm thấy ${segs.length} icon, cần ${names.length}`);
  for (const [i, [l, r]] of segs.entries()) {
    const file = path.join(OUT, dir, `${names[i]}.webp`);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const buf = await open(src).extract({ left: l, top, width: r - l, height: h }).toBuffer();
    await sharp(buf).trim().resize({ width: 220, height: 220, fit: 'inside', withoutEnlargement: true }).webp({ lossless: true }).toFile(file);
    total += fs.statSync(file).size / 1024;
    console.log(`  icon  ${dir}/${names[i]}.webp`);
  }
}

// ---------- Thương hiệu ----------
await out(`${E}/logo/logo.png`, 'brand/logo.webp', { lossless: true });
await out(`${E}/mascot/1.png`, 'brand/kids-peek.webp', { width: 1200 });
await out(`${E}/mascot/p.png`, 'brand/kids-jump.webp', { width: 1000 });
await out(`${E}/mascot/q.png`, 'brand/kids-sit.webp', { width: 1400 });
await out(`${E}/mascot/3.png`, 'brand/kids-steps.webp', { width: 1000 });
await out(`${SRC}/Logo, avatar, cover/Cover (4).png`, 'brand/cover.webp', { width: 2000, quality: 82 });

// ---------- Sản phẩm & thành phần ----------
await out(`${SRC}/Bàn chơi, tiền, hộp/box 1.png`, 'product/box.webp', { width: 1600 });
await out(`${SRC}/Bàn chơi, tiền, hộp/mặt đáy.png`, 'product/box-back.webp', { width: 1600 });
await out(`${SRC}/Bàn chơi, tiền, hộp/visual board.png`, 'product/board.webp', { width: 1400 });
await out(`${E}/Tien va cards/Tiền.png`, 'product/money.webp', { lossless: true });
await out(`${E}/Tien va cards/card asset.png`, 'product/card-stacks.webp', { width: 1000 });
await out(`${E}/Tien va cards/e6cbf640-ecac-4c28-8dcc-cb37fcc7754a.png`, 'product/kit.webp', { width: 1000 });
await out(`${E}/8 nghề/cờ.png`, 'product/pawns.webp', { width: 1000 });

// ---------- 8 nghề: nhân vật, dải 4 đồ vật, nền thẻ ----------
const JOBS = [
  ['bac-si', 'bs', 'Bác sĩ', 10], ['ca-si', 'cs', 'Ca sĩ', 12], ['canh-sat-giao-thong', 'csgt', 'Cảnh sát giao thông', 6],
  ['dau-bep', 'db', 'Đầu bếp', 7], ['giao-vien', 'gv', 'Giáo viên', 8], ['ky-su', 'ks', 'Kỹ sư', 2],
  ['linh-cuu-hoa', 'lch', 'Lính cứu hỏa', 1], ['phi-cong', 'pc', 'Phi công', 5],
];
for (const [id, file, name, bg] of JOBS) {
  await out(`${E}/8 nghề/${file}.png`, `jobs/${id}.webp`, { width: 600 });
  await out(`${E}/Token/${name}.png`, `jobs/${id}-items.webp`, { width: 900 });
  await out(`${E}/Nền thẻ/${bg}.png`, `jobs/${id}-bg.webp`, { width: 500, quality: 80 });
}

// ---------- Thẻ: đồ vật (token), cộng tiền, trừ tiền, túi mù ----------
for (const [dir, dest] of [['Token nghề nghiệp', 'items'], ['Thẻ cộng tiền', 'cards/cong'], ['Thẻ trừ tiền', 'cards/tru'], ['Thẻ túi mù', 'cards/tui-mu']]) {
  for (const f of fs.readdirSync(`${SRC}/${dir}`).filter(f => f.endsWith('.png'))) {
    await out(`${SRC}/${dir}/${f}`, `${dest}/${slug(f)}.webp`, { width: dest === 'items' ? 320 : 400, quality: 82 });
  }
}

// ---------- Icon các ô trên bàn cờ ----------
await splitRow(`${E}/Icon/Icon set.png`, ['cong-tien', 'tru-tien', 'tui-mu', 'mua-sam', 'start'], 'tiles', { top: 420 });
await splitRow(`${E}/Icon/18c84b76-f65d-40b2-91fc-bcaa6b92a9a1.png`, ['dong-bang', 've-start', 'them-luot'], 'tiles');

// ---------- Sách hướng dẫn ----------
const GUIDE = ['Bìa trước', 'Trang 2-3', 'Trang 4-5', 'Trang 6-7', 'Trang 8-9', 'Trang 10-11', 'Trang 12-13', 'Trang 14-15', 'Bìa sau'];
for (const [i, f] of GUIDE.entries()) {
  const single = f.startsWith('Bìa');
  await out(`${SRC}/Sách hướng dẫn/${f}.png`, `guide/${String(i + 1).padStart(2, '0')}.webp`, { width: single ? 1000 : 1800, quality: 82 });
}

console.log(`\nTổng: ${(total / 1024).toFixed(1)} MB`);

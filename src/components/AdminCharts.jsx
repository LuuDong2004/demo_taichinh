import { useState } from 'react';
import { money } from '../lib/utils';

// Biểu đồ trang quản trị: SVG thuần, một màu (xanh thương hiệu #2E8F1F, đã kiểm tra tương phản ≥ 3:1 trên nền trắng)
const W = 1000;
const H = 280;
const PAD = { t: 14, r: 8, b: 26, l: 46 };
const short = n => (n >= 1e6 ? `${+(n / 1e6).toFixed(1)}tr` : n >= 1e3 ? `${Math.round(n / 1e3)}k` : String(n));
const dayLabel = d => `${+d.slice(8)}/${+d.slice(5, 7)}`;

// Trục y "tròn": 1, 2, 2.5, 5 × 10^n
function niceMax(v) {
  if (v <= 0) return 1000000;
  const p = 10 ** Math.floor(Math.log10(v));
  return [1, 2, 2.5, 5, 10].map(m => m * p).find(m => m >= v);
}

// Cột theo ngày: giá trị đơn (không tính đơn hủy). Rê chuột/chạm vào cột để xem chi tiết.
export function DailyChart({ daily }) {
  const [hover, setHover] = useState(null);
  const max = niceMax(Math.max(...daily.map(d => d.revenue)));
  const iw = W - PAD.l - PAD.r;
  const ih = H - PAD.t - PAD.b;
  const band = iw / daily.length;
  const bw = Math.min(24, band * 0.62);
  const y = v => PAD.t + ih - (v / max) * ih;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map(f => f * max);
  const every = Math.ceil(daily.length / 7); // nhãn ngày thưa ra cho đỡ chồng chữ
  const h = hover !== null ? daily[hover] : null;

  return (
    <figure className="chart">
      <div className="chart-plot">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Giá trị đơn hàng theo ngày, ${daily.length} ngày gần nhất`} onMouseLeave={() => setHover(null)}>
          {ticks.map(t => (
            <g key={t}>
              <line x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} className={t ? 'grid' : 'base'} />
              <text x={PAD.l - 8} y={y(t) + 4} className="tick" textAnchor="end">{short(t)}</text>
            </g>
          ))}
          {daily.map((d, i) => {
            const cx = PAD.l + band * i + band / 2;
            const top = y(d.revenue);
            const hgt = PAD.t + ih - top;
            const r = Math.min(4, hgt);
            return (
              <g key={d.day}>
                {d.revenue > 0 && (
                  <path className={`bar ${hover === i ? 'on' : ''}`}
                    d={`M${cx - bw / 2},${PAD.t + ih} V${top + r} Q${cx - bw / 2},${top} ${cx - bw / 2 + r},${top} H${cx + bw / 2 - r} Q${cx + bw / 2},${top} ${cx + bw / 2},${top + r} V${PAD.t + ih} Z`} />
                )}
                {(i % every === (daily.length - 1) % every) && <text x={cx} y={H - 8} className="tick" textAnchor="middle">{dayLabel(d.day)}</text>}
                {/* Vùng bắt chuột rộng cả cột ngày, lớn hơn thân cột */}
                <rect x={PAD.l + band * i} y={PAD.t} width={band} height={ih} fill="transparent"
                  onMouseEnter={() => setHover(i)} onClick={() => setHover(i)} tabIndex={0} onFocus={() => setHover(i)}
                  aria-label={`${dayLabel(d.day)}: ${money(d.revenue)}, ${d.orders} đơn`} />
              </g>
            );
          })}
        </svg>
        {h && (
          <div className="chart-tip" style={(() => {
            // Gần mép phải/trái thì neo khung chú thích vào phía trong để không bị cắt
            const f = (PAD.l + band * hover + band / 2) / W;
            return { left: `${f * 100}%`, transform: `translateX(${f > 0.8 ? '-100%' : f < 0.2 ? '0' : '-50%'})` };
          })()}>
            <b>{dayLabel(h.day)}</b>
            <span>Giá trị đơn: <b>{money(h.revenue)}</b></span>
            <span>Đã thu: {money(h.collected)}</span>
            <span>{h.orders} đơn</span>
          </div>
        )}
      </div>
      <details className="chart-table">
        <summary>Xem dạng bảng</summary>
        <table>
          <thead><tr><th>Ngày</th><th>Số đơn</th><th>Giá trị đơn</th><th>Đã thu</th></tr></thead>
          <tbody>{daily.map(d => <tr key={d.day}><td>{dayLabel(d.day)}</td><td>{d.orders}</td><td>{money(d.revenue)}</td><td>{money(d.collected)}</td></tr>)}</tbody>
        </table>
      </details>
    </figure>
  );
}

// Thanh ngang: số đơn theo từng nhóm (trạng thái giao hàng, tình trạng thanh toán). Tên + số luôn hiện bằng chữ.
export function CountBars({ rows, label }) {
  const max = Math.max(1, ...rows.map(r => r.n));
  const total = rows.reduce((s, r) => s + r.n, 0);
  return (
    <ul className="hbars" aria-label={label}>
      {rows.map(r => (
        <li key={r.key}>
          <span className="hb-name">{r.label}</span>
          <span className="hb-track"><i style={{ width: r.n ? `max(4px, ${(r.n / max) * 100}%)` : 0 }} /></span>
          <span className="hb-val">{r.n}<small>{total ? ` · ${Math.round((r.n / total) * 100)}%` : ''}</small></span>
        </li>
      ))}
    </ul>
  );
}

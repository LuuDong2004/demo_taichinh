// Bộ icon nét (stroke 2, bo tròn) dùng chung toàn hệ thống. Mỗi icon nhận prop `size`.
const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };
const icon = (children, def = 20, sw = 2) => ({ size = def }) => (
  <svg className="i" width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth={sw} aria-hidden="true">{children}</svg>
);

/* ----- Thương mại & giao diện ----- */
export const Truck = icon(<><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>, 24);
export const Shield = icon(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>, 24);
export const Card = icon(<><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></>, 24);
export const Chat = icon(<><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></>, 24);
export const Plus = icon(<path d="M12 5v14M5 12h14" />, 20, 3);
export const Arrow = icon(<path d="M5 12h14M13 5l7 7-7 7" />, 16, 2.6);
export const ArrowLeft = icon(<path d="M19 12H5M11 5l-7 7 7 7" />, 16, 2.6);
export const CartIcon = icon(<><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></>, 20, 2.2);
export const Menu = icon(<path d="M3 6h18M3 12h18M3 18h18" />, 20, 2.4);
export const X = icon(<path d="M6 6l12 12M18 6 6 18" />, 16, 2.6);
export const Check = icon(<path d="m5 12.5 4.5 4.5L19 7.5" />, 20, 2.8);
export const Search = icon(<><circle cx="11" cy="11" r="7" /><path d="m20 20-3.6-3.6" /></>, 18, 2.2);
export const Phone = icon(<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />, 24, 2.2);
export const Pin = icon(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></>, 18);
export const Mail = icon(<><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m3 7 9 6 9-6" /></>, 18);
export const Clock = icon(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>, 18);
export const Box = icon(<><path d="M21 8 12 3 3 8v8l9 5 9-5z" /><path d="m3 8 9 5 9-5M12 13v8" /></>);
export const Refresh = icon(<><path d="M20 11a8 8 0 0 0-14.5-4L4 9" /><path d="M4 4v5h5" /><path d="M4 13a8 8 0 0 0 14.5 4L20 15" /><path d="M20 20v-5h-5" /></>);
export const Gift = icon(<><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12" /><path d="M12 8S10.5 3 8 3.5 6.5 8 12 8zM12 8s1.5-5 4-4.5S17.500 8 12 8z" /></>);
export const Cash = icon(<><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><path d="M6 12h.01M18 12h.01" /></>, 22);
export const Bank = icon(<><path d="m3 10 9-6 9 6" /><path d="M5 10v8M9.500 10v8M14.500 10v8M19 10v8M3 20h18" /></>, 22);
export const Mobile = icon(<><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18h2" /></>, 22);

/* ----- Giá trị giáo dục ----- */
export const Briefcase = icon(<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" /></>, 22);
export const Wallet = icon(<><path d="M18 9V5H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V7" /><path d="M16.500 14.500h.01" /></>, 22);
export const Bulb = icon(<><path d="M12 3a6 6 0 0 0-4 10.500c.7.700 1 1.500 1 2.500h6c0-1 .3-1.800 1-2.500A6 6 0 0 0 12 3z" /><path d="M9 19h6M10.500 22h3" /></>, 22);
export const Users = icon(<><circle cx="9" cy="8" r="3.5" /><path d="M2.500 20a6.500 6.500 0 0 1 13 0M16 4.600a3.500 3.500 0 0 1 0 6.800M18.500 14.200a6.500 6.500 0 0 1 3 5.800" /></>, 22);
export const Heart = icon(<path d="M12 20.500s-8-4.900-8-10.700A4.600 4.600 0 0 1 12 7a4.600 4.600 0 0 1 8 2.800c0 5.800-8 10.700-8 10.700z" />, 22);
export const Calculator = icon(<><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M8.500 6.500h7M8.500 11h.01M12 11h.01M15.500 11h.01M8.500 14.500h.01M12 14.500h.01M15.500 14.500h.01M8.500 18h.01M12 18h.01M15.500 18h.01" /></>, 22);
export const Target = icon(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>);
export const Jar = icon(<><path d="M8 3h8v3H8z" /><path d="M7 6h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8a2 2 0 0 1 2-2zM9 13h6" /></>);
export const Smile = icon(<><circle cx="12" cy="12" r="9" /><path d="M8.500 14.500a4 4 0 0 0 7 0M9 9.500h.01M15 9.500h.01" /></>);

/* ----- Quản trị ----- */
export const Chart = icon(<path d="M5 20v-8M11 20V5M17 20v-5M3 20h18" />, 18, 2.2);
export const Receipt = icon(<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6" /></>, 18);
export const Edit = icon(<><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.500 6.500 4 4" /></>, 16);
export const Trash = icon(<><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" /></>, 16);
export const LogOut = icon(<path d="M10 4H5v16h5M15 8l4 4-4 4M19 12H9" />, 18);

/* ----- Mạng xã hội ----- */
export const Facebook = ({ size = 18 }) => <svg className="i" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.500 22v-8h2.700l.4-3.200h-3.100V8.800c0-.9.3-1.600 1.600-1.600h1.700V4.300c-.3 0-1.300-.1-2.400-.1-2.400 0-4.100 1.500-4.100 4.200v2.400H7.600V14h2.700v8z" /></svg>;
export const Instagram = icon(<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.500 6.500h.01" /></>, 18);
export const YouTube = icon(<><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3z" fill="currentColor" /></>, 18);
export const TikTok = icon(<><path d="M14 3v11.500a3.500 3.500 0 1 1-3.500-3.500" /><path d="M14 3c.3 2.700 2 4.400 4.500 4.700" /></>, 18, 2.2);

/* ----- Sao đánh giá ----- */
export const Star = ({ size = 14, off }) => (
  <svg className="i" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" opacity={off ? .25 : 1} aria-hidden="true">
    <path d="m12 2.500 2.900 6 6.600.9-4.800 4.600 1.200 6.500L12 17.400l-5.900 3.100 1.200-6.500L2.500 9.400l6.600-.9z" />
  </svg>
);
export const Stars = ({ n = 5, size = 14 }) => (
  <span className="stars" role="img" aria-label={`${Math.round(n)} trên 5 sao`}>
    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={size} off={i > Math.round(n)} />)}
  </span>
);

// Linh vật Heo Vàng – dùng cho nút trợ lý, avatar trong popup và các trạng thái trống
export function Pig({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <g stroke="#6B3E00" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M9 19 7 7l11 5z" fill="#F5B800" />
        <path d="m39 19 2-12-11 5z" fill="#F5B800" />
        <circle cx="24" cy="26" r="17" fill="#FFD23F" />
        <ellipse cx="24" cy="31" rx="8.5" ry="6.2" fill="#FFB020" />
      </g>
      <circle cx="12.5" cy="29" r="2.6" fill="#FF8A3D" opacity=".45" />
      <circle cx="35.5" cy="29" r="2.6" fill="#FF8A3D" opacity=".45" />
      <g fill="#6B3E00">
        <circle cx="16.5" cy="21.5" r="2.2" /><circle cx="31.5" cy="21.5" r="2.2" />
        <ellipse cx="21" cy="31" rx="1.5" ry="2.2" /><ellipse cx="27" cy="31" rx="1.5" ry="2.2" />
      </g>
      <circle cx="17.2" cy="20.8" r=".7" fill="#fff" /><circle cx="32.2" cy="20.8" r=".7" fill="#fff" />
    </svg>
  );
}

export function Cloud({ className = '', style }) {
  return (
    <svg className={`deco deco-cloud ${className}`} style={style} viewBox="0 0 200 100" aria-hidden="true">
      <path d="M20 80c-12 0-18-14-8-22 4-3 10-3 14 0 0-16 14-26 28-20 6-18 30-22 42-8 10-12 32-8 36 8 14-4 28 6 26 20 12 0 18 16 6 22z" fill={style?.fill || '#FFE27A'} fillOpacity=".9" />
      <path d="M40 62c10-12 26-4 20 6M96 50c14-14 34 0 24 12M140 64c8-8 22-2 16 8" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

export function Coin({ style }) {
  return (
    <svg className="deco float" style={{ width: 56, opacity: 1, ...style }} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="34" r="28" fill="#D99A00" />
      <circle cx="32" cy="30" r="28" fill="#FFD23F" stroke="#6B3E00" strokeWidth="3" />
      <circle cx="32" cy="30" r="20" fill="none" stroke="#F5B800" strokeWidth="4" />
      <text x="32" y="40" textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="26" fill="#6B3E00">₫</text>
    </svg>
  );
}

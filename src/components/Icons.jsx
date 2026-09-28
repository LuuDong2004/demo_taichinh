const base = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Truck = () => <svg width="24" height="24" viewBox="0 0 24 24" {...base} strokeWidth="2"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>;
export const Shield = () => <svg width="24" height="24" viewBox="0 0 24 24" {...base} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>;
export const Card = () => <svg width="24" height="24" viewBox="0 0 24 24" {...base} strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" /><path d="M1 10h22" /></svg>;
export const Chat = ({ size = 24 }) => <svg width={size} height={size} viewBox="0 0 24 24" {...base} strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M8 10h.01M12 10h.01M16 10h.01" /></svg>;
export const Plus = () => <svg width="20" height="20" viewBox="0 0 24 24" {...base} strokeWidth="3"><path d="M12 5v14M5 12h14" /></svg>;
export const Arrow = () => <svg width="16" height="16" viewBox="0 0 24 24" {...base} strokeWidth="2.6"><path d="M5 12h14M13 5l7 7-7 7" /></svg>;
export const CartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" {...base} strokeWidth="2.2"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>;
export const Menu = () => <svg width="20" height="20" viewBox="0 0 24 24" {...base} strokeWidth="2.4"><path d="M3 6h18M3 12h18M3 18h18" /></svg>;
export const Phone = () => <svg width="24" height="24" viewBox="0 0 24 24" {...base} strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>;

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

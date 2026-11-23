import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_PRODUCTS, PRODUCT_ALIAS, isSoon } from '../data';
import { adminPass } from './api';
import { storage } from './utils';

const ShopContext = createContext(null);
export const useShop = () => useContext(ShopContext);

// State được đồng bộ vào localStorage
function usePersisted(key, initial) {
  const [value, setValue] = useState(() => storage.get(key, initial));
  useEffect(() => { storage.set(key, value); }, [key, value]);
  return [value, setValue];
}

export function ShopProvider({ children }) {
  const [products, setProducts] = usePersisted('my_products_v11', DEFAULT_PRODUCTS);
  const [cart, setCart] = usePersisted('my_cart_v2', []);
  const [messages, setMessages] = usePersisted('my_msgs', []);
  // Đã đăng nhập quản trị trong phiên này (mật khẩu lưu sessionStorage, máy chủ kiểm tra ở mỗi lần gọi API)
  const [isAdmin, setIsAdmin] = useState(() => !!adminPass.get());
  const [toastMsg, setToastMsg] = useState({ text: '', show: false });
  const toastTimer = useRef();

  const toast = useCallback(text => {
    setToastMsg({ text, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(t => ({ ...t, show: false })), 2200);
  }, []);

  const findProduct = useCallback(id => products.find(p => p.id === (PRODUCT_ALIAS[id] || id)), [products]);

  const addToCart = useCallback((id, qty = 1, silent = false) => {
    const p = products.find(x => x.id === id);
    if (!p || isSoon(p)) { toast('Sản phẩm sắp ra mắt, chưa thể đặt mua'); return false; }
    setCart(c => c.some(l => l.id === id) ? c.map(l => l.id === id ? { ...l, qty: l.qty + qty } : l) : [...c, { id, qty }]);
    if (!silent) toast('Đã thêm vào giỏ hàng 🛒');
    return true;
  }, [products, setCart, toast]);

  const changeQty = (id, delta) => setCart(c => c.map(l => l.id === id ? { ...l, qty: l.qty + delta } : l).filter(l => l.qty > 0));
  const removeFromCart = id => setCart(c => c.filter(l => l.id !== id));

  const totals = useMemo(() => {
    const lines = cart.map(l => ({ ...l, p: products.find(p => p.id === l.id) })).filter(l => l.p && !isSoon(l.p));
    const sub = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
    const ship = sub === 0 || sub >= 500000 ? 0 : 30000;
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return { lines, sub, ship, count, total: sub + ship };
  }, [cart, products]);

  // Đơn đã tạo trên máy chủ → làm trống giỏ
  const clearCart = useCallback(() => setCart([]), [setCart]);

  const value = {
    products, setProducts, findProduct,
    cart, addToCart, changeQty, removeFromCart, totals,
    clearCart,
    messages, setMessages,
    isAdmin, setIsAdmin,
    toast, toastMsg,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { COUPON, DEFAULT_PRODUCTS, DEMO_ORDERS, isSoon } from '../data';
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
  const [products, setProducts] = usePersisted('my_products_v4', DEFAULT_PRODUCTS);
  const [cart, setCart] = usePersisted('my_cart_v2', []);
  const [orders, setOrders] = usePersisted('my_orders', DEMO_ORDERS);
  const [messages, setMessages] = usePersisted('my_msgs', []);
  const [coupon, setCoupon] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [toastMsg, setToastMsg] = useState({ text: '', show: false });
  const toastTimer = useRef();

  const toast = useCallback(text => {
    setToastMsg({ text, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(t => ({ ...t, show: false })), 2200);
  }, []);

  const findProduct = useCallback(id => products.find(p => p.id === id), [products]);

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
    const discount = coupon === COUPON ? Math.round(sub * 0.1) : 0;
    const ship = sub === 0 || sub >= 500000 ? 0 : 30000;
    const count = lines.reduce((s, l) => s + l.qty, 0);
    return { lines, sub, discount, ship, count, total: sub - discount + ship };
  }, [cart, products, coupon]);

  const placeOrder = info => {
    const id = 'DH' + (1025 + orders.length - DEMO_ORDERS.length + Math.floor(Math.random() * 9));
    const order = { id, name: info.name, phone: info.phone, total: totals.total, status: 'Chờ xác nhận', date: new Date().toISOString().slice(0, 10), items: totals.count, pay: info.pay };
    setOrders(o => [order, ...o]);
    setCart([]);
    setCoupon('');
    return order;
  };

  const value = {
    products, setProducts, findProduct,
    cart, addToCart, changeQty, removeFromCart, totals, coupon, setCoupon,
    orders, setOrders, placeOrder,
    messages, setMessages,
    isAdmin, setIsAdmin,
    toast, toastMsg,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import About from './pages/About';
import Admin from './pages/Admin';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import Products from './pages/Products';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="san-pham" element={<Products />} />
        <Route path="san-pham/:id" element={<ProductDetail />} />
        <Route path="gio-hang" element={<Cart />} />
        <Route path="thanh-toan" element={<Checkout />} />
        <Route path="gioi-thieu" element={<About />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="ai" element={<Navigate to="/" replace state={{ ai: true }} />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:id" element={<BlogPost />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

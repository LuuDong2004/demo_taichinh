import { CROPS, IMG } from '../data';

// Cắt một vùng [x, y, w, h] từ ảnh gốc bằng background-position
export default function Crop({ img = 'yellow', area = 'box', style }) {
  const [x, y, w, h] = CROPS[area] || CROPS.box;
  const px = w >= IMG.W ? 0 : (x / (IMG.W - w)) * 100;
  const py = h >= IMG.H ? 0 : (y / (IMG.H - h)) * 100;
  return (
    <div
      className="crop"
      role="img"
      style={{
        backgroundImage: `url('${IMG[img] || IMG.yellow}')`,
        backgroundSize: `${(IMG.W / w) * 100}% auto`,
        backgroundPosition: `${px}% ${py}%`,
        aspectRatio: `${w}/${h}`,
        ...style,
      }}
    />
  );
}

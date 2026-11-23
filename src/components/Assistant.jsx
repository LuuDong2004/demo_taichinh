import { Fragment, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { aiReply } from '../lib/ai';
import { api } from '../lib/api';
import { money } from '../lib/utils';
import { Chat, Jar, KidAvatar, Target, X } from './Icons';

const SUGGESTIONS = ['Bé 7 tuổi nên chơi bộ nào?', 'Bộ 2 có gì khác?', 'Nên cho con bao nhiêu tiền tiêu vặt?', 'Luật chơi?', 'Dạy con tiết kiệm thế nào?', 'Phí giao hàng?'];
const JARS = [['Tiêu', .5, 'var(--orange)'], ['Tiết kiệm', .4, 'var(--green)'], ['Chia sẻ', .1, 'var(--blue)']];
const TABS = [['chat', Chat, 'Trò chuyện'], ['goal', Target, 'Mục tiêu'], ['jars', Jar, '3 hũ']];
const Typing = () => <span className="typing"><span /><span /><span /></span>;

// Câu trả lời của AI là chữ thường: biến đường dẫn nội bộ (/san-pham/..., /lien-he…) thành link bấm được
const PATH = /(\/(?:san-pham|gio-hang|thanh-toan|gioi-thieu|lien-he|blog|don-hang)(?:\/[a-z0-9-]+)?)/g;
const RichText = ({ text }) => text.split(PATH).map((part, i) =>
  i % 2 ? <Link key={i} to={part}>{part}</Link> : <Fragment key={i}>{part}</Fragment>);

// Lần đầu máy chủ báo chưa bật AI thì dùng câu trả lời có sẵn cho cả phiên, khỏi gọi lại
let aiOff = false;

function ChatPane({ active }) {
  const [msgs, setMsgs] = useState([{ who: 'bot', body: <>Xin chào! Mình là <b>trợ lý Moni Yo</b>: giải đáp về 2 bộ trò chơi, đặt hàng, và cách dạy con về tiền. Bạn cần mình giúp gì?</> }]);
  const history = useRef([]); // [{ role, content }] gửi lên AI, chỉ gồm chữ thuần
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => { bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, active]);
  useEffect(() => { if (active) inputRef.current.focus({ preventScroll: true }); }, [active]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const [asked, setAsked] = useState([]);
  const suggestions = SUGGESTIONS.filter(s => !asked.includes(s)).slice(0, 4);

  const [busy, setBusy] = useState(false);
  const ask = async raw => {
    const text = raw.trim();
    if (!text || busy) return;
    setAsked(a => (SUGGESTIONS.includes(text) ? [...a, text] : a));
    const id = Date.now();
    setMsgs(m => [...m, { who: 'me', body: text }, { who: 'bot', id, body: <Typing /> }]);
    const answer = body => setMsgs(m => m.map(x => (x.id === id ? { ...x, body } : x)));
    history.current.push({ role: 'user', content: text });

    if (!aiOff) {
      setBusy(true);
      try {
        const { reply } = await api('/chat', { method: 'POST', body: { messages: history.current.slice(-12) } });
        history.current.push({ role: 'assistant', content: reply });
        answer(<RichText text={reply} />);
        setBusy(false);
        return;
      } catch (e) {
        setBusy(false);
        if (e.message === 'AI_OFF' || e.status === 404) aiOff = true;
        else if (e.status === 429 || e.status === 503) { answer(e.message); return; }
      }
    }
    // Chưa bật AI hoặc lỗi mạng → câu trả lời có sẵn
    timers.current.push(setTimeout(() => answer(aiReply(text)), 500 + Math.random() * 400));
  };

  return (
    <>
      <div className="chat-body" ref={bodyRef}>
        {msgs.map((m, i) => <div key={i} className={`msg ${m.who}`}>{m.body}</div>)}
      </div>
      {/* Gợi ý xuống dòng (không cuộn ngang để khỏi bị che chữ); câu đã hỏi thì ẩn, tối đa 4 câu */}
      {suggestions.length > 0 && (
        <div className="chat-suggest">
          {suggestions.map(s => <button key={s} onClick={() => ask(s)}>{s}</button>)}
        </div>
      )}
      <form className="chat-form" onSubmit={e => { e.preventDefault(); ask(input); setInput(''); }}>
        <input className="input" ref={inputRef} value={input} onChange={e => setInput(e.target.value)} placeholder="Hỏi về Moni Yo hoặc cách dạy con về tiền..." autoComplete="off" maxLength={1200} />
        <button className="btn btn-sm" disabled={busy}>Gửi</button>
      </form>
    </>
  );
}

// Ô nhập tiền: chỉ nhận chữ số (không âm, không chữ e), tự thêm dấu chấm hàng nghìn, xóa trống được
const MAX_MONEY = 999_999_999;
function MoneyInput({ value, onChange, label }) {
  const text = value ? value.toLocaleString('vi-VN') : '';
  const change = e => {
    const digits = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
    onChange(Math.min(Number(digits || 0), MAX_MONEY));
  };
  return (
    <div className="money-input">
      <input className="input" type="text" inputMode="numeric" autoComplete="off" placeholder="0" aria-label={label} value={text} onChange={change} />
      <span className="money-unit" aria-hidden="true">đ</span>
    </div>
  );
}

function GoalCalculator() {
  const [goal, setGoal] = useState(350000);
  const [weekly, setWeekly] = useState(20000);
  const weeks = Math.ceil((goal || 0) / weekly);
  return (
    <div className="panel tool">
      <h3><Target size={22} />Máy tính mục tiêu tiết kiệm</h3>
      <div className="field"><label>Món đồ bé muốn mua (giá)</label><MoneyInput label="Giá món đồ" value={goal} onChange={setGoal} /></div>
      <div style={{ marginTop: 12 }}>
        <div className="range-row"><span>Tiết kiệm mỗi tuần</span><span>{money(weekly)}</span></div>
        <input type="range" min="5000" max="100000" step="5000" value={weekly} onChange={e => setWeekly(+e.target.value)} />
      </div>
      <div className="result-box">
        {weeks > 0
          ? <>Bé cần tiết kiệm trong<b className="big">{weeks} tuần</b>≈ {Math.ceil(weeks / 4.3)} tháng. {weeks > 20 ? 'Mục tiêu hơi xa – thử chia nhỏ hoặc tăng tiền để dành nhé!' : 'Mục tiêu vừa sức, cố lên nào! 💪'}</>
          : 'Nhập giá món đồ bé muốn mua để xem cần để dành bao lâu nhé.'}
      </div>
    </div>
  );
}

function JarSplitter() {
  const [amount, setAmount] = useState(200000);
  return (
    <div className="panel tool">
      <h3><Jar size={22} />Chia 3 hũ tiền</h3>
      <div className="field"><label>Bé vừa nhận được</label><MoneyInput label="Số tiền bé nhận được" value={amount} onChange={setAmount} /></div>
      <div className="result-box">
        {JARS.map(([n, r, c]) => (
          <div className="sum-line" style={{ padding: '4px 0' }} key={n}><span><b style={{ color: c }}>●</b> {n} ({r * 100}%)</span><b>{money(Math.round((amount || 0) * r))}</b></div>
        ))}
        <div className="jar-bar">{JARS.map(([n, r, c]) => <i key={n} style={{ width: `${r * 100}%`, background: c }} />)}</div>
      </div>
    </div>
  );
}

// Cửa sổ popup trợ lý: luôn được mount để giữ nguyên đoạn chat khi đóng/mở
export default function Assistant({ open, onClose }) {
  const [tab, setTab] = useState('chat');

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={`ai-pop ${open ? 'open' : ''}`} role="dialog" aria-label="Trợ lý Moni Yo" aria-hidden={!open}>
      <div className="chat-head">
        <KidAvatar size={42} />
        <div><b>Trợ lý Moni Yo</b><small>● Hỏi về Moni Yo và dạy con về tiền</small></div>
        <button className="ai-close" onClick={onClose} aria-label="Đóng trợ lý"><X /></button>
      </div>
      <div className="ai-tabs">
        {TABS.map(([k, Icon, label]) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}><Icon size={16} />{label}</button>)}
      </div>
      <div className="ai-pane" hidden={tab !== 'chat'}><ChatPane active={open && tab === 'chat'} /></div>
      <div className="ai-pane tools" hidden={tab !== 'goal'}><GoalCalculator /></div>
      <div className="ai-pane tools" hidden={tab !== 'jars'}><JarSplitter /></div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { PageHero } from '../components/Blocks';
import { aiReply } from '../lib/ai';
import { money } from '../lib/utils';

const SUGGESTIONS = ['Bé 6 tuổi nên chơi gì?', 'Nên cho con tiêu vặt bao nhiêu?', 'Luật chơi thế nào?', 'Phí giao hàng?', 'Cách dạy con tiết kiệm'];
const JARS = [['Tiêu', .5, 'var(--orange)'], ['Tiết kiệm', .4, 'var(--green)'], ['Chia sẻ', .1, 'var(--blue)']];
const Typing = () => <span className="typing"><span /><span /><span /></span>;

function ChatBox() {
  const [msgs, setMsgs] = useState([{ who: 'bot', body: <>Xin chào! 🐷 Mình là <b>Heo Vàng</b> – trợ lý giúp bố mẹ dạy con về tiền và chọn đồ chơi phù hợp. Bạn cần mình giúp gì?</> }]);
  const [input, setInput] = useState('');
  const bodyRef = useRef(null);
  const timers = useRef([]);

  useEffect(() => { bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const ask = text => {
    if (!text.trim()) return;
    const id = Date.now();
    setMsgs(m => [...m, { who: 'me', body: text }, { who: 'bot', id, body: <Typing /> }]);
    timers.current.push(setTimeout(() => {
      setMsgs(m => m.map(x => (x.id === id ? { ...x, body: aiReply(text) } : x)));
    }, 700 + Math.random() * 500));
  };

  return (
    <div className="chat">
      <div className="chat-head">
        <span className="avatar">🐷</span>
        <div><b>Heo Vàng – Trợ lý tài chính nhí</b><small>● Đang trực tuyến · trả lời tức thì</small></div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {msgs.map((m, i) => <div key={i} className={`msg ${m.who}`}>{m.body}</div>)}
      </div>
      <div className="chat-suggest">
        {SUGGESTIONS.map(s => <button key={s} onClick={() => ask(s)}>{s}</button>)}
      </div>
      <form className="chat-form" onSubmit={e => { e.preventDefault(); ask(input); setInput(''); }}>
        <input className="input" value={input} onChange={e => setInput(e.target.value)} placeholder="Hỏi Heo Vàng bất cứ điều gì..." autoComplete="off" />
        <button className="btn btn-sm">Gửi</button>
      </form>
    </div>
  );
}

function GoalCalculator() {
  const [goal, setGoal] = useState(350000);
  const [weekly, setWeekly] = useState(20000);
  const weeks = Math.ceil((goal || 0) / weekly);
  return (
    <div className="panel tool">
      <h3>🎯 Máy tính mục tiêu tiết kiệm</h3>
      <div className="field"><label>Món đồ bé muốn mua (giá)</label><input className="input" type="number" step="10000" value={goal} onChange={e => setGoal(+e.target.value)} /></div>
      <div style={{ marginTop: 12 }}>
        <div className="range-row"><span>Tiết kiệm mỗi tuần</span><span>{money(weekly)}</span></div>
        <input type="range" min="5000" max="100000" step="5000" value={weekly} onChange={e => setWeekly(+e.target.value)} />
      </div>
      <div className="result-box">
        Bé cần tiết kiệm trong<b className="big">{weeks} tuần</b>≈ {Math.ceil(weeks / 4.3)} tháng. {weeks > 20 ? 'Mục tiêu hơi xa – thử chia nhỏ hoặc tăng tiền để dành nhé!' : 'Mục tiêu vừa sức, cố lên nào! 💪'}
      </div>
    </div>
  );
}

function JarSplitter() {
  const [amount, setAmount] = useState(200000);
  return (
    <div className="panel tool">
      <h3>🫙 Chia 3 hũ tiền</h3>
      <div className="field"><label>Bé vừa nhận được (đ)</label><input className="input" type="number" step="10000" value={amount} onChange={e => setAmount(+e.target.value)} /></div>
      <div className="result-box">
        {JARS.map(([n, r, c]) => (
          <div className="sum-line" style={{ padding: '4px 0' }} key={n}><span><b style={{ color: c }}>●</b> {n} ({r * 100}%)</span><b>{money(Math.round((amount || 0) * r))}</b></div>
        ))}
        <div className="jar-bar">{JARS.map(([n, r, c]) => <i key={n} style={{ width: `${r * 100}%`, background: c }} />)}</div>
      </div>
    </div>
  );
}

export default function AI() {
  return (
    <>
      <PageHero eyebrow="Trợ lý thông minh" title="Heo Vàng AI">Trợ lý AI</PageHero>
      <section className="section">
        <div className="container ai-layout">
          <ChatBox />
          <div style={{ display: 'grid', gap: 20 }}>
            <GoalCalculator />
            <JarSplitter />
          </div>
        </div>
      </section>
    </>
  );
}

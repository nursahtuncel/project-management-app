import { useEffect, useState } from "react";
import "./DoneModal.css";

const MESSAGES = [
  { emoji: "🚀", title: "Harika iş!", sub: "Bir adım daha ileri gittin." },
  { emoji: "🔥", title: "Ezdin geçtin!", sub: "Bu ticket artık geride kaldı." },
  { emoji: "⚡", title: "Lightning speed!", sub: "Ekip seni görsün." },
  { emoji: "🎯", title: "Tam isabet!", sub: "Hedef vuruldu." },
  { emoji: "💪", title: "Güçlü iş!", sub: "Done listesi büyüyor." },
];

export default function DoneModal({ card, completion, onClose }) {
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      color: ["#6b46c1","#e53e3e","#d69e2e","#38a169","#3182ce","#ed64a6"][i % 6],
      size: 6 + Math.random() * 8,
    }))
  );

  useEffect(() => {
    const t = setTimeout(onClose, 3800);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="done-overlay" onClick={onClose}>
      {/* Confetti */}
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti"
          style={{
            left: `${p.x}%`,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <div className="done-modal" onClick={e => e.stopPropagation()}>
        {/* Progress ring */}
        <div className="progress-ring-wrap">
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle cx="45" cy="45" r="38" fill="none" stroke="#e9d8fd" strokeWidth="7" />
            <circle
              cx="45" cy="45" r="38"
              fill="none"
              stroke="#6b46c1"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 38}`}
              strokeDashoffset={`${2 * Math.PI * 38 * (1 - completion / 100)}`}
              transform="rotate(-90 45 45)"
              style={{ transition: "stroke-dashoffset 0.8s ease" }}
            />
          </svg>
          <div className="ring-emoji">{msg.emoji}</div>
        </div>

        <h2 className="done-title">{msg.title}</h2>
        <p className="done-sub">{msg.sub}</p>

        {/* Ticket info */}
        <div className="done-ticket">
          <span className="done-ticket-id">#{card.id}</span>
          <span className="done-ticket-name">{card.title}</span>
        </div>

        {/* Completion bar */}
        <div className="done-completion">
          <div className="done-completion-top">
            <span>Proje İlerlemesi</span>
            <span className="done-pct">{completion}%</span>
          </div>
          <div className="done-bar-track">
            <div className="done-bar-fill" style={{ width: `${completion}%` }} />
          </div>
        </div>

        <button className="done-close" onClick={onClose}>Devam Et →</button>
      </div>
    </div>
  );
}
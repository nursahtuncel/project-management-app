import { PRIORITY } from "../../constants/priority";
import "./Card.css";

export default function Card({ card, members, colColor, isDragging, onDragStart, onDragEnd, onDeleteClick, onClick }) {
  const p        = PRIORITY[card.priority] || PRIORITY.medium;
  const assignee = (members || []).find(m => m.id === card.assigneeId);

  return (
    <div
      className={`card ${isDragging ? "is-dragging" : ""}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      style={{ borderLeft: `4px solid ${colColor}` }}
    >
      {/* Üst satır */}
      <div className="card-top">
        <span className="card-id">#{card.id}</span>
        <div className="card-top-right">
          <span className="card-priority" style={{ color: p.color }}>
            {p.icon} {p.label}
          </span>
          <button
            className="del-btn"
            title="Sil"
            onClick={e => { e.stopPropagation(); onDeleteClick(); }}
          >✕</button>
        </div>
      </div>

      {/* Title */}
      <div className="card-title">{card.title}</div>

      {/* Links */}
      <div className="card-links">
        {card.figmaLink && (
          <a href={card.figmaLink} target="_blank" rel="noreferrer"
            className="card-link figma" onClick={e => e.stopPropagation()}>
            🎨 Figma
          </a>
        )}
        {card.liveLink && (
          <a href={card.liveLink} target="_blank" rel="noreferrer"
            className="card-link live" onClick={e => e.stopPropagation()}>
            🌐 Canlı
          </a>
        )}
        {card.prLink && (
          <a href={card.prLink} target="_blank" rel="noreferrer"
            className="card-link pr" onClick={e => e.stopPropagation()}>
            🔀 PR
          </a>
        )}
      </div>

      {/* Footer */}
      <div className="card-footer">
        <span className="story-badge">▶ {card.type}</span>
        <div className="card-footer-right">
          {assignee ? (
            <div className="assignee-chip">
              {assignee.photoURL ? (
                <img
                  src={assignee.photoURL}
                  alt={assignee.name}
                  style={{ width:20, height:20, borderRadius:"50%", objectFit:"cover" }}
                />
              ) : (
                <div style={{
                  width:20, height:20, borderRadius:"50%",
                  background:"#6b46c1", color:"#fff",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:700,
                }}>
                  {assignee.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="assignee-name">
                {assignee.name?.split(" ")[0]}
              </span>
            </div>
          ) : (
            <span style={{ fontSize:11, color:"#cbd5e0" }}>Atanmadı</span>
          )}
        </div>
      </div>
    </div>
  );
}
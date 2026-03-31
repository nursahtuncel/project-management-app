import { useState } from "react";
import { PRIORITY } from "../../constants/priority";
import "./AddCardForm.css";

export default function AddCardForm({ members, onAdd, onCancel }) {
  const [title,      setTitle]      = useState("");
  const [priority,   setPriority]   = useState("medium");
  const [assigneeId, setAssigneeId] = useState("");
  const [figmaLink,  setFigmaLink]  = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({
      title:      title.trim(),
      priority,
      assigneeId: assigneeId || null,
      figmaLink,
      liveLink:   "",
      prLink:     "",
    });
  };

  return (
    <div className="add-card-form">
      <input
        autoFocus
        className="add-card-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") handleAdd();
          if (e.key === "Escape") onCancel();
        }}
        placeholder="Ticket başlığı..."
      />

      {/* Öncelik */}
      <div className="add-card-priorities">
        {Object.entries(PRIORITY).map(([key, p]) => (
          <button
            key={key}
            className="priority-btn"
            style={{
              borderColor: priority === key ? p.color : "#dfe1e6",
              background:  priority === key ? p.color + "18" : "#fff",
              color:       p.color,
            }}
            onClick={() => setPriority(key)}
          >
            {p.icon} {p.label}
          </button>
        ))}
      </div>

      {/* Kişi Ata */}
      <select
        className="add-card-select"
        value={assigneeId}
        onChange={e => setAssigneeId(e.target.value)}
      >
        <option value="">👤 Kişi Ata (opsiyonel)</option>
        {(members || []).map(m => (
          <option key={m.id} value={m.id}>
            {m.name} — {m.role || "Developer"}
          </option>
        ))}
      </select>

      {/* Figma */}
      <input
        className="add-card-input"
        value={figmaLink}
        onChange={e => setFigmaLink(e.target.value)}
        placeholder="🎨 Figma linki (opsiyonel)"
      />

      <div className="add-card-actions">
        <button className="btn-create" onClick={handleAdd}>+ Oluştur</button>
        <button className="btn-cancel" onClick={onCancel}>İptal</button>
      </div>
    </div>
  );
}
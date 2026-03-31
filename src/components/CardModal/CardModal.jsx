import { useState } from "react";
import { PRIORITY } from "../../constants/priority";
import "./CardModal.css";

export default function CardModal({ card, members, colColor, onSave, onClose }) {
  const [form, setForm] = useState({
    ...card,
    assigneeId: card.assigneeId || ""
  });

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));

const handleSave = () => {
  onSave({ ...form, assigneeId: form.assigneeId || null });
  onClose();
};

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div
          className="card-modal-header"
          style={{ borderTop: `4px solid ${colColor}` }}
        >
          <div className="card-modal-id">#{card.id}</div>
          <button className="card-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Title */}
        <div className="card-modal-section">
          <label>Başlık</label>
          <input
            className="cm-input"
            value={form.title || ""}
            onChange={e => set("title", e.target.value)}
          />
        </div>

        {/* Priority + Assignee */}
        <div className="card-modal-row">

          {/* Priority */}
          <div className="card-modal-section">
            <label>Öncelik</label>
            <div className="priority-group">
              {Object.entries(PRIORITY).map(([key, p]) => (
                <button
                  key={key}
                  type="button"
                  className={`priority-pill ${form.priority === key ? "active" : ""}`}
                  style={{
                    borderColor: form.priority === key ? p.color : "#dfe1e6",
                    background: form.priority === key ? p.color + "18" : "#fff",
                    color: p.color,
                  }}
                  onClick={() => set("priority", key)}
                >
                  {p.icon} {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assignee */}
          <div className="card-modal-section">
            <label>Atanan Kişi</label>
        <select
  className="cm-select"
  value={form.assigneeId || ""}
  onChange={e => set("assigneeId", e.target.value)}
>
  <option value="">— Atanmadı —</option>
  {(members || []).map(m => (
    <option key={m.id} value={String(m.id)}>
      {m.name} — {m.role || "Developer"}
    </option>
  ))}
</select>
          </div>

        </div>

        {/* Links */}
        <div className="card-modal-section">
          <label>🎨 Figma</label>
          <input
            className="cm-input"
            value={form.figmaLink || ""}
            onChange={e => set("figmaLink", e.target.value)}
          />
        </div>

        <div className="card-modal-section">
          <label>🌐 Canlı</label>
          <input
            className="cm-input"
            value={form.liveLink || ""}
            onChange={e => set("liveLink", e.target.value)}
          />
        </div>

        <div className="card-modal-section">
          <label>🔀 PR</label>
          <input
            className="cm-input"
            value={form.prLink || ""}
            onChange={e => set("prLink", e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="card-modal-footer">
          <button className="btn-save" onClick={handleSave}>
            💾 Kaydet
          </button>
          <button className="btn-ghost" onClick={onClose}>
            İptal
          </button>
        </div>

      </div>
    </div>
  );
}
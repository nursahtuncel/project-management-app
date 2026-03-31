import { useState } from "react";
import "./PRLinkModal.css";

export default function PRLinkModal({ cardTitle, onConfirm, onCancel }) {
  const [link, setLink] = useState("");
  const isValid = link.trim().startsWith("http");

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="pr-modal" onClick={e => e.stopPropagation()}>
        <div className="pr-icon">🔀</div>
        <h3>GitHub PR Linki</h3>
        <p>
          <strong>"{cardTitle}"</strong> ticketını Code Review'a taşımak için
          PR linkini ekle.
        </p>
        <input
          autoFocus
          value={link}
          onChange={e => setLink(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && isValid) onConfirm(link.trim()); if (e.key === "Escape") onCancel(); }}
          placeholder="https://github.com/org/repo/pull/123"
          className="pr-input"
        />
        {link && !isValid && (
          <p className="pr-error">Geçerli bir URL gir (https:// ile başlamalı)</p>
        )}
        <div className="pr-actions">
          <button className="btn-primary" onClick={() => onConfirm(link.trim())} disabled={!isValid}>
            Taşı →
          </button>
          <button className="btn-ghost" onClick={onCancel}>İptal</button>
        </div>
      </div>
    </div>
  );
}
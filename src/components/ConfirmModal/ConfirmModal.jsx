import "./ConfirmModal.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-modal" onClick={e => e.stopPropagation()}>
        <div className="confirm-icon">🗑️</div>
        <h3>Emin misin?</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-danger" onClick={onConfirm}>Evet, Sil</button>
          <button className="btn-ghost" onClick={onCancel}>İptal</button>
        </div>
      </div>
    </div>
  );
}
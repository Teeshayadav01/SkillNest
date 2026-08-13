export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, danger }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal__actions">
          <button className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button className={danger ? "btn btn--danger" : "btn btn--primary"} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

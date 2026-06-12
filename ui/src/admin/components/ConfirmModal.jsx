/**
 * 공통 확인 다이얼로그 모달
 * props: message, confirmLabel, cancelLabel, onConfirm, onCancel, danger
 */
export default function ConfirmModal({ message, confirmLabel = '확인', cancelLabel = '취소', onConfirm, onCancel, danger = false }) {
  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="confirm-cancel" onClick={onCancel}>{cancelLabel}</button>
          <button
            className={`confirm-ok${danger ? ' danger' : ''}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

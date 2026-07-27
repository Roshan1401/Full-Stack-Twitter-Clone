import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  return createPortal(
    <dialog className="modal-overlay" open onClose={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}

export default Modal;

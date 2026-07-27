import { useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] max-h-[90vh] overflow-y-auto rounded-[10px] border border-[#2f3336] bg-black px-[15px] py-[5px] animate-[modalFadeIn_0.15s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;

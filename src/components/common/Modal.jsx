import React, { useEffect } from "react";
import { X } from "lucide-react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#12372A]/70 p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={[
          "relative max-h-[90vh] w-full overflow-y-auto",
          "bg-[#FAF8F2] shadow-2xl",
          sizeClasses[size] || sizeClasses.md,
        ].join(" ")}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-[#DCE2D8] px-6 py-5">
            {title ? (
              <h2
                id="modal-title"
                className="font-serif text-xl text-[#12372A]"
              >
                {title}
              </h2>
            ) : (
              <span />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-full p-2 text-[#68736A] transition hover:bg-[#F1F3EC] hover:text-[#12372A]"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
import React, { useEffect } from "react";
import { X } from "lucide-react";

function Drawer({
  isOpen,
  onClose,
  title,
  children,
  position = "right",
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

  const positionClasses = {
    left: "left-0 top-0 h-full",
    right: "right-0 top-0 h-full",
    top: "left-0 top-0 w-full",
    bottom: "bottom-0 left-0 w-full",
  };

  const sizeClasses = {
    sm: position === "top" || position === "bottom"
      ? "max-h-[35vh]"
      : "max-w-sm",

    md: position === "top" || position === "bottom"
      ? "max-h-[60vh]"
      : "max-w-md",

    lg: position === "top" || position === "bottom"
      ? "max-h-[85vh]"
      : "max-w-lg",

    full: position === "top" || position === "bottom"
      ? "max-h-full"
      : "max-w-full",
  };

  const animationClasses = {
    left: "animate-[slideInLeft_0.3s_ease-out]",
    right: "animate-[slideInRight_0.3s_ease-out]",
    top: "animate-[slideInTop_0.3s_ease-out]",
    bottom: "animate-[slideInBottom_0.3s_ease-out]",
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#12372A]/60 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="presentation"
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title || "Side panel"}
        className={[
          "absolute flex flex-col bg-[#FAF8F2] shadow-2xl",
          positionClasses[position],
          sizeClasses[size],
          animationClasses[position],
          "w-full",
        ].join(" ")}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#DCE2D8] px-6 py-5">
          <h2 className="font-serif text-xl text-[#12372A]">
            {title}
          </h2>

          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close drawer"
              className="rounded-full p-2 text-[#68736A] transition hover:bg-[#F1F3EC] hover:text-[#12372A]"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </aside>
    </div>
  );
}

export default Drawer;
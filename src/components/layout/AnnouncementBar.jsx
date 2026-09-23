import React from "react";
import { X } from "lucide-react";

function AnnouncementBar() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-[#12372A] px-10 py-2 text-center text-xs tracking-[0.12em] text-[#FAF8F2]">
      <p>
        Complimentary shipping on orders above ₹2,999
      </p>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        aria-label="Close announcement"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAF8F2] transition hover:text-[#B59A63]"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export default AnnouncementBar;
import React from "react";
import { X } from "lucide-react";

function AnnouncementBar() {
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative bg-[#12372A] text-[#FAF8F2]">
      <div className="bc-container flex min-h-9 items-center justify-center px-10 py-2 sm:min-h-10">
        <p className="text-center text-[10px] leading-4 tracking-[0.08em] sm:text-xs sm:tracking-[0.12em]">
          Complimentary shipping on orders above ₹2,999
        </p>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-[#FAF8F2] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] sm:right-4"
        >
          <X size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

export default AnnouncementBar;

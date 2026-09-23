import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProductAccordion = ({ items = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  if (!items.length) return null;

  return (
    <div className="divide-y divide-[#DCE2D8] border-y border-[#DCE2D8]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.id || item.title}>
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-[#12372A]">
                {item.title}
              </span>

              <ChevronDown
                size={18}
                className={`shrink-0 text-[#68736A] transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pb-5 text-sm leading-7 text-[#68736A]">
                {typeof item.content === "string" ? (
                  <p>{item.content}</p>
                ) : (
                  item.content
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductAccordion;
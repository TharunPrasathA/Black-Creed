import { SlidersHorizontal } from "lucide-react";

const sortOptions = [
  {
    label: "Recommended",
    value: "recommended",
  },
  {
    label: "Newest Arrivals",
    value: "newest",
  },
  {
    label: "Price: Low to High",
    value: "price-low-high",
  },
  {
    label: "Price: High to Low",
    value: "price-high-low",
  },
  {
    label: "Customer Rating",
    value: "rating",
  },
  {
    label: "Best Selling",
    value: "best-selling",
  },
];

const SortDropdown = ({
  value = "recommended",
  onChange,
  productCount,
  onFilterClick,
  showFilterButton = false,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-[#68736A]">
        {typeof productCount === "number" && (
          <>
            <span className="font-semibold text-[#12372A]">
              {productCount}
            </span>{" "}
            products
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {showFilterButton && (
          <button
            type="button"
            onClick={onFilterClick}
            className="inline-flex items-center gap-2 border border-[#DCE2D8] px-4 py-3 text-xs font-semibold text-[#12372A] transition hover:bg-[#12372A] hover:text-white lg:hidden"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        )}

        <label className="flex items-center gap-2 text-xs text-[#68736A]">
          <span className="hidden sm:inline">Sort by:</span>

          <select
            value={value}
            onChange={(event) => onChange?.(event.target.value)}
            className="min-w-[165px] border border-[#DCE2D8] bg-white px-3 py-3 text-xs font-medium text-[#12372A] outline-none focus:border-[#12372A]"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export { sortOptions };

export default SortDropdown;
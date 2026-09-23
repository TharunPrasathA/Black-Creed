import { useState } from "react";
import { ChevronDown, RotateCcw } from "lucide-react";

const defaultFilters = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: [0, 5000],
  availability: "all",
};

const categoryOptions = [
  { label: "Shirts", value: "shirts" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Trousers", value: "trousers" },
  { label: "Outerwear", value: "outerwear" },
];

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

const colorOptions = [
  { label: "Black", value: "black", color: "#111111" },
  { label: "White", value: "white", color: "#FFFFFF" },
  { label: "Sage Green", value: "sage-green", color: "#A8B5A2" },
  { label: "Deep Forest", value: "deep-forest", color: "#12372A" },
  { label: "Beige", value: "beige", color: "#D8C7A5" },
  { label: "Navy", value: "navy", color: "#172A46" },
];

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[#DCE2D8] py-5">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-[#12372A]">
          {title}
        </span>

        <ChevronDown
          size={17}
          className={`text-[#68736A] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

const FilterSidebar = ({
  filters = defaultFilters,
  onFiltersChange,
  onClearFilters,
}) => {
  const activeFilters = {
    ...defaultFilters,
    ...filters,
  };

  const updateFilter = (key, value) => {
    onFiltersChange?.({
      ...activeFilters,
      [key]: value,
    });
  };

  const toggleArrayValue = (key, value) => {
    const currentValues = activeFilters[key] || [];

    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    updateFilter(key, updatedValues);
  };

  const activeFilterCount =
    activeFilters.categories.length +
    activeFilters.sizes.length +
    activeFilters.colors.length +
    (activeFilters.availability !== "all" ? 1 : 0);

  return (
    <aside className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#12372A]">Filters</h2>

          {activeFilterCount > 0 && (
            <p className="mt-1 text-xs text-[#68736A]">
              {activeFilterCount} filter
              {activeFilterCount > 1 ? "s" : ""} applied
            </p>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#12372A] hover:text-[#B59A63]"
          >
            <RotateCcw size={13} />
            Clear
          </button>
        )}
      </div>

      <FilterSection title="Category">
        <div className="space-y-3">
          {categoryOptions.map((category) => (
            <label
              key={category.value}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#68736A]"
            >
              <input
                type="checkbox"
                checked={activeFilters.categories.includes(category.value)}
                onChange={() =>
                  toggleArrayValue("categories", category.value)
                }
                className="h-4 w-4 accent-[#12372A]"
              />

              <span>{category.label}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => {
            const isSelected = activeFilters.sizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleArrayValue("sizes", size)}
                className={`flex h-10 min-w-11 items-center justify-center border px-3 text-xs font-medium transition ${
                  isSelected
                    ? "border-[#12372A] bg-[#12372A] text-white"
                    : "border-[#DCE2D8] text-[#12372A] hover:border-[#12372A]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="space-y-3">
          {colorOptions.map((color) => {
            const isSelected = activeFilters.colors.includes(color.value);

            return (
              <button
                key={color.value}
                type="button"
                onClick={() => toggleArrayValue("colors", color.value)}
                className="flex w-full items-center gap-3 text-left text-sm text-[#68736A]"
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                    isSelected
                      ? "border-[#12372A] ring-2 ring-[#B59A63] ring-offset-1"
                      : "border-[#DCE2D8]"
                  }`}
                  style={{ backgroundColor: color.color }}
                />

                <span>{color.label}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={activeFilters.priceRange[1]}
            onChange={(event) =>
              updateFilter("priceRange", [
                activeFilters.priceRange[0],
                Number(event.target.value),
              ])
            }
            className="w-full accent-[#12372A]"
          />

          <div className="flex items-center justify-between text-xs text-[#68736A]">
            <span>₹{activeFilters.priceRange[0].toLocaleString("en-IN")}</span>

            <span>₹{activeFilters.priceRange[1].toLocaleString("en-IN")}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Availability">
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#68736A]">
            <input
              type="radio"
              name="availability"
              value="all"
              checked={activeFilters.availability === "all"}
              onChange={(event) =>
                updateFilter("availability", event.target.value)
              }
              className="accent-[#12372A]"
            />
            All Products
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#68736A]">
            <input
              type="radio"
              name="availability"
              value="in-stock"
              checked={activeFilters.availability === "in-stock"}
              onChange={(event) =>
                updateFilter("availability", event.target.value)
              }
              className="accent-[#12372A]"
            />
            In Stock
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm text-[#68736A]">
            <input
              type="radio"
              name="availability"
              value="out-of-stock"
              checked={activeFilters.availability === "out-of-stock"}
              onChange={(event) =>
                updateFilter("availability", event.target.value)
              }
              className="accent-[#12372A]"
            />
            Out of Stock
          </label>
        </div>
      </FilterSection>
    </aside>
  );
};

export { defaultFilters };

export default FilterSidebar;
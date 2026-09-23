import Drawer from "../common/Drawer";
import FilterSidebar from "./FilterSidebar";
import { X } from "lucide-react";

const MobileFilterDrawer = ({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
  onApply,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="left"
      size="sm"
      title="Filter Products"
    >
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-y-auto pr-1">
          <FilterSidebar
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClearFilters={onClearFilters}
          />
        </div>

        <div className="mt-6 border-t border-[#DCE2D8] bg-white pt-4">
          <button
            type="button"
            onClick={() => {
              onApply?.();
              onClose?.();
            }}
            className="flex w-full items-center justify-center gap-2 bg-[#12372A] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0B261C]"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default MobileFilterDrawer;
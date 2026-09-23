import { useState } from "react";

const VariantSelector = ({
  sizes = ["S", "M", "L", "XL"],
  colors = [],
  selectedSize,
  selectedColor,
  onSizeChange,
  onColorChange,
  showSizeLabel = true,
}) => {
  const [internalSize, setInternalSize] = useState(sizes[0] || "");
  const [internalColor, setInternalColor] = useState(colors[0]?.name || "");

  const activeSize = selectedSize ?? internalSize;
  const activeColor = selectedColor ?? internalColor;

  const handleSizeChange = (size) => {
    setInternalSize(size);
    onSizeChange?.(size);
  };

  const handleColorChange = (color) => {
    setInternalColor(color);
    onColorChange?.(color);
  };

  return (
    <div className="space-y-6">
      {sizes.length > 0 && (
        <div>
          {showSizeLabel && (
            <div className="mb-3 flex items-center justify-between">
              <label className="text-sm font-semibold text-[#12372A]">
                Select Size
              </label>

              <span className="text-xs text-[#68736A]">
                Choose your usual size
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isActive = activeSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`flex h-11 min-w-12 items-center justify-center border px-4 text-sm font-medium transition ${
                    isActive
                      ? "border-[#12372A] bg-[#12372A] text-white"
                      : "border-[#DCE2D8] text-[#12372A] hover:border-[#12372A]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <label className="mb-3 block text-sm font-semibold text-[#12372A]">
            Select Color
          </label>

          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const colorName = typeof color === "string" ? color : color.name;
              const colorValue =
                typeof color === "string" ? color : color.value;

              const isActive = activeColor === colorName;

              return (
                <button
                  key={colorName}
                  type="button"
                  onClick={() => handleColorChange(colorName)}
                  title={colorName}
                  aria-label={`Select ${colorName}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    isActive
                      ? "border-[#12372A] ring-2 ring-[#B59A63] ring-offset-2"
                      : "border-white"
                  }`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-black/10"
                    style={{ backgroundColor: colorValue }}
                  />
                </button>
              );
            })}
          </div>

          {activeColor && (
            <p className="mt-2 text-xs text-[#68736A]">{activeColor}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
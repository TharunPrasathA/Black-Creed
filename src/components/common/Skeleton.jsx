import React from "react";

function Skeleton({
  className = "",
  variant = "default",
  width,
  height,
}) {
  const variantClasses = {
    default: "rounded-none",
    text: "h-4 rounded-sm",
    title: "h-7 rounded-sm",
    circle: "rounded-full",
    image: "aspect-[4/5] rounded-none",
    button: "h-12 rounded-none",
    card: "h-80 rounded-none",
  };

  return (
    <div
      aria-hidden="true"
      className={[
        "animate-pulse bg-[#DCE2D8]",
        variantClasses[variant] || variantClasses.default,
        className,
      ].join(" ")}
      style={{
        width,
        height,
      }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton variant="image" className="w-full" />

      <div className="space-y-2">
        <Skeleton variant="text" className="w-1/3" />
        <Skeleton variant="text" className="w-4/5" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

export default Skeleton;
import ProductCard from "./ProductCard";
import { PackageOpen } from "lucide-react";

const ProductGrid = ({
  products = [],
  columns = 4,
  onAddToCart,
  onToggleWishlist,
  wishlistItems = [],
  emptyTitle = "No products found",
  emptyDescription = "Try changing your filters or search for another product.",
}) => {
  const gridColumns = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  if (!products.length) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
        <PackageOpen size={48} className="text-[#9AA39B]" />

        <h3 className="mt-5 text-xl font-semibold text-[#12372A]">
          {emptyTitle}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#68736A]">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-x-4 gap-y-10 ${gridColumns[columns] || gridColumns[4]}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          isWishlisted={wishlistItems.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const formatPrice = (price) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!product) return null;

  const {
    id,
    name,
    category,
    price,
    originalPrice,
    image,
    hoverImage,
    badge,
    href = `/product/${id}`,
  } = product;

  const discount =
    originalPrice && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  return (
    <article className="group min-w-0">
      <div className="relative overflow-hidden bg-[#F1F3EC]">
        <Link to={href} className="relative block aspect-[0.82]">
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-[#DCE2D8]" />
          )}

          <img
            src={image}
            alt={name}
            onLoad={() => setImageLoaded(true)}
            className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {hoverImage && (
            <img
              src={hoverImage}
              alt={`${name} alternate view`}
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        {badge && (
          <span className="absolute left-3 top-3 bg-[#12372A] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 bg-[#B59A63] px-2 py-1 text-[10px] font-semibold text-[#12372A]">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleWishlist?.(product)}
          aria-label={
            isWishlisted
              ? `Remove ${name} from wishlist`
              : `Add ${name} to wishlist`
          }
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 transition ${
            isWishlisted
              ? "text-red-600"
              : "text-[#12372A] hover:bg-[#12372A] hover:text-white"
          }`}
        >
          <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <div className="absolute bottom-3 left-3 right-3 hidden translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="flex flex-1 items-center justify-center gap-2 bg-white px-3 py-3 text-xs font-semibold text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
          >
            <ShoppingBag size={15} />
            Add to Bag
          </button>

          <Link
            to={href}
            aria-label={`View ${name}`}
            className="flex h-11 w-11 items-center justify-center bg-white text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
          >
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-[11px] uppercase tracking-wider text-[#68736A]">
          {category}
        </p>

        <Link
          to={href}
          className="mt-1 block text-base font-semibold text-[#202923] transition hover:text-[#12372A]"
        >
          {name}
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[#12372A]">
            {formatPrice(price)}
          </span>

          {originalPrice && (
            <span className="text-sm text-[#9AA39B] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {product.colors?.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5">
            {product.colors.slice(0, 5).map((color) => (
              <span
                key={color}
                title={color}
                className="h-3.5 w-3.5 rounded-full border border-[#DCE2D8]"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 border border-[#DCE2D8] px-4 py-3 text-xs font-semibold text-[#12372A] transition hover:bg-[#12372A] hover:text-white sm:hidden"
        >
          <ShoppingBag size={15} />
          Add to Bag
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
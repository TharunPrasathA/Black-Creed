import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  ImageOff,
  ShoppingBag,
} from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85";

const formatPrice = (price) => {
  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "Price unavailable";
  }

  return `₹${numericPrice.toLocaleString("en-IN")}`;
};

const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
  const [hoverImageError, setHoverImageError] = useState(false);

  if (!product) return null;

  const {
    id,
    slug,
    name = "Untitled Shirt",
    category = "Shirts",
    price,
    originalPrice,
    image,
    hoverImage,
    badge,
    href,
  } = product;

  const productHref = href || `/product/${slug || id}`;

  const numericPrice = Number(price);
  const numericOriginalPrice = Number(originalPrice);

  const hasDiscount =
    Number.isFinite(numericOriginalPrice) &&
    Number.isFinite(numericPrice) &&
    numericOriginalPrice > numericPrice;

  const discount = hasDiscount
    ? Math.round(
        ((numericOriginalPrice - numericPrice) / numericOriginalPrice) * 100,
      )
    : 0;

  const primaryImage =
    typeof image === "string" && image.trim().length > 0
      ? image
      : FALLBACK_IMAGE;

  const secondaryImage =
    typeof hoverImage === "string" && hoverImage.trim().length > 0
      ? hoverImage
      : null;

  return (
    <article className="group flex h-full min-w-0 flex-col">
      {/* Product Image Area */}
      <div className="relative w-full overflow-hidden bg-[#F1F3EC]">
        <Link
          to={productHref}
          aria-label={`View ${name}`}
          className="relative block aspect-[0.82] w-full overflow-hidden"
        >
          {!imageLoaded && !imageError && (
            <div
              className="absolute inset-0 animate-pulse bg-[#DCE2D8]"
              aria-hidden="true"
            />
          )}

          {imageError ? (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#E8EDE4] px-4 text-center text-[#68736A]">
              <ImageOff size={28} strokeWidth={1.3} aria-hidden="true" />

              <span className="mt-2 text-xs">Image unavailable</span>
            </div>
          ) : (
            <img
              src={primaryImage}
              alt={name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035] ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {secondaryImage && !hoverImageError && !imageError && (
            <img
              src={secondaryImage}
              alt={`${name} alternate view`}
              loading="lazy"
              decoding="async"
              onLoad={() => setHoverImageLoaded(true)}
              onError={() => {
                setHoverImageError(true);
                setHoverImageLoaded(false);
              }}
              className={`absolute inset-0 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 ${
                hoverImageLoaded ? "group-hover:opacity-100" : ""
              }`}
            />
          )}
        </Link>

        {/* Product Badge */}
        {badge && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 bg-[#12372A] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
            {badge}
          </span>
        )}

        {/* Discount Badge */}
        {hasDiscount && discount > 0 && (
          <span className="pointer-events-none absolute bottom-3 left-3 z-10 bg-[#B59A63] px-2 py-1 text-[10px] font-semibold text-[#12372A]">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        {onToggleWishlist && (
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            aria-label={
              isWishlisted
                ? `Remove ${name} from wishlist`
                : `Add ${name} to wishlist`
            }
            aria-pressed={isWishlisted}
            className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] ${
              isWishlisted
                ? "text-red-600"
                : "text-[#12372A] hover:bg-[#12372A] hover:text-white"
            }`}
          >
            <Heart
              size={17}
              strokeWidth={1.6}
              fill={isWishlisted ? "currentColor" : "none"}
              aria-hidden="true"
            />
          </button>
        )}

        {/* Desktop Quick Actions */}
        {onAddToCart && (
          <div className="absolute bottom-3 left-3 right-3 z-20 hidden translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 bg-white px-3 py-3 text-xs font-semibold text-[#12372A] transition-colors duration-300 hover:bg-[#12372A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
            >
              <ShoppingBag size={15} strokeWidth={1.6} aria-hidden="true" />
              <span>Add to Bag</span>
            </button>

            <Link
              to={productHref}
              aria-label={`View details for ${name}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-[#12372A] transition-colors duration-300 hover:bg-[#12372A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
            >
              <ArrowUpRight size={17} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[10px] uppercase tracking-[0.14em] text-[#68736A] sm:text-[11px]">
          {category}
        </p>

        <Link
          to={productHref}
          className="mt-1 line-clamp-2 min-h-[3rem] text-sm font-semibold leading-6 text-[#202923] transition-colors duration-300 hover:text-[#12372A] sm:text-base"
        >
          {name}
        </Link>

        <div className="mt-2 flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-[#12372A]">
            {formatPrice(price)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-[#9AA39B] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        {/* Product Colors */}
        {Array.isArray(product.colors) && product.colors.length > 0 && (
          <div
            className="mt-3 flex min-h-4 items-center gap-1.5"
            aria-label="Available colors"
          >
            {product.colors.slice(0, 5).map((color, index) => (
              <span
                key={`${color}-${index}`}
                title={color}
                aria-label={color}
                className="h-3.5 w-3.5 rounded-full border border-[#DCE2D8]"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
        )}

        {/* Mobile Add to Bag */}
        {onAddToCart && (
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 border border-[#DCE2D8] px-4 py-3 text-xs font-semibold text-[#12372A] transition-colors duration-300 hover:bg-[#12372A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] sm:hidden"
          >
            <ShoppingBag size={15} strokeWidth={1.6} aria-hidden="true" />
            <span>Add to Bag</span>
          </button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  PackageOpen,
} from "lucide-react";

import ProductCard from "../product/ProductCard";

const ProductCarousel = ({
  title = "Featured Collection",
  subtitle = "Explore our latest styles",
  products = [],
  viewAllHref = "/shop",
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
}) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.85;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bc-section bg-[#FAF8F2]">
      <div className="bc-section-inner">
        <div className="bc-section-header">
          <div className="bc-section-header-left">
            <p className="bc-eyebrow">Curated for you</p>

            <h2 className="bc-section-title">{title}</h2>

            <p className="bc-section-description">{subtitle}</p>
          </div>

          <Link
            to={viewAllHref}
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] sm:inline-flex"
          >
            View All
            <ArrowRight
              size={16}
              strokeWidth={1.7}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="flex min-h-60 flex-col items-center justify-center border border-dashed border-[#DCE2D8] bg-[#F1F3EC] px-6 text-center">
            <PackageOpen
              size={34}
              strokeWidth={1.3}
              className="mb-3 text-[#68736A]"
              aria-hidden="true"
            />

            <h3 className="text-base font-semibold text-[#12372A]">
              Products coming soon
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-[#68736A]">
              We are preparing a refined selection of essentials for you.
            </p>
          </div>
        ) : (
          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous products"
              className="absolute left-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#12372A] shadow-md transition-colors duration-300 hover:bg-[#12372A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] md:flex lg:left-[-18px]"
            >
              <ChevronLeft size={19} strokeWidth={1.7} />
            </button>

            <div
              ref={carouselRef}
              className="bc-horizontal-scroll -mx-1 flex gap-4 px-1 pb-4 sm:gap-5"
            >
              {products.map((product, index) => (
                <div
                  key={product.id || product.slug || index}
                  className="w-[82vw] min-w-[82vw] snap-start sm:w-[45vw] sm:min-w-[45vw] md:w-[31vw] md:min-w-[31vw] lg:w-[calc((100%-60px)/4)] lg:min-w-[calc((100%-60px)/4)]"
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next products"
              className="absolute right-2 top-[38%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#12372A] shadow-md transition-colors duration-300 hover:bg-[#12372A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] md:flex lg:right-[-18px]"
            >
              <ChevronRight size={19} strokeWidth={1.7} />
            </button>
          </div>
        )}

        <Link
          to={viewAllHref}
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] sm:hidden"
        >
          View All
          <ArrowRight
            size={16}
            strokeWidth={1.7}
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};

export default ProductCarousel;

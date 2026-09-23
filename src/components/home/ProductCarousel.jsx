import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductCarousel = ({
  title = "Featured Collection",
  subtitle = "Explore our latest styles",
  products = [],
  viewAllHref = "/shop",
}) => {
  const carouselRef = useRef(null);

  const scroll = (direction) => {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#FAF8F2] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
              Curated For You
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[#12372A] sm:text-4xl">
              {title}
            </h2>

            <p className="mt-2 text-sm text-[#68736A]">
              {subtitle}
            </p>
          </div>

          <Link
            to={viewAllHref}
            className="hidden items-center gap-2 text-sm font-semibold text-[#12372A] transition hover:text-[#B59A63] sm:flex"
          >
            View All
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Carousel Controls */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous products"
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#12372A] shadow-md transition hover:bg-[#12372A] hover:text-white md:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4"
          >
            {products.map((product) => (
              <article
                key={product.id}
                className="w-full min-w-[260px] snap-start overflow-hidden rounded-sm bg-white sm:min-w-[280px] lg:min-w-[300px]"
              >
                <Link to={product.href || `/product/${product.slug || product.id}`}>
                  <div className="aspect-[3/4] overflow-hidden bg-[#F1F3EC]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wider text-[#68736A]">
                      {product.category}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-[#202923]">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-[#12372A]">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next products"
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#12372A] shadow-md transition hover:bg-[#12372A] hover:text-white md:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <Link
          to={viewAllHref}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#12372A] transition hover:text-[#B59A63] sm:hidden"
        >
          View All
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default ProductCarousel;
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ImageOff } from "lucide-react";

const defaultCategories = [
  {
    id: 1,
    name: "Formal Shirts",
    subtitle: "Refined silhouettes for every formal occasion",
    href: "/shop?category=formal",
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    name: "Casual Shirts",
    subtitle: "Effortless everyday style with character",
    href: "/shop?category=casual",
    image:
      "https://images.unsplash.com/photo-1602810319428-019690571b5b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    name: "Traditional Shirts",
    subtitle: "Modern heritage inspired by tradition",
    href: "/shop?category=traditional",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85",
  },
];

const CategoryCard = ({ category }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={category.href}
      aria-label={`Explore ${category.name}`}
      className="bc-category-card group"
    >
      {!imageLoaded && !imageError && (
        <div
          className="absolute inset-0 animate-pulse bg-[#DCE2D8]"
          aria-hidden="true"
        />
      )}

      {imageError ? (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#E8EDE4] px-4 text-center text-[#68736A]">
          <ImageOff size={30} strokeWidth={1.3} aria-hidden="true" />
          <span className="mt-2 text-xs">Image unavailable</span>
        </div>
      ) : (
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
          className={imageLoaded ? "opacity-100" : "opacity-0"}
        />
      )}

      <div className="category-overlay" aria-hidden="true" />

      <div className="category-content p-4 text-white sm:p-5 md:p-6">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
              {category.name}
            </h3>

            <p className="mt-2 max-w-[13rem] text-xs leading-5 sm:text-sm">
              {category.subtitle}
            </p>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/60 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#12372A]">
            <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
};

const CategoryGrid = ({
  title = "Shop Shirts by Style",
  subtitle = "Discover refined shirts designed for formal occasions, everyday expression, and modern heritage.",
  categories = defaultCategories,
}) => {
  return (
    <section className="bc-section bg-[#FAF8F2]">
      <div className="bc-section-inner">
        <div className="bc-section-header">
          <div className="bc-section-header-left">
            <p className="bc-eyebrow">Explore Our Shirts</p>

            <h2 className="bc-section-title">{title}</h2>
          </div>

          <p className="bc-section-header-right bc-section-description">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
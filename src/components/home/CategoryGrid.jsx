import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const defaultCategories = [
  {
    id: 1,
    name: "Shirts",
    subtitle: "Refined everyday essentials",
    href: "/shop?category=shirts",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "T-Shirts",
    subtitle: "Comfort meets character",
    href: "/shop?category=t-shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Trousers",
    subtitle: "Designed for movement",
    href: "/shop?category=trousers",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 4,
    name: "Outerwear",
    subtitle: "Layers with distinction",
    href: "/shop?category=outerwear",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85",
  },
];

const CategoryGrid = ({
  title = "Explore Categories",
  subtitle = "Discover pieces made to become part of your everyday identity.",
  categories = defaultCategories,
}) => {
  return (
    <section className="bg-[#FAF8F2] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B59A63]">
              Shop by style
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[#12372A] sm:text-4xl">
              {title}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#68736A]">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className="group relative aspect-[0.78] overflow-hidden bg-[#DCE2D8]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B261C]/90 via-[#0B261C]/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-white/75 sm:text-sm">
                      {category.subtitle}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/50 transition group-hover:bg-white group-hover:text-[#12372A]">
                    <ArrowUpRight size={17} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
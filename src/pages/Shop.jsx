import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import Breadcrumbs from "../components/common/Breadcrumbs";
import ProductGrid from "../components/product/ProductGrid";
import FilterSidebar, {
  defaultFilters,
} from "../components/shop/FilterSidebar";
import SortDropdown from "../components/shop/SortDropdown";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";

/*
 * Black Creed currently sells shirts only.
 *
 * Categories:
 * - Formal Shirts
 * - Casual Shirts
 * - Traditional Shirts
 */
const demoProducts = [
  {
    id: 1,
    name: "Classic Tailored Formal Shirt",
    category: "formal",
    categoryLabel: "Formal Shirts",
    price: 2199,
    originalPrice: 2799,
    image: "/images/product-1.jpg",
    hoverImage: "/images/product-1-hover.jpg",
    badge: "Bestseller",
    href: "/product/classic-tailored-formal-shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["white", "deep-forest", "black"],
    available: true,
    rating: 4.7,
    bestSelling: true,
    newest: true,
  },

  {
    id: 2,
    name: "Relaxed Everyday Casual Shirt",
    category: "casual",
    categoryLabel: "Casual Shirts",
    price: 1999,
    originalPrice: 2499,
    image: "/images/product-2.jpg",
    hoverImage: "/images/product-2-hover.jpg",
    badge: "New",
    href: "/product/relaxed-everyday-casual-shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["sage-green", "beige", "white"],
    available: true,
    rating: 4.5,
    bestSelling: false,
    newest: true,
  },

  {
    id: 3,
    name: "Heritage Traditional Shirt",
    category: "traditional",
    categoryLabel: "Traditional Shirts",
    price: 2499,
    originalPrice: 2999,
    image: "/images/product-3.jpg",
    hoverImage: "/images/product-3-hover.jpg",
    badge: "Heritage",
    href: "/product/heritage-traditional-shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["deep-forest", "beige", "black"],
    available: true,
    rating: 4.8,
    bestSelling: true,
    newest: true,
  },

  {
    id: 4,
    name: "Signature Modern Casual Shirt",
    category: "casual",
    categoryLabel: "Casual Shirts",
    price: 2299,
    originalPrice: 2799,
    image: "/images/product-4.jpg",
    hoverImage: "/images/product-4-hover.jpg",
    badge: "Limited",
    href: "/product/signature-modern-casual-shirt",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["deep-forest", "black", "navy"],
    available: true,
    rating: 4.6,
    bestSelling: true,
    newest: false,
  },
];

const Shop = () => {
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const categoryFromUrl = searchParams.get("category");

    if (
      categoryFromUrl &&
      ["formal", "casual", "traditional"].includes(categoryFromUrl)
    ) {
      return {
        ...defaultFilters,
        categories: [categoryFromUrl],
      };
    }

    return defaultFilters;
  });

  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  /*
   * Filter and sort products.
   */
  const filteredProducts = useMemo(() => {
    let products = [...demoProducts];

    /*
     * Category filter
     *
     * The FilterSidebar uses:
     * formal
     * casual
     * traditional
     */
    if (filters.categories.length > 0) {
      products = products.filter((product) =>
        filters.categories.includes(product.category),
      );
    }

    /*
     * Size filter
     */
    if (filters.sizes.length > 0) {
      products = products.filter((product) =>
        product.sizes?.some((size) =>
          filters.sizes.includes(size),
        ),
      );
    }

    /*
     * Color filter
     */
    if (filters.colors.length > 0) {
      products = products.filter((product) =>
        product.colors?.some((color) =>
          filters.colors.includes(color),
        ),
      );
    }

    /*
     * Price filter
     */
    products = products.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    /*
     * Availability filter
     */
    if (filters.availability === "in-stock") {
      products = products.filter(
        (product) => product.available,
      );
    }

    if (filters.availability === "out-of-stock") {
      products = products.filter(
        (product) => !product.available,
      );
    }

    /*
     * Sorting
     */
    if (sortBy === "price-low-high") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high-low") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "best-selling") {
      products.sort(
        (a, b) =>
          Number(b.bestSelling) -
          Number(a.bestSelling),
      );
    }

    if (sortBy === "newest") {
      products.sort(
        (a, b) =>
          Number(b.newest) -
          Number(a.newest),
      );
    }

    return products;
  }, [filters, sortBy]);

  /*
   * Wishlist
   */
  const handleToggleWishlist = (product) => {
    setWishlistItems((previous) =>
      previous.includes(product.id)
        ? previous.filter((id) => id !== product.id)
        : [...previous, product.id],
    );
  };

  /*
   * Add product to cart
   */
  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(
      localStorage.getItem("blackCreedCart") || "[]",
    );

    const existingItem = existingCart.find(
      (item) => item.id === product.id,
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "blackCreedCart",
      JSON.stringify(updatedCart),
    );

    window.dispatchEvent(
      new Event("cartUpdated"),
    );
  };

  /*
   * Clear all filters
   */
  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  /*
   * Heading based on selected category
   */
  const selectedCategories = filters.categories;

  const pageTitle =
    selectedCategories.length === 1
      ? {
          formal: "Formal Shirts",
          casual: "Casual Shirts",
          traditional: "Traditional Shirts",
        }[selectedCategories[0]]
      : "Shop All Shirts";

  const pageDescription =
    selectedCategories.length === 1
      ? `Explore our ${pageTitle.toLowerCase()} collection, designed with the Black Creed Modern Heritage aesthetic.`
      : "Discover refined shirts designed for formal occasions, everyday expression, and modern heritage.";

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            {
              label: "Shop",
              href: "/shop",
            },
          ]}
        />

        <div className="mt-6">
          {/* Page Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-[#DCE2D8] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
                Black Creed / Modern Heritage
              </p>

              <h1 className="mt-2 text-3xl font-semibold text-[#12372A] sm:text-4xl">
                {pageTitle}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#68736A]">
                {pageDescription}
              </p>
            </div>

            <p className="text-sm text-[#68736A]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "shirt"
                : "shirts"}
            </p>
          </div>

          {/* Mobile Controls */}
          <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() =>
                setMobileFiltersOpen(true)
              }
              className="flex items-center gap-2 rounded-lg border border-[#DCE2D8] bg-white px-4 py-3 text-sm font-medium text-[#12372A]"
            >
              <SlidersHorizontal size={17} />

              Filters
            </button>

            <SortDropdown
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          {/* Desktop Layout */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
            {/* Desktop Filters */}
            <aside className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
              />
            </aside>

            {/* Products */}
            <section>
              {/* Desktop Sort */}
              <div className="mb-6 hidden justify-end lg:flex">
                <SortDropdown
                  value={sortBy}
                  onChange={setSortBy}
                />
              </div>

              <ProductGrid
                products={filteredProducts}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                wishlistItems={wishlistItems}
              />
            </section>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() =>
          setMobileFiltersOpen(false)
        }
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={handleClearFilters}
      />
    </main>
  );
};

export default Shop;
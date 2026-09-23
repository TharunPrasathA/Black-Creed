import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import ProductGrid from "../components/product/ProductGrid";
import FilterSidebar, {
  defaultFilters,
} from "../components/shop/FilterSidebar";
import SortDropdown from "../components/shop/SortDropdown";
import MobileFilterDrawer from "../components/shop/MobileFilterDrawer";

const demoProducts = [
  {
    id: 1,
    name: "Essential Oversized T-Shirt",
    category: "T-Shirts",
    price: 1499,
    originalPrice: 1999,
    image: "/images/product-1.jpg",
    hoverImage: "/images/product-1-hover.jpg",
    badge: "Bestseller",
    href: "/product/essential-oversized-t-shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Deep Forest", "Black", "Ivory"],
    available: true,
    rating: 4.7,
    bestSelling: true,
    newest: true,
  },
  {
    id: 2,
    name: "Classic Relaxed Shirt",
    category: "Shirts",
    price: 2199,
    originalPrice: 2799,
    image: "/images/product-2.jpg",
    hoverImage: "/images/product-2-hover.jpg",
    badge: "New",
    href: "/product/classic-relaxed-shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory", "Sage Green"],
    available: true,
    rating: 4.5,
    bestSelling: false,
    newest: true,
  },
  {
    id: 3,
    name: "Modern Straight Trousers",
    category: "Trousers",
    price: 2499,
    originalPrice: 2999,
    image: "/images/product-3.jpg",
    hoverImage: "/images/product-3-hover.jpg",
    href: "/product/modern-straight-trousers",
    sizes: ["30", "32", "34", "36"],
    colors: ["Charcoal", "Deep Forest"],
    available: true,
    rating: 4.6,
    bestSelling: true,
    newest: false,
  },
  {
    id: 4,
    name: "Heritage Overshirt",
    category: "Outerwear",
    price: 3299,
    originalPrice: 3999,
    image: "/images/product-4.jpg",
    hoverImage: "/images/product-4-hover.jpg",
    badge: "Limited",
    href: "/product/heritage-overshirt",
    sizes: ["M", "L", "XL"],
    colors: ["Deep Forest", "Olive"],
    available: true,
    rating: 4.8,
    bestSelling: true,
    newest: false,
  },
];

const Shop = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);

  const filteredProducts = useMemo(() => {
    let products = [...demoProducts];

    if (filters.categories.length > 0) {
      products = products.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.sizes.length > 0) {
      products = products.filter((product) =>
        product.sizes?.some((size) => filters.sizes.includes(size))
      );
    }

    if (filters.colors.length > 0) {
      products = products.filter((product) =>
        product.colors?.some((color) => filters.colors.includes(color))
      );
    }

    products = products.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.availability === "in-stock") {
      products = products.filter((product) => product.available);
    }

    if (filters.availability === "out-of-stock") {
      products = products.filter((product) => !product.available);
    }

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
      products.sort((a, b) => Number(b.bestSelling) - Number(a.bestSelling));
    }

    if (sortBy === "newest") {
      products.sort((a, b) => Number(b.newest) - Number(a.newest));
    }

    return products;
  }, [filters, sortBy]);

  const handleToggleWishlist = (product) => {
    setWishlistItems((previous) =>
      previous.includes(product.id)
        ? previous.filter((id) => id !== product.id)
        : [...previous, product.id]
    );
  };

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(
      localStorage.getItem("blackCreedCart") || "[]"
    );

    const existingItem = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
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

    localStorage.setItem("blackCreedCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
          ]}
        />

        <div className="mt-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[#DCE2D8] pb-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
                Black Creed Collection
              </p>

              <h1 className="mt-2 text-3xl font-semibold text-[#12372A] sm:text-4xl">
                Shop All
              </h1>

              <p className="mt-2 max-w-xl text-sm text-[#68736A]">
                Discover timeless pieces designed for modern everyday living.
              </p>
            </div>

            <p className="text-sm text-[#68736A]">
              {filteredProducts.length} products
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
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

          <div className="mt-8 grid gap-8 lg:grid-cols-[250px_1fr]">
            <aside className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
              />
            </aside>

            <section>
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

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={setFilters}
      />
    </main>
  );
};

export default Shop;
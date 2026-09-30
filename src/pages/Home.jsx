import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductCarousel from "../components/home/ProductCarousel";
import BrandStory from "../components/home/BrandStory";
import CollectionBanner from "../components/home/CollectionBanner";
import EditorialSection from "../components/home/EditorialSection";

const featuredProducts = [
  {
    id: 1,
    name: "Classic Tailored Formal Shirt",
    category: "Formal Shirts",
    price: 2199,
    originalPrice: 2799,
    image: "/images/product-1.jpg",
    hoverImage: "/images/product-1-hover.jpg",
    badge: "Bestseller",
    href: "/product/classic-tailored-formal-shirt",
    colors: ["#F1F3EC", "#FFFFFF", "#12372A"],
  },
  {
    id: 2,
    name: "Relaxed Everyday Casual Shirt",
    category: "Casual Shirts",
    price: 1999,
    originalPrice: 2499,
    image: "/images/product-2.jpg",
    hoverImage: "/images/product-2-hover.jpg",
    badge: "New",
    href: "/product/relaxed-everyday-casual-shirt",
    colors: ["#12372A", "#68736A", "#B59A63"],
  },
  {
    id: 3,
    name: "Heritage Traditional Shirt",
    category: "Traditional Shirts",
    price: 2499,
    originalPrice: 2999,
    image: "/images/product-3.jpg",
    hoverImage: "/images/product-3-hover.jpg",
    href: "/product/heritage-traditional-shirt",
    colors: ["#FAF8F2", "#12372A"],
  },
  {
    id: 4,
    name: "Signature Modern Shirt",
    category: "Casual Shirts",
    price: 2299,
    originalPrice: 2799,
    image: "/images/product-4.jpg",
    hoverImage: "/images/product-4-hover.jpg",
    badge: "Limited",
    href: "/product/signature-modern-shirt",
    colors: ["#12372A", "#202923"],
  },
];

const Home = () => {
  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-[#FAF8F2]">
      {/* Hero */}
      <HeroSection
        eyebrow="BLACK CREED / MODERN HERITAGE"
        title="Wear Your Own Legacy"
        description="Timeless shirts designed for those who value individuality, confidence, and understated luxury."
        primaryAction={{
          label: "Shop Shirts",
          href: "/shop",
        }}
        secondaryAction={{
          label: "Explore Our Story",
          href: "/collections",
        }}
        backgroundImage="/images/hero-banner.jpg"
      />

      {/* Shirt Categories */}
      <CategoryGrid />

      {/* Featured Shirts */}
      <ProductCarousel
        title="Featured Shirts"
        subtitle="Refined silhouettes designed for every expression."
        products={featuredProducts}
        viewAllHref="/shop"
      />

      {/* Brand Story */}
      <BrandStory />

      {/* Collection Banner */}
      <CollectionBanner
        eyebrow="THE NEW SEASON"
        title="A New Chapter in Shirt Dressing"
        description="Discover carefully considered silhouettes, premium textures, and versatile shirts designed for the modern wardrobe."
        buttonLabel="Explore New Arrivals"
        buttonHref="/shop?sort=newest"
        image="/images/collection-banner.jpg"
      />

      {/* Editorial */}
      <EditorialSection />
    </main>
  );
};

export default Home;
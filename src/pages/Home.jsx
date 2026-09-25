import HeroSection from "../components/home/HeroSection";
import CategoryGrid from "../components/home/CategoryGrid";
import ProductCarousel from "../components/home/ProductCarousel";
import BrandStory from "../components/home/BrandStory";
import CollectionBanner from "../components/home/CollectionBanner";
import EditorialSection from "../components/home/EditorialSection";

const featuredProducts = [
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
    colors: ["#12372A", "#202923", "#FAF8F2"],
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
    colors: ["#F1F3EC", "#68736A"],
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
    colors: ["#202923", "#B59A63"],
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
    colors: ["#12372A", "#B59A63"],
  },
];

const Home = () => {
  return (
    <main className="min-h-screen min-w-0 overflow-x-hidden bg-[#FAF8F2]">
      {/* Hero */}
      <HeroSection
        eyebrow="BLACK CREED / MODERN HERITAGE"
        title="Wear Your Own Legacy"
        description="Timeless essentials designed for those who value individuality, confidence, and understated luxury."
        primaryAction={{
          label: "Shop Collection",
          href: "/shop",
        }}
        secondaryAction={{
          label: "Explore Our Story",
          href: "/collections",
        }}
        backgroundImage="/images/hero-banner.jpg"
      />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured Products */}
      <ProductCarousel
        title="Featured Pieces"
        subtitle="Everyday essentials with a refined edge."
        products={featuredProducts}
        viewAllHref="/shop"
      />

      {/* Brand Story */}
      <BrandStory />

      {/* Collection Banner */}
      <CollectionBanner
        eyebrow="THE NEW SEASON"
        title="A New Chapter in Everyday Dressing"
        description="Discover carefully considered silhouettes, premium textures, and versatile pieces."
        buttonLabel="Explore New Arrivals"
        buttonHref="/shop?collection=new-arrivals"
        image="/images/collection-banner.jpg"
      />

      {/* Editorial */}
      <EditorialSection />
    </main>
  );
};

export default Home;

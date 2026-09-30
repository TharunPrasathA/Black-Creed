import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import Button from "../components/common/Button";
import ProductGallery from "../components/product/ProductGallery";
import VariantSelector from "../components/product/VariantSelector";
import SizeGuide from "../components/product/SizeGuide";
import ProductAccordion from "../components/product/ProductAccordion";

const product = {
  id: 1,
  name: "Classic Tailored Formal Shirt",
  category: "Formal Shirts",
  price: 2199,
  originalPrice: 2799,
  description:
    "A refined formal shirt designed with a clean silhouette, premium feel, and understated Black Creed character.",
  images: [
    "/images/product-1.jpg",
    "/images/product-1-hover.jpg",
    "/images/product-1-detail.jpg",
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Ivory", value: "#FAF8F2" },
    { name: "Deep Forest", value: "#12372A" },
    { name: "Black", value: "#202923" },
  ],
  details: [
    {
      title: "Product Details",
      content:
        "Tailored shirt silhouette, premium fabric, structured collar, refined finishing, and durable stitching.",
    },
    {
      title: "Shipping & Delivery",
      content:
        "Orders are generally dispatched within 2–4 working days. Delivery timelines vary by location.",
    },
    {
      title: "Returns & Exchanges",
      content:
        "Eligible products can be returned or exchanged according to the Black Creed return policy.",
    },
  ],
};

const ProductDetails = () => {
  const { slug } = useParams();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem("blackCreedCart") || "[]",
    );

    const cartItem = {
      ...product,
      slug,
      quantity,
      size: selectedSize,
      color: selectedColor.name,
      image: product.images[0],
    };

    const existingItem = existingCart.find(
      (item) =>
        item.id === cartItem.id &&
        item.size === cartItem.size &&
        item.color === cartItem.color,
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === cartItem.id &&
        item.size === cartItem.size &&
        item.color === cartItem.color
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );
    } else {
      updatedCart = [...existingCart, cartItem];
    }

    localStorage.setItem("blackCreedCart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setAddedToCart(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: product.name, href: "#" },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ProductGallery images={product.images} />

          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
              {product.category}
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-[#12372A] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl font-semibold text-[#12372A]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>

              <span className="text-base text-[#68736A] line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>

              <span className="rounded-full bg-[#12372A] px-3 py-1 text-xs font-medium text-white">
                Sale
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-[#68736A]">
              {product.description}
            </p>

            <div className="my-8 h-px bg-[#DCE2D8]" />

            <VariantSelector
              sizes={product.sizes}
              colors={product.colors}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSizeChange={setSelectedSize}
              onColorChange={setSelectedColor}
            />

            <div className="mt-3">
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="text-sm font-medium text-[#12372A] underline underline-offset-4"
              >
                View Size Guide
              </button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-[#DCE2D8] bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((previous) => Math.max(1, previous - 1))
                  }
                  className="px-4 py-3 text-lg text-[#12372A]"
                >
                  −
                </button>

                <span className="min-w-8 text-center text-sm font-medium">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((previous) => Math.min(10, previous + 1))
                  }
                  className="px-4 py-3 text-lg text-[#12372A]"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-[#DCE2D8] bg-white text-[#12372A]"
                aria-label="Add to wishlist"
              >
                <Heart size={20} />
              </button>

              <div className="flex-1">
                <Button block size="lg" onClick={handleAddToCart}>
                  <ShoppingBag size={18} />
                  {addedToCart ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>
            </div>

            {addedToCart && (
              <div className="mt-4 rounded-lg bg-[#F1F3EC] p-4 text-sm text-[#12372A]">
                Shirt added to your cart.{" "}
                <Link
                  to="/cart"
                  className="font-semibold underline underline-offset-4"
                >
                  View Cart
                </Link>
              </div>
            )}

            <div className="mt-8">
              <ProductAccordion sections={product.details} />
            </div>
          </section>
        </div>
      </div>

      <SizeGuide
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />
    </main>
  );
};

export default ProductDetails;
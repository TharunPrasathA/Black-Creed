import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, ImageOff } from "lucide-react";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85";

const HeroSection = ({
  eyebrow = "THE MODERN HERITAGE COLLECTION",
  title = "Wear Your\nOwn Legacy.",
  description = "Timeless silhouettes, refined details, and everyday essentials designed for the modern individual.",
  primaryAction = {
    label: "Shop Collection",
    href: "/shop",
  },
  secondaryAction = {
    label: "Explore New Arrivals",
    href: "/shop?category=new-arrivals",
  },
  backgroundImage = DEFAULT_HERO_IMAGE,
}) => {
  const [imageError, setImageError] = useState(false);

  const imageSource = backgroundImage || DEFAULT_HERO_IMAGE;

  return (
    <section className="bc-hero">
      {/* Background Image */}
      {!imageError && (
        <img
          src={imageSource}
          alt="Black Creed fashion collection"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={() => setImageError(true)}
          className="bc-hero-image"
        />
      )}

      {/* Dark Overlay */}
      <div className="bc-hero-overlay" aria-hidden="true" />

      {/* Fallback Image Status */}
      {imageError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-[#0B261C]"
          aria-hidden="true"
        >
          <ImageOff size={42} strokeWidth={1} className="text-white/10" />
        </div>
      )}

      {/* Hero Content */}
      <div className="bc-container relative z-10">
        <div className="bc-hero-content">
          {/* Eyebrow */}
          <p className="bc-hero-eyebrow">{eyebrow}</p>

          {/* Heading */}
          <h1 className="bc-hero-title whitespace-pre-line">{title}</h1>

          {/* Description */}
          <p className="bc-hero-description">{description}</p>

          {/* Action Buttons */}
          <div className="bc-hero-actions">
            <Link
              to={primaryAction.href}
              className="bc-hero-primary-button group"
            >
              <span>{primaryAction.label}</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              to={secondaryAction.href}
              className="bc-hero-secondary-button group"
            >
              <span>{secondaryAction.label}</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Discover</span>

        <ChevronDown
          size={18}
          strokeWidth={1.5}
          aria-hidden="true"
          className="animate-bounce"
        />
      </div>
    </section>
  );
};

export default HeroSection;

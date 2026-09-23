import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";

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
  backgroundImage = "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=85",
}) => {
  return (
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#12372A] text-white">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Black Creed fashion collection"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0B261C]/95 via-[#12372A]/70 to-[#12372A]/20" />

      <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-6 py-20 sm:px-10 lg:px-12">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#D8C79F]">
            {eyebrow}
          </p>

          <h1 className="whitespace-pre-line text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-8xl">
            {title}
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to={primaryAction.href}
              className="group inline-flex items-center justify-center gap-3 bg-[#FAF8F2] px-6 py-4 text-sm font-semibold text-[#12372A] transition hover:bg-[#B59A63]"
            >
              {primaryAction.label}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              to={secondaryAction.href}
              className="group inline-flex items-center justify-center gap-3 border border-white/50 px-6 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-[#12372A]"
            >
              {secondaryAction.label}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">
          Discover
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
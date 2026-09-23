import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const BrandStory = ({
  eyebrow = "The Black Creed Philosophy",
  title = "Clothing with character. Designed for identity.",
  description = "Black Creed was created for individuals who value authenticity, thoughtful design, and timeless style. We believe clothing should not simply follow trends—it should become part of your story.",
  buttonLabel = "Discover Our Story",
  buttonHref = "/about",
  image = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
}) => {
  return (
    <section className="bg-[#F1F3EC] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt="Black Creed brand story"
            className="aspect-[0.95] w-full object-cover"
          />

          <div className="absolute bottom-5 left-5 bg-[#FAF8F2] px-5 py-4 text-[#12372A]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">
              Modern Heritage
            </p>
            <p className="mt-1 text-sm font-medium">
              Made for the individual
            </p>
          </div>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#B59A63]">
            {eyebrow}
          </p>

          <h2 className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#12372A] sm:text-5xl">
            {title}
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#68736A]">
            {description}
          </p>

          <Link
            to={buttonHref}
            className="group mt-8 inline-flex items-center gap-3 border-b border-[#12372A] pb-2 text-sm font-semibold text-[#12372A]"
          >
            {buttonLabel}
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
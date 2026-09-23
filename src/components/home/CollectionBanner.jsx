import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CollectionBanner = ({
  eyebrow = "THE AUTUMN EDIT",
  title = "A new season of understated confidence.",
  description = "Explore considered layers, versatile essentials, and refined everyday pieces.",
  buttonLabel = "Shop the Edit",
  buttonHref = "/collections/autumn-edit",
  image = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85",
}) => {
  return (
    <section className="bg-[#FAF8F2] px-6 py-10 sm:px-10 lg:px-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl overflow-hidden bg-[#12372A] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-7 py-12 text-white sm:px-12 sm:py-16 lg:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#D8C79F]">
            {eyebrow}
          </p>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h2>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
            {description}
          </p>

          <Link
            to={buttonHref}
            className="group mt-8 inline-flex w-fit items-center gap-3 bg-[#FAF8F2] px-6 py-4 text-sm font-semibold text-[#12372A] transition hover:bg-[#B59A63]"
          >
            {buttonLabel}
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </div>

        <div className="min-h-[360px] overflow-hidden lg:min-h-[520px]">
          <img
            src={image}
            alt="Black Creed seasonal collection"
            className="h-full w-full object-cover transition duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;
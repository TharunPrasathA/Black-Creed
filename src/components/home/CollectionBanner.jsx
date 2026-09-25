import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ImageOff } from "lucide-react";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85";

const CollectionBanner = ({
  eyebrow = "THE AUTUMN EDIT",
  title = "A new season of understated confidence.",
  description = "Explore considered layers, versatile essentials, and refined everyday pieces.",
  buttonLabel = "Shop the Edit",
  buttonHref = "/collections/autumn-edit",
  image = DEFAULT_IMAGE,
}) => {
  const [imageError, setImageError] = useState(false);

  const imageSource =
    typeof image === "string" && image.trim().length > 0
      ? image
      : DEFAULT_IMAGE;

  return (
    <section className="w-full bg-[#FAF8F2] py-8 sm:py-10 lg:py-16">
      <div className="bc-container">
        <div className="grid w-full min-w-0 overflow-hidden bg-[#12372A] lg:grid-cols-2">
          {/* Content */}
          <div className="flex min-w-0 flex-col justify-center px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 xl:px-16">
            <p className="bc-eyebrow mb-4 text-[#D6C49C]">{eyebrow}</p>

            <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base">
              {description}
            </p>

            <Link
              to={buttonHref}
              className="group relative z-10 mt-8 inline-flex min-h-12 w-fit items-center gap-3 bg-[#FAF8F2] px-5 py-3 text-sm font-semibold !text-[#12372A] no-underline opacity-100 transition-colors duration-300 hover:bg-[#B59A63] hover:!text-[#12372A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C49C] sm:px-6"
            >
              <span className="!text-[#12372A] opacity-100">{buttonLabel}</span>

              <ArrowUpRight
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
                className="!text-[#12372A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>

          {/* Image */}
          <div className="relative min-h-[300px] overflow-hidden bg-[#0B261C] sm:min-h-[400px] lg:min-h-[520px]">
            {imageError ? (
              <div className="flex h-full min-h-[300px] flex-col items-center justify-center bg-[#0B261C] px-6 text-center text-[#D6C49C] sm:min-h-[400px] lg:min-h-[520px]">
                <ImageOff size={36} strokeWidth={1.2} aria-hidden="true" />

                <p className="mt-3 text-sm">Collection image unavailable</p>
              </div>
            ) : (
              <img
                src={imageSource}
                alt="Black Creed seasonal collection"
                loading="lazy"
                decoding="async"
                onError={() => setImageError(true)}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionBanner;

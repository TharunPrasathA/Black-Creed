import { Link } from "react-router-dom";
import { ArrowUpRight, ImageOff } from "lucide-react";
import { useState } from "react";

const defaultEditorialItems = [
  {
    id: 1,
    title: "The Art of Everyday Dressing",
    category: "Style Journal",
    href: "/journal/everyday-dressing",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    title: "Building a Timeless Wardrobe",
    category: "Style Guide",
    href: "/journal/timeless-wardrobe",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    title: "Details Define the Difference",
    category: "Behind the Brand",
    href: "/journal/details-define",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=85",
  },
];

const EditorialCard = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="bc-journal-card group flex min-w-0 h-full flex-col">
      <Link
        to={item.href}
        aria-label={`Read ${item.title}`}
        className="relative block aspect-[1.15] w-full overflow-hidden bg-[#F1F3EC]"
      >
        {!imageLoaded && !imageError && (
          <div
            className="absolute inset-0 animate-pulse bg-[#DCE2D8]"
            aria-hidden="true"
          />
        )}

        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#E8EDE4] px-4 text-center text-[#68736A]">
            <ImageOff size={30} strokeWidth={1.3} aria-hidden="true" />
            <span className="mt-2 text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`!absolute !inset-0 !block !h-full !w-full !max-w-none !object-cover !object-center transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        <div
          className="pointer-events-none absolute inset-0 bg-[#0B261C]/10 transition-colors duration-300 group-hover:bg-[#0B261C]/30"
          aria-hidden="true"
        />

        <span className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F2] text-[#12372A] transition-colors duration-300 group-hover:bg-[#12372A] group-hover:text-white">
          <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
          {item.category}
        </p>

        <Link
          to={item.href}
          className="mt-2 block min-h-[3.5rem] text-xl font-semibold leading-snug text-[#12372A] transition-colors duration-300 hover:text-[#B59A63]"
        >
          {item.title}
        </Link>

        <Link
          to={item.href}
          className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#68736A] transition-colors duration-300 hover:text-[#12372A]"
        >
          <span>Read More</span>

          <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
};

const EditorialSection = ({
  title = "From the Journal",
  subtitle = "Ideas, inspiration, and stories behind the way we dress.",
  items = defaultEditorialItems,
}) => {
  return (
    <section className="bc-section bg-[#FAF8F2]">
      <div className="bc-section-inner">
        <div className="bc-section-header">
          <div className="bc-section-header-left">
            <p className="bc-eyebrow">Stories & inspiration</p>

            <h2 className="bc-section-title">{title}</h2>
          </div>

          <p className="bc-section-header-right bc-section-description">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
          {items.map((item) => (
            <EditorialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;

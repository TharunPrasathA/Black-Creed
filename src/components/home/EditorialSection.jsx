import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const defaultEditorialItems = [
  {
    id: 1,
    title: "The Art of Everyday Dressing",
    category: "Style Journal",
    href: "/journal/everyday-dressing",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    title: "Building a Timeless Wardrobe",
    category: "Style Guide",
    href: "/journal/timeless-wardrobe",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    title: "Details Define the Difference",
    category: "Behind the Brand",
    href: "/journal/details-define",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
  },
];

const EditorialSection = ({
  title = "From the Journal",
  subtitle = "Ideas, inspiration, and stories behind the way we dress.",
  items = defaultEditorialItems,
}) => {
  return (
    <section className="bg-white px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#B59A63]">
              Stories & inspiration
            </p>

            <h2 className="text-3xl font-semibold tracking-tight text-[#12372A] sm:text-4xl">
              {title}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#68736A]">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.id} className="group">
              <Link
                to={item.href}
                className="relative block aspect-[1.15] overflow-hidden bg-[#F1F3EC]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-[#0B261C]/10 transition group-hover:bg-[#0B261C]/30" />

                <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF8F2] text-[#12372A] transition group-hover:bg-[#12372A] group-hover:text-white">
                  <ArrowUpRight size={18} />
                </span>
              </Link>

              <div className="pt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
                  {item.category}
                </p>

                <Link
                  to={item.href}
                  className="mt-2 block text-xl font-semibold leading-snug text-[#12372A] transition hover:text-[#B59A63]"
                >
                  {item.title}
                </Link>

                <Link
                  to={item.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#68736A] hover:text-[#12372A]"
                >
                  Read More
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
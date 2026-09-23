import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";

const collections = [
  {
    title: "New Arrivals",
    description: "Fresh silhouettes and refined essentials for the new season.",
    image: "/images/collection-new-arrivals.jpg",
    href: "/shop?collection=new-arrivals",
  },
  {
    title: "Everyday Essentials",
    description: "Reliable wardrobe staples designed for everyday confidence.",
    image: "/images/collection-essentials.jpg",
    href: "/shop?collection=essentials",
  },
  {
    title: "Modern Heritage",
    description: "Timeless textures, earthy tones, and elevated everyday dressing.",
    image: "/images/collection-modern-heritage.jpg",
    href: "/shop?collection=modern-heritage",
  },
];

const Collections = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Collections", href: "/collections" },
          ]}
        />

        <div className="mx-auto mt-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
            Explore Black Creed
          </p>

          <h1 className="mt-3 text-4xl font-semibold text-[#12372A] sm:text-5xl">
            Our Collections
          </h1>

          <p className="mt-5 leading-relaxed text-[#68736A]">
            Thoughtfully designed clothing that balances contemporary
            silhouettes with timeless character.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              to={collection.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#F1F3EC]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-[#12372A]">
                  {collection.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#68736A]">
                  {collection.description}
                </p>

                <span className="mt-5 inline-block text-sm font-semibold text-[#12372A] underline underline-offset-4">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Collections;
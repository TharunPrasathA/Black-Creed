import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

const EmptyCart = ({
  title = "Your bag is waiting",
  description = "You haven't added anything to your bag yet. Explore our latest collection and find something made for you.",
  buttonLabel = "Explore Collection",
  buttonHref = "/shop",
}) => {
  return (
    <section className="flex min-h-[480px] items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F1F3EC] text-[#12372A]">
          <ShoppingBag size={34} strokeWidth={1.5} />
        </div>

        <h1 className="mt-7 text-3xl font-semibold tracking-tight text-[#12372A]">
          {title}
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#68736A]">
          {description}
        </p>

        <Link
          to={buttonHref}
          className="group mt-7 inline-flex items-center gap-3 bg-[#12372A] px-6 py-4 text-sm font-semibold !text-white transition hover:bg-[#0B261C]"
        >
          {buttonLabel}
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
};

export default EmptyCart;
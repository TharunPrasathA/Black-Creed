import React from "react";
import {
  Home,
  Search,
  ShoppingBag,
  Heart,
  UserRound,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function MobileBottomNav() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = JSON.parse(
          localStorage.getItem("blackCreedCart") || "[]"
        );

        const totalItems = storedCart.reduce(
          (total, item) => total + Number(item.quantity || 0),
          0
        );

        setCartCount(totalItems);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const navigationItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Shop",
      href: "/shop",
      icon: Search,
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
    },
    {
      label: "Account",
      href: "/account",
      icon: UserRound,
    },
  ];

  const navLinkClass = ({ isActive }) =>
    [
      "flex flex-1 flex-col items-center justify-center gap-1 py-2",
      "text-[10px] uppercase tracking-wide transition",
      isActive
        ? "text-[#12372A]"
        : "text-[#68736A]",
    ].join(" ");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#DCE2D8] bg-[#FAF8F2] lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === "/"}
              className={navLinkClass}
            >
              <Icon size={19} strokeWidth={1.5} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        <button
          type="button"
          onClick={() => navigate("/cart")}
          className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] uppercase tracking-wide text-[#68736A] transition hover:text-[#12372A]"
        >
          <ShoppingBag size={19} strokeWidth={1.5} />

          <span>Bag</span>

          {cartCount > 0 && (
            <span className="absolute right-5 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B59A63] px-1 text-[9px] font-semibold text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default MobileBottomNav;
import React from "react";
import { Home, Search, ShoppingBag, Heart, UserRound } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function MobileBottomNav() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = React.useState(0);

  React.useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = JSON.parse(
          localStorage.getItem("blackCreedCart") || "[]",
        );

        if (!Array.isArray(storedCart)) {
          setCartCount(0);
          return;
        }

        const totalItems = storedCart.reduce(
          (total, item) => total + Number(item.quantity || 0),
          0,
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
      "relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2",
      "text-[9px] uppercase tracking-[0.08em] transition-colors duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B59A63]",
      isActive ? "text-[#12372A]" : "text-[#68736A] hover:text-[#12372A]",
    ].join(" ");

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#DCE2D8] bg-[#FAF8F2]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex min-h-16 w-full max-w-lg items-stretch px-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === "/"}
              className={navLinkClass}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={19}
                    strokeWidth={isActive ? 2 : 1.5}
                    aria-hidden="true"
                  />

                  <span>{item.label}</span>

                  {isActive && (
                    <span className="absolute bottom-0 h-0.5 w-5 bg-[#B59A63]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Shopping Bag Button */}
        <button
          type="button"
          onClick={() => navigate("/cart")}
          aria-label={`Shopping bag with ${cartCount} items`}
          className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 py-2 text-[9px] uppercase tracking-[0.08em] text-[#68736A] transition-colors duration-300 hover:text-[#12372A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B59A63]"
        >
          <ShoppingBag size={19} strokeWidth={1.5} aria-hidden="true" />

          <span>Bag</span>

          {cartCount > 0 && (
            <span className="absolute right-[18%] top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B59A63] px-1 text-[9px] font-semibold leading-none text-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}

export default MobileBottomNav;

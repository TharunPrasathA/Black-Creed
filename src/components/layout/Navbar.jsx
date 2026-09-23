import React from "react";
import {
  Search,
  UserRound,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const navigationLinks = [
  {
    label: "Shop",
    href: "/shop",
  },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "New Arrivals",
    href: "/shop?sort=newest",
  },
];

function Navbar() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
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

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(`/shop?search=${encodeURIComponent(trimmedQuery)}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    [
      "relative text-xs font-medium uppercase tracking-[0.12em]",
      "transition-colors duration-300",
      isActive
        ? "text-[#12372A]"
        : "text-[#68736A] hover:text-[#12372A]",
    ].join(" ");

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#DCE2D8] bg-[#FAF8F2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 text-[#12372A] lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 text-center lg:static lg:translate-x-0"
            onClick={closeMobileMenu}
          >
            <span className="block font-serif text-2xl tracking-[0.12em] text-[#12372A] sm:text-3xl">
              BLACK CREED
            </span>

            <span className="hidden text-[8px] uppercase tracking-[0.35em] text-[#B59A63] sm:block">
              Modern Heritage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="ml-12 hidden items-center gap-8 lg:flex">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={navLinkClass}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsSearchOpen((previous) => !previous)}
              aria-label="Open search"
              className="p-2 text-[#12372A] transition hover:text-[#B59A63]"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link
              to="/account"
              aria-label="Account"
              className="hidden p-2 text-[#12372A] transition hover:text-[#B59A63] sm:block"
            >
              <UserRound size={20} strokeWidth={1.5} />
            </Link>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden p-2 text-[#12372A] transition hover:text-[#B59A63] sm:block"
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            <Link
              to="/cart"
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-2 text-[#12372A] transition hover:text-[#B59A63]"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B59A63] px-1 text-[9px] font-semibold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Panel */}
        {isSearchOpen && (
          <div className="border-t border-[#DCE2D8] bg-[#F1F3EC] px-5 py-5 sm:px-8 lg:px-12">
            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto flex max-w-3xl items-center gap-3"
            >
              <Search
                size={20}
                className="shrink-0 text-[#68736A]"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search shirts, trousers, collections..."
                autoFocus
                className="min-w-0 flex-1 border-b border-[#B59A63] bg-transparent py-2 text-sm text-[#202923] outline-none placeholder:text-[#68736A]"
              />

              <button
                type="submit"
                className="bg-[#12372A] px-4 py-2 text-xs uppercase tracking-wider text-white transition hover:bg-[#0B261C]"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="p-2 text-[#68736A] hover:text-[#12372A]"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#12372A]/60 lg:hidden">
          <aside className="h-full w-[85%] max-w-sm bg-[#FAF8F2] p-6 shadow-2xl">
            <div className="mb-10 flex items-center justify-between border-b border-[#DCE2D8] pb-5">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="font-serif text-xl tracking-[0.1em] text-[#12372A]"
              >
                BLACK CREED
              </Link>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation menu"
                className="p-2 text-[#12372A]"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    [
                      "flex items-center justify-between border-b border-[#DCE2D8] pb-4",
                      "text-sm uppercase tracking-[0.12em]",
                      isActive
                        ? "text-[#12372A]"
                        : "text-[#68736A]",
                    ].join(" ")
                  }
                >
                  {link.label}
                  <ChevronDown size={16} className="-rotate-90" />
                </NavLink>
              ))}

              <NavLink
                to="/account"
                onClick={closeMobileMenu}
                className="border-b border-[#DCE2D8] pb-4 text-sm uppercase tracking-[0.12em] text-[#68736A]"
              >
                Account
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={closeMobileMenu}
                className="border-b border-[#DCE2D8] pb-4 text-sm uppercase tracking-[0.12em] text-[#68736A]"
              >
                Wishlist
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className="border-b border-[#DCE2D8] pb-4 text-sm uppercase tracking-[0.12em] text-[#68736A]"
              >
                Shopping Bag
              </NavLink>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;
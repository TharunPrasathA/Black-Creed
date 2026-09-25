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

  /*
   * Update cart count whenever cart data changes.
   */
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

  /*
   * Prevent background page scrolling when mobile menu is open.
   */
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  /*
   * Close mobile menu or search panel using Escape key.
   */
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen((previous) => !previous);
  };

  const navLinkClass = ({ isActive }) =>
    [
      "relative text-xs font-medium uppercase tracking-[0.12em]",
      "transition-colors duration-300",
      "after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-[#B59A63]",
      "after:transition-all after:duration-300",
      isActive
        ? "text-[#12372A] after:w-full"
        : "text-[#68736A] after:w-0 hover:text-[#12372A] hover:after:w-full",
    ].join(" ");

  const mobileNavLinkClass = ({ isActive }) =>
    [
      "flex min-h-12 items-center justify-between border-b border-[#DCE2D8]",
      "text-sm uppercase tracking-[0.12em] transition-colors duration-300",
      isActive ? "text-[#12372A]" : "text-[#68736A] hover:text-[#12372A]",
    ].join(" ");

  return (
    <>
      {/* Main Navbar */}
      <header className="bc-navbar sticky top-0 z-50 border-b border-[#DCE2D8] bg-[#FAF8F2]/95 backdrop-blur-md">
        <div className="bc-navbar-container mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-10 xl:px-12">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={openMobileMenu}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] lg:hidden"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="absolute left-1/2 -translate-x-1/2 text-center lg:static lg:translate-x-0"
            aria-label="Black Creed home"
          >
            <span className="block whitespace-nowrap font-serif text-xl tracking-[0.1em] text-[#12372A] sm:text-2xl lg:text-3xl">
              BLACK CREED
            </span>

            <span className="hidden text-[8px] uppercase tracking-[0.35em] text-[#B59A63] sm:block">
              Modern Heritage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary navigation"
            className="ml-10 hidden items-center gap-7 lg:flex xl:ml-14 xl:gap-9"
          >
            {navigationLinks.map((link) => (
              <NavLink key={link.label} to={link.href} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:gap-2">
            <button
              type="button"
              onClick={toggleSearch}
              aria-label={isSearchOpen ? "Close search" : "Open search"}
              aria-expanded={isSearchOpen}
              className="flex h-10 w-10 items-center justify-center text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
            >
              {isSearchOpen ? (
                <X size={20} strokeWidth={1.5} />
              ) : (
                <Search size={20} strokeWidth={1.5} />
              )}
            </button>

            <Link
              to="/account"
              aria-label="Account"
              className="hidden h-10 w-10 items-center justify-center text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] sm:flex"
            >
              <UserRound size={20} strokeWidth={1.5} />
            </Link>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hidden h-10 w-10 items-center justify-center text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] sm:flex"
            >
              <Heart size={20} strokeWidth={1.5} />
            </Link>

            <Link
              to="/cart"
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative flex h-10 w-10 items-center justify-center text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#B59A63] px-1 text-[9px] font-semibold leading-none text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Panel */}
        {isSearchOpen && (
          <div className="border-t border-[#DCE2D8] bg-[#F1F3EC] px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
            <form
              onSubmit={handleSearchSubmit}
              className="mx-auto flex w-full max-w-3xl items-center gap-2 sm:gap-3"
            >
              <Search
                size={19}
                strokeWidth={1.5}
                className="shrink-0 text-[#68736A]"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search shirts, trousers, collections..."
                aria-label="Search products"
                autoFocus
                className="bc-input min-w-0 flex-1 border-0 border-b border-[#B59A63] bg-transparent px-0 py-2 text-sm text-[#202923] outline-none placeholder:text-[#68736A]"
              />

              <button
                type="submit"
                className="hidden shrink-0 bg-[#12372A] px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#0B261C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] sm:block"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
                className="flex h-9 w-9 shrink-0 items-center justify-center text-[#68736A] transition-colors duration-300 hover:text-[#12372A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </form>

            <button
              type="button"
              onClick={handleSearchSubmit}
              disabled={!searchQuery.trim()}
              className="mx-auto mt-3 block w-full max-w-3xl bg-[#12372A] px-4 py-2.5 text-[10px] uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:bg-[#0B261C] disabled:cursor-not-allowed disabled:opacity-40 sm:hidden"
            >
              Search Products
            </button>
          </div>
        )}
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#12372A]/60 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          onClick={closeMobileMenu}
        >
          <aside
            className="flex h-full w-[88%] max-w-sm flex-col overflow-y-auto bg-[#FAF8F2] p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Mobile Drawer Header */}
            <div className="mb-8 flex items-center justify-between border-b border-[#DCE2D8] pb-5">
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
                className="flex h-10 w-10 items-center justify-center text-[#12372A] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={closeMobileMenu}
                  className={mobileNavLinkClass}
                >
                  <span>{link.label}</span>

                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    className="-rotate-90"
                  />
                </NavLink>
              ))}

              <NavLink
                to="/account"
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                <span>Account</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className="-rotate-90"
                />
              </NavLink>

              <NavLink
                to="/wishlist"
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                <span>Wishlist</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className="-rotate-90"
                />
              </NavLink>

              <NavLink
                to="/cart"
                onClick={closeMobileMenu}
                className={mobileNavLinkClass}
              >
                <span>Shopping Bag</span>
                <ChevronDown
                  size={16}
                  strokeWidth={1.5}
                  className="-rotate-90"
                />
              </NavLink>
            </nav>

            {/* Mobile Drawer Footer */}
            <div className="mt-auto border-t border-[#DCE2D8] pt-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#B59A63]">
                Modern Heritage
              </p>

              <p className="mt-2 max-w-xs text-sm leading-6 text-[#68736A]">
                Refined essentials shaped for everyday expression.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;

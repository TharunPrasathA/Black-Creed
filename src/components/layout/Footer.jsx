import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";

const footerLinks = {
  Shop: [
    {
      label: "All Products",
      href: "/shop",
    },
    {
      label: "New Arrivals",
      href: "/shop?sort=newest",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    {
      label: "Best Sellers",
      href: "/shop?sort=popular",
    },
  ],

  Help: [
    {
      label: "Contact Us",
      href: "/contact",
    },
    {
      label: "Shipping Information",
      href: "/shipping",
    },
    {
      label: "Returns & Exchanges",
      href: "/returns",
    },
    {
      label: "Size Guide",
      href: "/size-guide",
    },
  ],

  Company: [
    {
      label: "Our Story",
      href: "/about",
    },
    {
      label: "Journal",
      href: "/journal",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
  ],
};

function Footer() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();

    setMessage("");
    setIsSuccess(false);

    if (!trimmedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setMessage("Thank you for joining the Creed.");
    setIsSuccess(true);
    setEmail("");
  };

  return (
    <footer className="bc-footer-section">
      {/* Newsletter Section */}
      <section className="bc-footer-newsletter border-b border-white/15">
        <div className="bc-container bc-footer-newsletter-inner">
          {/* Newsletter Content */}
          <div className="min-w-0">
            <p className="bc-eyebrow mb-3 text-[#B59A63]">Stay Connected</p>

            <h2 className="bc-footer-title">Join the Creed.</h2>

            <p className="bc-footer-description mt-4 sm:mt-5">
              Receive early access to new collections, stories, and considered
              essentials.
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="w-full min-w-0">
            <form onSubmit={handleNewsletterSubmit} className="bc-footer-form">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>

              <input
                id="newsletter-email"
                name="newsletterEmail"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                  setIsSuccess(false);
                }}
                placeholder="Your email address"
                autoComplete="email"
                className="bc-footer-input"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="group flex shrink-0 items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#FAF8F2] transition-colors duration-300 hover:text-[#B59A63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63] sm:gap-2 sm:text-xs sm:tracking-[0.12em]"
              >
                <span>Subscribe</span>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </form>

            {message && (
              <p
                className={`mt-3 text-xs ${
                  isSuccess ? "text-[#D6C49C]" : "text-[#F4C7C3]"
                }`}
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <section className="bc-footer-main">
        <div className="bc-container grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand Information */}
          <div className="min-w-0 lg:col-span-2">
            <Link
              to="/"
              className="inline-block font-serif text-2xl tracking-[0.12em] transition-colors duration-300 hover:text-[#D6C49C] sm:text-3xl"
            >
              BLACK CREED
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#DCE2D8] sm:mt-5 sm:leading-7">
              Refined essentials shaped by modern heritage. Designed for
              everyday expression.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2D8]/50 text-[#FAF8F2] transition-colors duration-300 hover:border-[#B59A63] hover:bg-[#B59A63] hover:text-[#12372A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ◎
                </span>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2D8]/50 text-sm font-bold text-[#FAF8F2] transition-colors duration-300 hover:border-[#B59A63] hover:bg-[#B59A63] hover:text-[#12372A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
              >
                <span aria-hidden="true">f</span>
              </a>

              <a
                href="mailto:hello@blackcreed.com"
                aria-label="Email Black Creed"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2D8]/50 text-[#FAF8F2] transition-colors duration-300 hover:border-[#B59A63] hover:bg-[#B59A63] hover:text-[#12372A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
              >
                <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Footer Link Groups */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="min-w-0">
              <h3 className="mb-4 text-[10px] uppercase tracking-[0.16em] text-[#B59A63] sm:mb-5 sm:text-xs">
                {heading}
              </h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="inline-block text-sm leading-6 text-[#DCE2D8] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B59A63]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Copyright */}
      <div className="bc-footer-bottom">
        <div className="bc-container flex flex-col gap-2 py-5 text-xs text-[#DCE2D8] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Black Creed. All rights reserved.</p>

          <p>Made for everyday expression.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

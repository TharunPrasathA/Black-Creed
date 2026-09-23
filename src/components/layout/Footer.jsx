import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Collections", href: "/collections" },
    { label: "Best Sellers", href: "/shop?sort=popular" },
  ],

  Help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Information", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
  ],

  Company: [
    { label: "Our Story", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

function Footer() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleNewsletterSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Thank you for joining the Creed.");
    setEmail("");
  };

  return (
    <footer className="bg-[#12372A] text-[#FAF8F2]">
      {/* Newsletter Section */}
      <div className="border-b border-white/15 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B59A63]">
              Stay Connected
            </p>

            <h2 className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
              Join the Creed.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[#DCE2D8]">
              Receive early access to new collections, stories, and
              considered essentials.
            </p>
          </div>

          <div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex border-b border-[#B59A63] pb-3"
            >
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#DCE2D8]/70"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#FAF8F2] transition hover:text-[#B59A63]"
              >
                Subscribe
                <ArrowUpRight size={16} />
              </button>
            </form>

            {message && (
              <p className="mt-3 text-xs text-[#B59A63]">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-serif text-3xl tracking-[0.12em]"
            >
              BLACK CREED
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-[#DCE2D8]">
              Refined essentials shaped by modern heritage.
              Designed for everyday expression.
            </p>

            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2D8] text-sm font-semibold text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
              >
                ◎
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE2D8] text-sm font-bold text-[#12372A] transition hover:bg-[#12372A] hover:text-white"
              >
                f
              </a>
              <a
                href="mailto:hello@blackcreed.com"
                aria-label="Email Black Creed"
                className="transition hover:text-[#B59A63]"
              >
                <Mail size={19} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Footer Link Groups */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="mb-5 text-xs uppercase tracking-[0.16em] text-[#B59A63]">
                {heading}
              </h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-[#DCE2D8] transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/15 px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-2 text-xs text-[#DCE2D8] sm:flex-row">
          <p>
            © {new Date().getFullYear()} Black Creed. All rights reserved.
          </p>

          <p>Made for everyday expression.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
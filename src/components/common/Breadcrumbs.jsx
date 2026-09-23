import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

function Breadcrumbs({
  items = [],
  className = "",
  showHomeIcon = true,
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[
        "flex flex-wrap items-center gap-2 text-xs",
        "tracking-wide text-[#68736A]",
        className,
      ].join(" ")}
    >
      <Link
        to="/"
        className="inline-flex items-center gap-1 transition hover:text-[#12372A]"
      >
        {showHomeIcon && <Home size={14} />}
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={`${item.label}-${index}`}>
            <ChevronRight size={14} className="text-[#B59A63]" />

            {isLast || !item.href ? (
              <span
                className={
                  isLast
                    ? "font-medium text-[#202923]"
                    : "text-[#68736A]"
                }
                aria-current={isLast ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="transition hover:text-[#12372A]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
import React from "react";
import { Loader2 } from "lucide-react";

const variantStyles = {
  primary:
    "bg-[#12372A] text-white hover:bg-[#0B261C] focus:ring-[#12372A]",

  secondary:
    "bg-[#F1F3EC] text-[#12372A] hover:bg-[#DCE2D8] focus:ring-[#12372A]",

  outline:
    "border border-[#12372A] bg-transparent text-[#12372A] hover:bg-[#12372A] hover:text-white focus:ring-[#12372A]",

  gold:
    "bg-[#B59A63] text-white hover:bg-[#987D49] focus:ring-[#B59A63]",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

  ghost:
    "bg-transparent text-[#202923] hover:bg-[#F1F3EC] focus:ring-[#12372A]",
};

const sizeStyles = {
  sm: "px-3 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-sm",
  xl: "px-8 py-5 text-base",
};

function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
  ...props
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2",
        "rounded-none font-medium tracking-[0.08em]",
        "uppercase transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {loading && <Loader2 size={17} className="animate-spin" />}

      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck } from "lucide-react";

const formatPrice = (price) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

const CartSummary = ({
  subtotal = 0,
  shipping = 0,
  discount = 0,
  tax = 0,
  checkoutHref = "/checkout",
  showCheckoutButton = true,
}) => {
  const total = subtotal + shipping + tax - discount;

  return (
    <div className="bg-[#F1F3EC] p-5 sm:p-6">
      <h2 className="text-xl font-semibold text-[#12372A]">
        Order Summary
      </h2>

      <div className="mt-6 space-y-4 border-b border-[#DCE2D8] pb-5">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-[#68736A]">Subtotal</span>
          <span className="font-medium text-[#202923]">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-[#68736A]">Shipping</span>

          <span className="font-medium text-[#202923]">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-[#68736A]">Tax</span>
            <span className="font-medium text-[#202923]">
              {formatPrice(tax)}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-[#68736A]">Discount</span>
            <span className="font-medium text-green-700">
              -{formatPrice(discount)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 py-5">
        <span className="font-semibold text-[#12372A]">Total</span>

        <span className="text-xl font-semibold text-[#12372A]">
          {formatPrice(total)}
        </span>
      </div>

      {showCheckoutButton && (
        <Link
          to={checkoutHref}
          className="group flex w-full items-center justify-center gap-3 bg-[#12372A] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0B261C]"
        >
          Proceed to Checkout
          <ArrowRight
            size={18}
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      )}

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-xs text-[#68736A]">
          <Truck size={17} className="shrink-0 text-[#12372A]" />
          Complimentary shipping above ₹2,999
        </div>

        <div className="flex items-center gap-3 text-xs text-[#68736A]">
          <ShieldCheck size={17} className="shrink-0 text-[#12372A]" />
          Secure and encrypted checkout
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
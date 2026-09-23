import { Package, ShieldCheck, Truck } from "lucide-react";

const formatPrice = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const OrderSummary = ({
  items = [],
  subtotal = 0,
  shipping = 0,
  discount = 0,
  tax = 0,
  total,
  showBenefits = true,
}) => {
  const calculatedTotal =
    total ??
    Math.max(0, subtotal + shipping + tax - discount);

  return (
    <div className="rounded-2xl border border-[#DCE2D8] bg-white p-5 sm:p-6">
      <h2 className="mb-5 text-lg font-semibold text-[#12372A]">
        Order Summary
      </h2>

      <div className="mb-5 space-y-4">
        {items.map((item) => (
          <div
            key={`${item.id}-${item.size || ""}-${item.color || ""}`}
            className="flex gap-3"
          >
            <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F1F3EC]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-[#68736A]">
                  No Image
                </div>
              )}

              <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#12372A] px-1 text-[10px] text-white">
                {item.quantity}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-medium text-[#202923]">
                {item.name}
              </h3>

              {(item.size || item.color) && (
                <p className="mt-1 text-xs text-[#68736A]">
                  {item.size && `Size: ${item.size}`}
                  {item.size && item.color && " · "}
                  {item.color && `Color: ${item.color}`}
                </p>
              )}

              <p className="mt-2 text-sm font-semibold text-[#12372A]">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[#DCE2D8] pt-4">
        <div className="flex justify-between py-2 text-sm text-[#68736A]">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between py-2 text-sm text-[#68736A]">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="font-medium text-[#12372A]">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between py-2 text-sm text-green-700">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        {tax > 0 && (
          <div className="flex justify-between py-2 text-sm text-[#68736A]">
            <span>Tax</span>
            <span>{formatPrice(tax)}</span>
          </div>
        )}

        <div className="mt-3 flex justify-between border-t border-[#DCE2D8] pt-4 text-base font-semibold text-[#12372A]">
          <span>Total</span>
          <span>{formatPrice(calculatedTotal)}</span>
        </div>
      </div>

      {showBenefits && (
        <div className="mt-6 space-y-3 rounded-xl bg-[#F1F3EC] p-4">
          <div className="flex items-center gap-3 text-xs text-[#12372A]">
            <Truck size={17} />
            <span>Reliable delivery across India</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#12372A]">
            <ShieldCheck size={17} />
            <span>Secure checkout and payment</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#12372A]">
            <Package size={17} />
            <span>Carefully packed Black Creed orders</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
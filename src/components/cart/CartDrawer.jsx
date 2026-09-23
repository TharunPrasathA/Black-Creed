import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import Drawer from "../common/Drawer";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartDrawer = ({
  isOpen,
  onClose,
  items = [],
  onUpdateQuantity,
  onRemove,
}) => {
  const subtotal = items.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      size="lg"
      title="Your Bag"
    >
      <div className="flex h-full flex-col">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
            <ShoppingBag size={48} className="text-[#9AA39B]" />

            <h3 className="mt-5 text-xl font-semibold text-[#12372A]">
              Your bag is empty
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-[#68736A]">
              Discover timeless essentials and add your favorite pieces to
              your bag.
            </p>

            <Link
              to="/shop"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 bg-[#12372A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0B261C]"
            >
              Start Shopping
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto pr-1">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                  compact
                />
              ))}
            </div>

            <div className="mt-6 border-t border-[#DCE2D8] pt-5">
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                checkoutHref="/checkout"
              />

              <Link
                to="/cart"
                onClick={onClose}
                className="mt-3 flex w-full items-center justify-center gap-2 border border-[#12372A] px-5 py-3 text-sm font-semibold text-[#12372A] transition hover:bg-white"
              >
                View Full Cart
                <ArrowRight size={17} />
              </Link>
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
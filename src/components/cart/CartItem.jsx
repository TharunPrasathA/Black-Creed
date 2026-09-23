import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const formatPrice = (price) => {
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
  compact = false,
}) => {
  if (!item) return null;

  const itemTotal = Number(item.price) * Number(item.quantity);

  return (
    <article
      className={`flex gap-4 border-b border-[#DCE2D8] pb-5 ${
        compact ? "last:border-b-0" : ""
      }`}
    >
      <Link
        to={item.href || `/product/${item.id}`}
        className={`block shrink-0 overflow-hidden bg-[#F1F3EC] ${
          compact ? "h-20 w-20" : "h-28 w-24 sm:h-32 sm:w-28"
        }`}
      >
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              to={item.href || `/product/${item.id}`}
              className="line-clamp-2 text-sm font-semibold text-[#12372A] hover:text-[#B59A63]"
            >
              {item.name}
            </Link>

            {item.category && (
              <p className="mt-1 text-xs text-[#68736A]">
                {item.category}
              </p>
            )}

            {item.size && (
              <p className="mt-1 text-xs text-[#68736A]">
                Size: {item.size}
              </p>
            )}

            {item.color && (
              <p className="mt-1 text-xs text-[#68736A]">
                Color: {item.color}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => onRemove?.(item)}
            aria-label={`Remove ${item.name}`}
            className="shrink-0 text-[#68736A] transition hover:text-red-600"
          >
            <Trash2 size={17} />
          </button>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
          <div className="flex items-center border border-[#DCE2D8]">
            <button
              type="button"
              onClick={() =>
                onUpdateQuantity?.(item, Math.max(1, item.quantity - 1))
              }
              disabled={item.quantity <= 1}
              aria-label="Decrease quantity"
              className="flex h-8 w-8 items-center justify-center text-[#12372A] transition hover:bg-[#F1F3EC] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Minus size={13} />
            </button>

            <span className="flex h-8 min-w-8 items-center justify-center text-xs font-semibold text-[#12372A]">
              {item.quantity}
            </span>

            <button
              type="button"
              onClick={() =>
                onUpdateQuantity?.(
                  item,
                  Math.min(item.maxQuantity || 10, item.quantity + 1)
                )
              }
              disabled={item.quantity >= (item.maxQuantity || 10)}
              aria-label="Increase quantity"
              className="flex h-8 w-8 items-center justify-center text-[#12372A] transition hover:bg-[#F1F3EC] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <Plus size={13} />
            </button>
          </div>

          <p className="text-sm font-semibold text-[#12372A]">
            {formatPrice(itemTotal)}
          </p>
        </div>
      </div>
    </article>
  );
};

export default CartItem;
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("blackCreedCart") || "[]"
    );

    setItems(savedCart);
  }, []);

  const updateCartStorage = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem(
      "blackCreedCart",
      JSON.stringify(updatedItems)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUpdateQuantity = (item, quantity) => {
    const updatedItems = items.map((cartItem) =>
      cartItem.id === item.id &&
      cartItem.size === item.size &&
      cartItem.color === item.color
        ? { ...cartItem, quantity }
        : cartItem
    );

    updateCartStorage(updatedItems);
  };

  const handleRemove = (item) => {
    const updatedItems = items.filter(
      (cartItem) =>
        !(
          cartItem.id === item.id &&
          cartItem.size === item.size &&
          cartItem.color === item.color
        )
    );

    updateCartStorage(updatedItems);
  };

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Cart", href: "/cart" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-[#12372A] sm:text-4xl">
            Your Cart
          </h1>

          <p className="mt-2 text-sm text-[#68736A]">
            Review your selected pieces before checkout.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemove}
              />
            ))}

            <Link
              to="/shop"
              className="inline-block pt-3 text-sm font-semibold text-[#12372A] underline underline-offset-4"
            >
              Continue Shopping
            </Link>
          </section>

          <aside>
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              discount={0}
              tax={0}
              checkoutHref="/checkout"
            />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
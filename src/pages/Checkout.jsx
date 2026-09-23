import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import AddressForm from "../components/checkout/AddressForm";
import PaymentMethod from "../components/checkout/PaymentMethod";
import OrderSummary from "../components/checkout/OrderSummary";
import EmptyCart from "../components/cart/EmptyCart";

const Checkout = () => {
  const [items, setItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("blackCreedCart") || "[]"
    );

    setItems(savedCart);
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  const shipping = subtotal >= 2999 ? 0 : 99;

  const handleAddressSubmit = (submittedAddress) => {
    setAddress(submittedAddress);
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (selectedPaymentMethod) => {
    setPaymentMethod(selectedPaymentMethod);

    // Backend and Razorpay integration will be added later.
    console.log({
      items,
      address,
      paymentMethod: selectedPaymentMethod,
      subtotal,
      shipping,
    });

    setCurrentStep(3);
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs
          items={[
            { label: "Cart", href: "/cart" },
            { label: "Checkout", href: "/checkout" },
          ]}
        />

        <div className="mt-8">
          <h1 className="text-3xl font-semibold text-[#12372A] sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-[#68736A]">
            Complete your order securely.
          </p>
        </div>

        <div className="mt-8">
          <CheckoutSteps currentStep={currentStep} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            {currentStep === 1 && (
              <AddressForm onSubmit={handleAddressSubmit} />
            )}

            {currentStep === 2 && (
              <div>
                <PaymentMethod
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  onSubmit={handlePaymentSubmit}
                  submitLabel="Confirm Order"
                />

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="mt-4 text-sm font-medium text-[#12372A] underline underline-offset-4"
                >
                  Back to Address
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="py-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#12372A] text-2xl text-white">
                  ✓
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-[#12372A]">
                  Order Confirmed
                </h2>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#68736A]">
                  Thank you for shopping with Black Creed. Your order
                  confirmation will be available after backend integration.
                </p>

                <Link
                  to="/shop"
                  className="mt-6 inline-block rounded-lg bg-[#12372A] px-6 py-3 text-sm font-semibold text-white"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </section>

          <aside>
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shipping={shipping}
              discount={0}
              tax={0}
            />
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
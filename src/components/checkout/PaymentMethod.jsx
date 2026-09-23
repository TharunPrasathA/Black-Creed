import { useState } from "react";
import {
  Banknote,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";
import Button from "../common/Button";

const paymentOptions = [
  {
    id: "razorpay",
    label: "UPI / Cards / Net Banking",
    description: "Pay securely using Razorpay",
    icon: CreditCard,
  },
  {
    id: "upi",
    label: "UPI",
    description: "Google Pay, PhonePe, Paytm and more",
    icon: Smartphone,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: Banknote,
  },
  {
    id: "wallet",
    label: "Wallets",
    description: "Use supported digital wallets",
    icon: Wallet,
  },
];

const PaymentMethod = ({
  value = "razorpay",
  onChange,
  onSubmit,
  submitLabel = "Continue",
  loading = false,
  showTitle = true,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(value);

  const handleChange = (methodId) => {
    setSelectedMethod(methodId);
    onChange?.(methodId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(selectedMethod);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showTitle && (
        <div>
          <h2 className="text-lg font-semibold text-[#12372A]">
            Payment Method
          </h2>

          <p className="mt-1 text-sm text-[#68736A]">
            Choose your preferred payment method.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {paymentOptions.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                isSelected
                  ? "border-[#12372A] bg-[#F1F3EC]"
                  : "border-[#DCE2D8] bg-white hover:border-[#12372A]/40"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={isSelected}
                onChange={() => handleChange(method.id)}
                className="h-4 w-4 accent-[#12372A]"
              />

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
                  isSelected
                    ? "bg-[#12372A] text-white"
                    : "bg-[#F1F3EC] text-[#12372A]"
                }`}
              >
                <Icon size={21} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#202923]">
                  {method.label}
                </p>

                <p className="mt-1 text-xs text-[#68736A]">
                  {method.description}
                </p>
              </div>
            </label>
          );
        })}
      </div>

      {selectedMethod === "cod" && (
        <div className="rounded-lg border border-[#DCE2D8] bg-[#F1F3EC] p-4 text-sm text-[#12372A]">
          Cash on Delivery may be available only for eligible locations
          and orders.
        </div>
      )}

      {selectedMethod === "razorpay" && (
        <div className="rounded-lg border border-[#DCE2D8] bg-[#FAF8F2] p-4 text-xs leading-relaxed text-[#68736A]">
          You will be redirected to the secure Razorpay checkout interface
          after confirming your order.
        </div>
      )}

      <Button
        type="submit"
        submit
        block
        size="lg"
        loading={loading}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default PaymentMethod;
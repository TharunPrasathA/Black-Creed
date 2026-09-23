import { Check } from "lucide-react";

const CheckoutSteps = ({
  currentStep = 1,
  steps = [
    { id: 1, label: "Address" },
    { id: 2, label: "Payment" },
    { id: 3, label: "Confirmation" },
  ],
}) => {
  return (
    <div className="mb-8 w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition ${
                    isCompleted
                      ? "border-[#12372A] bg-[#12372A] text-white"
                      : isActive
                      ? "border-[#12372A] bg-[#F1F3EC] text-[#12372A]"
                      : "border-[#DCE2D8] bg-white text-[#68736A]"
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : step.id}
                </div>

                <span
                  className={`mt-2 text-xs font-medium sm:text-sm ${
                    isActive || isCompleted
                      ? "text-[#12372A]"
                      : "text-[#68736A]"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`mx-2 mb-6 h-0.5 flex-1 sm:mx-4 ${
                    currentStep > step.id
                      ? "bg-[#12372A]"
                      : "bg-[#DCE2D8]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutSteps;
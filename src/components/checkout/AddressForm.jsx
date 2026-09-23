import { useState } from "react";
import { MapPin } from "lucide-react";
import Button from "../common/Button";

const initialAddress = {
  fullName: "",
  phone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
  addressType: "Home",
};

const AddressForm = ({
  initialValues = {},
  onSubmit,
  submitLabel = "Continue to Payment",
  showTitle = true,
}) => {
  const [formData, setFormData] = useState({
    ...initialAddress,
    ...initialValues,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "fullName",
      "phone",
      "email",
      "addressLine1",
      "city",
      "state",
      "postalCode",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.phone &&
      !/^[6-9]\d{9}$/.test(formData.phone.trim())
    ) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (
      formData.postalCode &&
      !/^\d{6}$/.test(formData.postalCode.trim())
    ) {
      newErrors.postalCode = "Enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit?.(formData);
  };

  const inputClass = (fieldName) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-sm text-[#202923] outline-none transition focus:border-[#12372A] focus:ring-2 focus:ring-[#12372A]/10 ${
      errors[fieldName]
        ? "border-red-500"
        : "border-[#DCE2D8]"
    }`;

  const renderError = (fieldName) => {
    if (!errors[fieldName]) return null;

    return (
      <p className="mt-1 text-xs text-red-600">
        {errors[fieldName]}
      </p>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {showTitle && (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F1F3EC] text-[#12372A]">
            <MapPin size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#12372A]">
              Delivery Address
            </h2>

            <p className="text-sm text-[#68736A]">
              Enter the address where you want your order delivered.
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            Full Name *
          </label>

          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass("fullName")}
          />

          {renderError("fullName")}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            Phone Number *
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            className={inputClass("phone")}
          />

          {renderError("phone")}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass("email")}
          />

          {renderError("email")}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="addressLine1"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            Address Line 1 *
          </label>

          <input
            id="addressLine1"
            name="addressLine1"
            type="text"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="House number, building name, street"
            className={inputClass("addressLine1")}
          />

          {renderError("addressLine1")}
        </div>

        <div className="md:col-span-2">
          <label
            htmlFor="addressLine2"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            Address Line 2
          </label>

          <input
            id="addressLine2"
            name="addressLine2"
            type="text"
            value={formData.addressLine2}
            onChange={handleChange}
            placeholder="Apartment, landmark, area"
            className={inputClass("addressLine2")}
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            City *
          </label>

          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className={inputClass("city")}
          />

          {renderError("city")}
        </div>

        <div>
          <label
            htmlFor="state"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            State *
          </label>

          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className={inputClass("state")}
          />

          {renderError("state")}
        </div>

        <div>
          <label
            htmlFor="postalCode"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            PIN Code *
          </label>

          <input
            id="postalCode"
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="6-digit PIN code"
            maxLength={6}
            className={inputClass("postalCode")}
          />

          {renderError("postalCode")}
        </div>

        <div>
          <label
            htmlFor="country"
            className="mb-2 block text-sm font-medium text-[#202923]"
          >
            Country
          </label>

          <input
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            className={inputClass("country")}
          />
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-[#202923]">
          Address Type
        </p>

        <div className="flex flex-wrap gap-3">
          {["Home", "Work", "Other"].map((type) => (
            <label
              key={type}
              className={`cursor-pointer rounded-lg border px-5 py-3 text-sm transition ${
                formData.addressType === type
                  ? "border-[#12372A] bg-[#F1F3EC] font-medium text-[#12372A]"
                  : "border-[#DCE2D8] text-[#68736A]"
              }`}
            >
              <input
                type="radio"
                name="addressType"
                value={type}
                checked={formData.addressType === type}
                onChange={handleChange}
                className="sr-only"
              />

              {type}
            </label>
          ))}
        </div>
      </div>

      <Button type="submit" submit block size="lg">
        {submitLabel}
      </Button>
    </form>
  );
};

export default AddressForm;
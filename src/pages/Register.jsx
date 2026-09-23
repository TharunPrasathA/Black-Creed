import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    // Registration will be connected to the backend later.
    localStorage.setItem(
      "blackCreedUser",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
      })
    );

    navigate("/account");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F2] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
            Join Black Creed
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#12372A]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#68736A]">
            Create an account for a smoother shopping experience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#202923]"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-[#DCE2D8] px-4 py-3 text-sm outline-none focus:border-[#12372A]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#202923]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-[#DCE2D8] px-4 py-3 text-sm outline-none focus:border-[#12372A]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#202923]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full rounded-lg border border-[#DCE2D8] px-4 py-3 text-sm outline-none focus:border-[#12372A]"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-[#202923]"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full rounded-lg border border-[#DCE2D8] px-4 py-3 text-sm outline-none focus:border-[#12372A]"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button type="submit" submit block size="lg">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#68736A]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#12372A] underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
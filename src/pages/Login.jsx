import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Authentication will be connected to the backend later.
    localStorage.setItem(
      "blackCreedUser",
      JSON.stringify({
        email: formData.email,
        name: formData.email.split("@")[0],
      })
    );

    navigate("/account");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F2] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59A63]">
            Welcome Back
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#12372A]">
            Sign In
          </h1>

          <p className="mt-2 text-sm text-[#68736A]">
            Access your Black Creed account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              placeholder="Enter your password"
              className="w-full rounded-lg border border-[#DCE2D8] px-4 py-3 text-sm outline-none focus:border-[#12372A]"
            />
          </div>

          <Button type="submit" submit block size="lg">
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#68736A]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#12372A] underline underline-offset-4"
          >
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
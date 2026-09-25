import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Package, User } from "lucide-react";
import Button from "../components/common/Button";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(
      localStorage.getItem("blackCreedUser") || "null"
    );

    setUser(savedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("blackCreedUser");
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF8F2] px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#12372A]">
            Please sign in to continue
          </h1>

          <Link
            to="/login"
            className="mt-5 inline-block rounded-lg bg-[#12372A] px-6 py-3 text-sm font-semibold !text-white"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl bg-[#12372A] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B59A63]">
            My Account
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Welcome, {user.name}
          </h1>

          <p className="mt-2 text-sm text-white/70">
            Manage your account and view your orders.
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <Link
            to="/orders"
            className="rounded-2xl border border-[#DCE2D8] bg-white p-6 transition hover:border-[#12372A]"
          >
            <Package className="text-[#12372A]" size={25} />

            <h2 className="mt-4 text-lg font-semibold text-[#12372A]">
              My Orders
            </h2>

            <p className="mt-2 text-sm text-[#68736A]">
              View your previous purchases and order details.
            </p>
          </Link>

          <div className="rounded-2xl border border-[#DCE2D8] bg-white p-6">
            <User className="text-[#12372A]" size={25} />

            <h2 className="mt-4 text-lg font-semibold text-[#12372A]">
              Profile Information
            </h2>

            <p className="mt-2 text-sm text-[#68736A]">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            onClick={handleLogout}
          >
            <LogOut size={17} />
            Sign Out
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Account;
import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F2]">
      <header className="border-b border-[#DCE2D8] bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-bold tracking-[0.18em] text-[#12372A]"
          >
            BLACK CREED
          </Link>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-medium text-[#68736A] transition hover:text-[#12372A]"
          >
            <ArrowLeft size={16} />
            Back to Store
          </Link>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-[#DCE2D8] bg-white px-4 py-6 text-center">
        <p className="text-xs text-[#68736A]">
          © {new Date().getFullYear()} Black Creed. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
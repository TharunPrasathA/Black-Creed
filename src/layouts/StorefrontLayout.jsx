import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";

const StorefrontLayout = () => {
  return (
    <div className="flex min-h-screen min-w-0 flex-col overflow-x-hidden bg-[#FAF8F2] text-[#202923]">
      {/* Main Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="min-w-0 flex-1 pb-20 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default StorefrontLayout;

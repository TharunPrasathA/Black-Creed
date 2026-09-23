import { Outlet } from "react-router-dom";
import AnnouncementBar from "../components/layout/AnnouncementBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import MobileBottomNav from "../components/layout/MobileBottomNav";

const StorefrontLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF8F2]">
      <AnnouncementBar />

      <Navbar />

      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      <Footer />

      <MobileBottomNav />
    </div>
  );
};

export default StorefrontLayout;
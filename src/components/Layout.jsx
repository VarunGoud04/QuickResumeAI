import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Offset for floating navbar */}
      <div className="pt-32 px-4">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;

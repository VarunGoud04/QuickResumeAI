// Layout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* fixed navbar */}
      <Navbar />

      {/* only enough padding to clear navbar */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

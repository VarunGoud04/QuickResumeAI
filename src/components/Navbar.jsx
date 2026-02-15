import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { SparklesIcon, UserCircleIcon } from "@heroicons/react/24/outline"; // Assuming Heroicons for trendy icons

function Navbar() {
  const { user, logout } = useAuth();

  // Derive a simple initial from user (customize based on your user shape)
  const userInitial =
    user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U";

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg px-6 py-4 flex justify-between items-center border-b border-white/20 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Trendy Logo with Icon */}
        <div className="flex items-center gap-2">
          <SparklesIcon className="h-8 w-8 text-white animate-pulse" />
          <Link to="/" className="text-2xl font-bold text-white hover:text-yellow-300 transition-colors">
            QuickResumeAI
          </Link>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-indigo-900 animate-bounce">
            Beta
          </span>
        </div>

        <div className="mt-1">
          <p className="text-xs text-white/80">by Varuntechservices</p>

          {/* Animated Tagline with Trendy Effect */}
          <div className="relative mt-1 h-4 overflow-hidden text-xs text-yellow-200 font-medium">
            <div className="animate-slide-words">
              <span className="block">AI‑powered resume builder</span>
              <span className="block">ATS‑friendly optimization</span>
              <span className="block">Designed for tech roles</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* Trendy User Chip with Icon */}
            <div className="flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-2 shadow-lg hover:bg-white/30 transition">
              <UserCircleIcon className="h-6 w-6 text-white" />
              <span className="hidden sm:block text-sm text-white max-w-[120px] truncate">
                {user?.name || user?.email}
              </span>
            </div>

            <Link
              to="/dashboard"
              className="text-white hover:text-yellow-300 text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-white hover:text-yellow-300 text-sm font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
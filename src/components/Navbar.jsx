import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  SparklesIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const userInitial =
    user?.name?.[0]?.toUpperCase() ||
    user?.email?.[0]?.toUpperCase() ||
    "U";

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg border-b border-white/20 backdrop-blur-sm fixed w-full z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <SparklesIcon className="h-8 w-8 text-white animate-pulse" />

          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-white hover:text-yellow-300 transition-colors"
          >
            QuickResumeAI
          </Link>

          <span className="hidden sm:inline px-2 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-indigo-900">
            Beta
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <UserCircleIcon className="h-6 w-6 text-white" />
                <span className="text-sm text-white truncate max-w-[120px]">
                  {user?.name || user?.email}
                </span>
              </div>

              <Link
                to="/dashboard"
                className="text-white hover:text-yellow-300 text-sm font-medium"
              >
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="text-sm bg-red-500 px-4 py-2 rounded-full text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-indigo-700">
          {user ? (
            <>
              <div className="text-white text-sm">
                {user?.name || user?.email}
              </div>

              <Link to="/dashboard" className="block text-white">
                Dashboard
              </Link>

              <button
                onClick={logout}
                className="block w-full text-left text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white">
                Login
              </Link>
              <Link to="/register" className="block text-yellow-300">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;

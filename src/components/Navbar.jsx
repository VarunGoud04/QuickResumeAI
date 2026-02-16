// src/components/Navbar.jsx
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

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg border-b border-white/20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LEFT BRAND */}
        <div className="flex items-center gap-3 min-w-0">
          <SparklesIcon className="h-8 w-8 text-white animate-pulse" />

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold text-white hover:text-yellow-300 transition"
              >
                QuickResumeAI
              </Link>

              {/* Rotating Tagline (vertical) */}
              <div className="hidden sm:block h-[18px] overflow-hidden text-[11px] text-yellow-100 leading-4">
                <div className="animate-vertical-rotate">
                  <div className="h-[18px] flex items-center">
                    ATS-friendly resumes
                  </div>
                  <div className="h-[18px] flex items-center">
                    AI-optimized bullets
                  </div>
                  <div className="h-[18px] flex items-center">
                    Tech job ready
                  </div>
                  <div className="h-[18px] flex items-center">
                    Live preview in browser
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-semibold bg-yellow-400 text-indigo-900">
                Beta
              </span>
              <span className="text-[11px] text-white/80">
                Built by <span className="font-semibold">VarunTechServices</span>
              </span>
            </div>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/about"
            className="text-white hover:text-yellow-300 text-sm font-medium"
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-yellow-300 text-sm font-medium"
              >
                Dashboard
              </Link>

              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
                <UserCircleIcon className="h-6 w-6 text-white" />
                <span className="text-sm text-white truncate max-w-[120px]">
                  {user?.name || user?.email}
                </span>
              </div>

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
                className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
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

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-indigo-700 px-6 pb-6 space-y-4">
          <Link
            to="/about"
            className="block text-white"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block text-white"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>

              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-white"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-yellow-300"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}

          <div className="pt-3 border-t border-white/20 text-[11px] text-white/70">
            Built by <span className="font-semibold">VarunTechServices</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

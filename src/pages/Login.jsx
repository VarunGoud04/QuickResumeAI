import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import { UserIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, SparklesIcon } from "@heroicons/react/24/outline"; // Assuming Heroicons for trendy icons

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleForgotPassword = () => {
    window.open("https://forms.gle/D4hDCr3M1crk6H8C9", "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-lg">
          {/* Trendy Background Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>

          <div className="relative bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-10 animate-[fadeIn_0.4s_ease-out] border border-white/20">
            {/* Header with Icon */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <SparklesIcon className="h-10 w-10 text-indigo-600 animate-bounce" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
              </div>
              <p className="text-sm text-gray-600">
                Log in to manage your resumes and continue where you left off.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-6 animate-[fadeIn_0.2s_ease-out] text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-16 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-gray-50 hover:bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-indigo-600 transition"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span>Keep me signed in</span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-indigo-600 hover:text-purple-600 font-medium transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                Login
              </button>
            </form>

            {/* Terms and Register */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                By logging in, you agree to our{" "}
                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-indigo-600 cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
              <p className="text-sm text-gray-600 mt-4">
                New to QuickResumeAI?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 hover:text-purple-600 font-medium transition"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
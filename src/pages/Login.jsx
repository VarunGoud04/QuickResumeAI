import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

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

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-3 py-6 sm:px-4 sm:py-8">
        <div className="relative w-full max-w-sm sm:max-w-md">
          {/* soft glow background */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-3xl blur-2xl opacity-60"></div>

          <div className="relative bg-white shadow-lg sm:shadow-xl rounded-2xl px-4 py-6 sm:px-8 sm:py-8 animate-[fadeIn_0.35s_ease-out]">
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-1 sm:mb-2 text-center">
              Welcome back
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 text-center mb-5 sm:mb-6">
              Log in to manage your resumes and continue where you left off.
            </p>

            {error && (
              <p className="text-red-500 text-xs sm:text-sm mb-3 sm:mb-4 text-center animate-[fadeIn_0.2s_ease-out]">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none transition pr-16 text-sm sm:text-base"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-[11px] sm:text-xs text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3.5 w-3.5 text-indigo-600 border-gray-300 rounded"
                  />
                  <span>Keep me signed in</span>
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
              >
                Login
              </button>
            </form>

            <p className="text-[10px] sm:text-[11px] text-gray-400 mt-3 sm:mt-4 text-center">
              By logging in, you agree to our{" "}
              <span className="text-indigo-500 cursor-pointer hover:underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-indigo-500 cursor-pointer hover:underline">
                Privacy Policy
              </span>
              .
            </p>

            <p className="text-[11px] sm:text-xs text-gray-500 mt-4 text-center">
              New to QuickResumeAI?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Login;

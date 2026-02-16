import { useState, useEffect } from "react";
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

  // ✅ SEO Title (Correct Placement)
  useEffect(() => {
    document.title = "Login | QuickResumeAI";
  }, []);

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

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-200 to-blue-200 rounded-3xl blur-2xl opacity-60"></div>

          <div className="relative bg-white shadow-xl rounded-2xl px-8 py-8">
            <h2 className="text-3xl font-bold text-indigo-600 text-center">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-500 text-center mt-2 mb-6">
              Log in to manage your resumes.
            </p>

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none pr-16"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  Keep me signed in
                </label>

                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-indigo-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-6 text-center">
              New to QuickResumeAI?{" "}
              <Link
                to="/register"
                className="text-indigo-600 hover:underline"
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

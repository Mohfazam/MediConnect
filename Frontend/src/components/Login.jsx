import { useState } from "react";
import { Eye, EyeOff, LogIn, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL;

export const Login = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${server_url}api/login`, formData);

      if (response.status === 200) {
        alert("Logged in successfully!");
        // Store a flag in local storage
        localStorage.setItem("isAuthenticated", "true");
        navigate("/Landing");
      } else {
        alert(`Error: ${response.data.message || "Invalid credentials"}`);
      }
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-lg shadow-xl ${isDark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Welcome Back</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDark ? "bg-yellow-400 text-gray-900" : "bg-gray-200 text-gray-600"}`}
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </motion.button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 border-gray-300"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className={`block text-sm font-medium ${isDark ? "text-gray-300" : "text-gray-700"}`}
            >
              Password
            </label>
            <div className="mt-1 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? "bg-gray-700 text-white border-gray-600" : "bg-gray-50 border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={showPassword ? "visible" : "hidden"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isDark ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Log In
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
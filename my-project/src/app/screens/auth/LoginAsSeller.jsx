  import { Caption, Container, Loader, CustomNavLink, PrimaryButton, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, RESET } from "../../redux/features/authSlice";
import { Gavel, Eye, EyeOff, Store } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

export const LoginAsSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { isLoading, isSuccess, user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/dashboard");
    }

    return () => {
      dispatch(RESET());
    };
  }, [dispatch, isSuccess, isError, message, user, navigate]);

  const validateForm = () => {
    let newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = { email, password };
      dispatch(login(userData));
    }
  };

  return (
    <>
      {typeof window !== "undefined" && isLoading && <Loader />}
      <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-2">
              <Gavel className="w-10 h-10 text-emerald-600" />
              <span className="text-3xl font-bold text-gray-900">AuctionHub</span>
            </div>
          </div>

          {/* Header with Seller Badge */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-4">
              <Store className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">SELLER LOGIN</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back, Seller</h2>
            <p className="mt-2 text-gray-600">
              Not a seller yet?{" "}
              <CustomNavLink href="/create-account" className="text-emerald-600 font-medium hover:text-emerald-700">
                Register as Seller
              </CustomNavLink>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="seller@example.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <CustomNavLink href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Forgot password?
                </CustomNavLink>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Store className="w-5 h-5" />
                {isLoading ? "Logging in..." : "Login to Seller Dashboard"}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or</span>
                </div>
              </div>

              {/* Alternative Options */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Login as buyer?{" "}
                  <CustomNavLink href="/login" className="text-emerald-600 font-medium hover:text-emerald-700">
                    Regular Login
                  </CustomNavLink>
                </p>
              </div>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-emerald-800">
              <strong>Seller Benefits:</strong> Manage your auctions, track bids, and access advanced seller tools.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
          By signing in as a seller, you agree to our Seller Terms of Service
        </p>
      </section>
    </>
  );
};

import { Caption, Container, CustomNavLink, Loader, PrimaryButton, Title, FieldError, showErrorToast, showSuccessToast, useFormErrors, getSavedEmail, saveRememberMe, clearRememberMe } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, RESET } from "../../redux/features/authSlice";
import { Gavel, Eye, EyeOff, LogIn } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const { errors, setFieldError, clearFieldError, clearAllErrors } = useFormErrors();
  const { isLoading, isSuccess, user, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    const savedEmail = getSavedEmail();
    if (savedEmail) {
      setFormData(prev => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && user) {
      showSuccessToast("Login successful!");
      navigate("/dashboard");
    }

    if (isError && message) {
      const errorMessage = typeof message === 'string'
        ? message
        : message?.message || 'Login failed. Please try again.';
      showErrorToast(errorMessage);
    }

    return () => {
      dispatch(RESET());
    };
  }, [dispatch, isSuccess, isError, message, user, navigate]);

  const validateForm = () => {
    clearAllErrors();
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setFieldError("email", "Email is required");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setFieldError("email", "Invalid email format");
      isValid = false;
    }

    if (!password.trim()) {
      setFieldError("password", "Password is required");
      isValid = false;
    } else if (password.length < 8) {
      setFieldError("password", "Password must be at least 8 characters");
      isValid = false;
    }

    if (!termsAccepted) {
      setFieldError("terms", "You must accept the Terms & Conditions to continue");
      isValid = false;
    }

    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearFieldError(name);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = { email, password };
      const result = await dispatch(login(userData));

      if (result.meta.requestStatus === 'fulfilled') {
        if (rememberMe) {
          const token = result.payload?.token || result.payload?.data?.token;
          saveRememberMe(email, token, true);
        } else {
          clearRememberMe();
        }
      }
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

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">
              Don't have an account?{" "}
              <CustomNavLink href="/register" className="text-emerald-600 font-medium hover:text-emerald-700">
                Sign up here
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
                  placeholder="you@example.com"
                  required
                />
                <FieldError error={errors.email} />
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <FieldError error={errors.password} />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <CustomNavLink href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                  Forgot password?
                </CustomNavLink>
              </div>

              {/* Terms & Conditions */}
              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms-login"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      clearFieldError("terms");
                    }}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer mt-1"
                  />
                  <label htmlFor="terms-login" className="ml-2 text-sm text-gray-600 cursor-pointer">
                    I agree to the{" "}
                    <CustomNavLink href="/terms" className="text-emerald-600 hover:text-emerald-700 underline">
                      Terms & Conditions
                    </CustomNavLink>
                    {" "}and{" "}
                    <CustomNavLink href="/privacy" className="text-emerald-600 hover:text-emerald-700 underline">
                      Privacy Policy
                    </CustomNavLink>
                  </label>
                </div>
                <FieldError error={errors.terms} />
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LogIn className="w-5 h-5" />
                {isLoading ? "Logging in..." : "Login to your account"}
              </button>

            </form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </section>
    </>
  );
};

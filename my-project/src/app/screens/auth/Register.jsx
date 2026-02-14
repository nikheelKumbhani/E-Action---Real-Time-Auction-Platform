import { useEffect, useState } from "react";
import { CustomNavLink, Loader, FieldError, showErrorToast, showSuccessToast, useFormErrors } from "../../router";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, RESET } from "../../redux/features/authSlice";
import { Gavel, Eye, EyeOff, UserPlus } from "lucide-react";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
};

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, cpassword } = formData;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { errors, setFieldError, clearFieldError, clearAllErrors } = useFormErrors();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError && message) {
      const errorMessage = typeof message === 'string'
        ? message
        : message?.message || 'Registration failed. Please try again.';
      showErrorToast(errorMessage);
    }

    return () => {
      dispatch(RESET());
    };
  }, [dispatch, isSuccess, isError, message, navigate]);

  const validateForm = () => {
    clearAllErrors();
    let isValid = true;

    if (!name.trim()) {
      setFieldError("name", "Name is required");
      isValid = false;
    } else if (name.length < 3) {
      setFieldError("name", "Name must be at least 3 characters");
      isValid = false;
    }

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

    if (!cpassword.trim()) {
      setFieldError("cpassword", "Please confirm your password");
      isValid = false;
    } else if (password !== cpassword) {
      setFieldError("cpassword", "Passwords do not match");
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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = { name, email, password };
      const result = await dispatch(register(userData));

      if (result.meta.requestStatus === 'fulfilled') {
        showSuccessToast("Registration successful! Please check your email to verify your account.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
            <p className="mt-2 text-gray-600">
              Already have an account?{" "}
              <CustomNavLink href="/login" className="text-emerald-600 font-medium hover:text-emerald-700">
                Log in here
              </CustomNavLink>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200">
            <form onSubmit={handleRegister} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                  required
                />
                <FieldError error={errors.name} />
              </div>

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
                    placeholder="Create a strong password"
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
                <FieldError error={errors.password} />
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="cpassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="cpassword"
                    name="cpassword"
                    value={cpassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all pr-12"
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <FieldError error={errors.cpassword} />
              </div>

              {/* Terms & Conditions */}
              <div>
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms-register"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (e.target.checked) {
                        clearFieldError('terms');
                      }
                    }}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer mt-1"
                  />
                  <label htmlFor="terms-register" className="ml-2 text-sm text-gray-600 cursor-pointer">
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

              {/* Register Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-5 h-5" />
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <p className="text-sm text-emerald-800 text-center">
              <strong>Note:</strong> You can upgrade to a seller account anytime from your dashboard
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </section>
    </>
  );
};

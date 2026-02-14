import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CustomNavLink, Loader } from "../../router";
import { toast } from "react-toastify";
import { Gavel, Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [tokenValid, setTokenValid] = useState(true);

    useEffect(() => {
        if (!token) {
            setTokenValid(false);
            toast.error("Invalid or missing reset token");
        }
        // TODO: Validate token with backend
    }, [token]);

    const validateForm = () => {
        let newErrors = {};

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must have at least 8 characters, one letter, one number, and one symbol";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Password reset successful! Please login with your new password.");
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password. Link may be expired.");
            setErrors({ general: "Failed to reset password. Please try again or request a new reset link." });
        } finally {
            setIsLoading(false);
        }
    };

    if (!tokenValid) {
        return (
            <section className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2">
                            <Gavel className="w-10 h-10 text-emerald-600" />
                            <span className="text-3xl font-bold text-gray-900">AuctionHub</span>
                        </div>
                    </div>

                    <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <AlertCircle className="w-10 h-10 text-red-500" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Invalid or Expired Link</h3>
                        <p className="text-gray-600 mb-6">
                            This password reset link is invalid or has expired. Please request a new one.
                        </p>
                        <div className="space-y-3">
                            <CustomNavLink href="/forgot-password">
                                <button className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all">
                                    Request New Link
                                </button>
                            </CustomNavLink>
                            <CustomNavLink href="/login">
                                <button className="w-full px-6 py-3 bg-white text-gray-700 border border-gray-200 font-medium rounded-lg hover:bg-gray-50 transition-all">
                                    Back to Login
                                </button>
                            </CustomNavLink>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Create New Password</h2>
                        <p className="mt-2 text-gray-600">
                            Enter your new password below
                        </p>
                    </div>

                    <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {errors.general && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                                    {errors.general}
                                </div>
                            )}

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Enter new password"
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
                                {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                                <p className="text-xs text-gray-500 mt-1">
                                    Must be at least 8 characters with letters, numbers, and symbols
                                </p>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password *
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                        placeholder="Confirm new password"
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
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle className="w-5 h-5" />
                                {isLoading ? "Resetting Password..." : "Reset Password"}
                            </button>

                            {/* Back to Login */}
                            <div className="text-center">
                                <CustomNavLink href="/login" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                    Remember your password? Back to Login
                                </CustomNavLink>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Help Text */}
                <p className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
                    Need help? Contact our support team at support@auctionhub.com
                </p>
            </section>
        </>
    );
};

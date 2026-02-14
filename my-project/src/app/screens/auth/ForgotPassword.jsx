import { useState } from "react";
import { Container, CustomNavLink, Loader, PrimaryButton, Title } from "../../router";
import { toast } from "react-toastify";
import { Gavel, Mail, Send, CheckCircle } from "lucide-react";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!validateEmail(email)) {
            setError("Invalid email format");
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            setEmailSent(true);
            toast.success("Password reset link sent to your email!");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to send reset email. Please try again.");
            toast.error("Failed to send reset email");
        } finally {
            setIsLoading(false);
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

                    {!emailSent ? (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Forgot Password?</h2>
                                <p className="mt-2 text-gray-600">
                                    No worries! Enter your email and we'll send you reset instructions
                                </p>
                            </div>

                            <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setError("");
                                                }}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                                                placeholder="you@example.com"
                                                required
                                            />
                                        </div>
                                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="w-5 h-5" />
                                        {isLoading ? "Sending..." : "Send Reset Link"}
                                    </button>

                                    {/* Back to Login */}
                                    <div className="text-center">
                                        <CustomNavLink href="/login" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                                            ← Back to Login
                                        </CustomNavLink>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        // Success State
                        <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200 text-center">
                            <div className="mb-6 flex justify-center">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h3>
                            <p className="text-gray-600 mb-6">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                            <p className="text-sm text-gray-500 mb-6">
                                Didn't receive the email? Check your spam folder or{" "}
                                <button
                                    onClick={() => setEmailSent(false)}
                                    className="text-emerald-600 hover:text-emerald-700 font-medium underline"
                                >
                                    try again
                                </button>
                            </p>
                            <CustomNavLink href="/login">
                                <button className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all">
                                    Back to Login
                                </button>
                            </CustomNavLink>
                        </div>
                    )}
                </div>

                {/* Help Text */}
                <p className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
                    Need help? Contact our support team at support@auctionhub.com
                </p>
            </section>
        </>
    );
};

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CustomNavLink } from "../../router";
import { toast } from "react-toastify";
import { Gavel, Loader2, CheckCircle, XCircle } from "lucide-react";

export const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
    const [isResending, setIsResending] = useState(false);

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    useEffect(() => {
        if (token) {
            verifyEmail(token);
        } else {
            setVerificationStatus("error");
        }
    }, [token]);

    const verifyEmail = async (verificationToken) => {
        try {
            // TODO: Backend Integration Required
            // const response = await axios.post('/api/auth/verify-email', { token: verificationToken });

            // Simulated verification for now
            setTimeout(() => {
                setVerificationStatus("success");
                toast.success("Email verified successfully!");
            }, 2000);
        } catch (error) {
            setVerificationStatus("error");
            toast.error("Verification failed. Please try again.");
        }
    };

    const handleResendEmail = async () => {
        if (!email) {
            toast.error("Email address not found. Please register again.");
            return;
        }

        setIsResending(true);
        try {
            // TODO: Backend Integration Required
            // await axios.post('/api/auth/resend-verification', { email });

            // Simulated resend for now
            setTimeout(() => {
                toast.success("Verification email sent! Please check your inbox.");
                setIsResending(false);
            }, 1000);

        } catch (error) {
            toast.error("Failed to resend email. Please try again.");
            setIsResending(false);
        }
    };

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

                <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-gray-200">
                    {/* Verifying State */}
                    {verificationStatus === "verifying" && (
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                                    <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Verifying Your Email...</h3>
                            <p className="text-gray-600">Please wait while we verify your email address.</p>
                        </div>
                    )}

                    {/* Success State */}
                    {verificationStatus === "success" && (
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-10 h-10 text-emerald-600" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-emerald-600 mb-4">Email Verified Successfully!</h3>
                            <p className="text-gray-600 mb-6">
                                Your email has been verified. You can now log in to your account.
                            </p>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all"
                            >
                                Go to Login
                            </button>
                        </div>
                    )}

                    {/* Error State */}
                    {verificationStatus === "error" && (
                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                    <XCircle className="w-10 h-10 text-red-500" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h3>
                            <p className="text-gray-600 mb-6">
                                The verification link is invalid or has expired. Please request a new verification email.
                            </p>

                            {email && (
                                <button
                                    onClick={handleResendEmail}
                                    disabled={isResending}
                                    className="w-full px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isResending ? "Sending..." : "Resend Verification Email"}
                                </button>
                            )}

                            <p className="text-sm text-gray-600">
                                Need help?{" "}
                                <CustomNavLink href="/register" className="text-emerald-600 hover:text-emerald-700 underline font-medium">
                                    Register again
                                </CustomNavLink>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Help Text */}
            <p className="mt-8 text-center text-sm text-gray-500 max-w-md mx-auto">
                Having trouble? Contact our support team at support@auctionhub.com
            </p>
        </section>
    );
};

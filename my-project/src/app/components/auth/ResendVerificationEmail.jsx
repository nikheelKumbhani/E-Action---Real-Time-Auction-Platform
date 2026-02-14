import { useState } from "react";
import { Caption, PrimaryButton } from "../../router";
import { toast } from "react-toastify";

export const ResendVerificationEmail = ({ email }) => {
    const [isResending, setIsResending] = useState(false);

    const handleResend = async () => {
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
            <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="flex-1">
                    <Caption className="font-semibold text-yellow-800 mb-2">
                        Email Not Verified
                    </Caption>
                    <Caption className="text-yellow-700 mb-3">
                        Please verify your email address to access all features. Check your inbox for the verification link.
                    </Caption>
                    <PrimaryButton
                        className="rounded-none text-sm py-2 px-4"
                        onClick={handleResend}
                        disabled={isResending}
                    >
                        {isResending ? "SENDING..." : "RESEND VERIFICATION EMAIL"}
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

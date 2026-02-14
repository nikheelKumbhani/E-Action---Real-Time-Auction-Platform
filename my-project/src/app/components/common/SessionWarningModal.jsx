import { Title, Caption, PrimaryButton } from "../../router";

export const SessionWarningModal = ({ isOpen, timeRemaining, onExtend, onLogout }) => {
    if (!isOpen) return null;

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <Title level={4} className="text-gray-900 mb-2">Session Expiring Soon</Title>
                    <Caption className="text-gray-600">
                        Your session will expire due to inactivity. You will be logged out automatically.
                    </Caption>
                </div>

                {timeRemaining && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
                        <p className="text-2xl font-bold text-yellow-800">
                            {minutes}:{seconds.toString().padStart(2, '0')}
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">Time remaining</p>
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onLogout}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-gray-700"
                    >
                        Logout Now
                    </button>
                    <PrimaryButton
                        onClick={onExtend}
                        className="flex-1 rounded-none"
                    >
                        Stay Logged In
                    </PrimaryButton>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                    Click "Stay Logged In" to extend your session
                </p>
            </div>
        </div>
    );
};

import React from "react";
import { useNavigate } from "react-router-dom";
import { Title, Caption, PrimaryButton } from "../../router";

export const RouteErrorFallback = ({ error, resetErrorBoundary }) => {
    const navigate = useNavigate();
    const isDevelopment = process.env.NODE_ENV === 'development';

    const handleGoHome = () => {
        resetErrorBoundary();
        navigate('/');
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="max-w-lg w-full text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                    <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <Title level={4} className="text-gray-900 mb-3">Page Error</Title>
                <Caption className="text-gray-600 mb-6">
                    This page encountered an error. Please try again or return to the homepage.
                </Caption>

                <div className="flex gap-3 justify-center">
                    <PrimaryButton onClick={resetErrorBoundary} className="rounded-none">
                        Retry
                    </PrimaryButton>
                    <button
                        onClick={handleGoHome}
                        className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                        Go Home
                    </button>
                </div>

                {isDevelopment && error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-left">
                        <p className="text-sm font-semibold text-red-800 mb-2">Error:</p>
                        <pre className="text-xs text-red-700 overflow-auto max-h-32 whitespace-pre-wrap">
                            {error.toString()}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

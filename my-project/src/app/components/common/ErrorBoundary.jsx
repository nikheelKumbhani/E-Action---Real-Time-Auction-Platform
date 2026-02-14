import React from "react";
import { CustomNavLink, Title, Caption, PrimaryButton } from "../../router";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console in development
        console.error("Error caught by boundary:", error, errorInfo);

        // Store error details
        this.setState({
            error,
            errorInfo
        });

        // TODO: Send error to logging service in production
        // Example: logErrorToService(error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null
        });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            return this.props.fallback ? (
                this.props.fallback(this.state.error, this.handleReset)
            ) : (
                <DefaultErrorFallback
                    error={this.state.error}
                    errorInfo={this.state.errorInfo}
                    onReset={this.handleReset}
                />
            );
        }

        return this.props.children;
    }
}

const DefaultErrorFallback = ({ error, errorInfo, onReset }) => {
    const isDevelopment = process.env.NODE_ENV === 'development';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <Title level={3} className="text-red-600 mb-2">Oops! Something went wrong</Title>
                    <Caption className="text-gray-600 mb-6">
                        We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
                    </Caption>
                </div>

                <div className="flex gap-4 justify-center mb-6">
                    <PrimaryButton onClick={onReset} className="rounded-none">
                        Try Again
                    </PrimaryButton>
                    <CustomNavLink href="/">
                        <button className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50">
                            Go to Homepage
                        </button>
                    </CustomNavLink>
                </div>

                {isDevelopment && error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
                        <p className="text-sm font-semibold text-red-800 mb-2">Error Details (Development Only):</p>
                        <pre className="text-xs text-red-700 overflow-auto max-h-40 whitespace-pre-wrap">
                            {error.toString()}
                            {errorInfo && errorInfo.componentStack}
                        </pre>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <Caption className="text-gray-500 text-sm">
                        If this problem persists, please contact support.
                    </Caption>
                </div>
            </div>
        </div>
    );
};

export default ErrorBoundary;

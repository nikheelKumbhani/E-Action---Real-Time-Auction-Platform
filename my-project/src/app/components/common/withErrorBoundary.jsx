/**
 * Higher-order component to wrap routes with error boundary
 */
import ErrorBoundary from "./ErrorBoundary";
import { RouteErrorFallback } from "./RouteErrorFallback";

export const withErrorBoundary = (Component, fallback) => {
    return (props) => (
        <ErrorBoundary fallback={fallback || ((error, reset) => <RouteErrorFallback error={error} resetErrorBoundary={reset} />)}>
            <Component {...props} />
        </ErrorBoundary>
    );
};

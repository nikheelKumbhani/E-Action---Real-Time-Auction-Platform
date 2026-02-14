import { toast } from "react-toastify";

/**
 * Centralized error handling utility
 * Provides consistent error display across the application
 */

// Error types
export const ErrorType = {
    VALIDATION: 'validation',
    NETWORK: 'network',
    AUTH: 'auth',
    SERVER: 'server',
    UNKNOWN: 'unknown'
};

// Error severity levels
export const ErrorSeverity = {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical'
};

/**
 * Parse error from various sources (axios, fetch, custom)
 */
export const parseError = (error) => {
    // Axios error
    if (error.response) {
        return {
            message: error.response.data?.message || error.response.data?.error || 'Server error occurred',
            status: error.response.status,
            type: getErrorType(error.response.status),
            details: error.response.data
        };
    }

    // Network error
    if (error.request) {
        return {
            message: 'Network error. Please check your connection.',
            status: 0,
            type: ErrorType.NETWORK,
            details: null
        };
    }

    // Custom error object
    if (error.message) {
        return {
            message: error.message,
            status: error.status || 500,
            type: error.type || ErrorType.UNKNOWN,
            details: error.details || null
        };
    }

    // String error
    if (typeof error === 'string') {
        return {
            message: error,
            status: 500,
            type: ErrorType.UNKNOWN,
            details: null
        };
    }

    // Unknown error
    return {
        message: 'An unexpected error occurred',
        status: 500,
        type: ErrorType.UNKNOWN,
        details: null
    };
};

/**
 * Determine error type from status code
 */
const getErrorType = (status) => {
    if (status >= 400 && status < 500) {
        if (status === 401 || status === 403) return ErrorType.AUTH;
        if (status === 422) return ErrorType.VALIDATION;
        return ErrorType.NETWORK;
    }
    if (status >= 500) return ErrorType.SERVER;
    return ErrorType.UNKNOWN;
};

/**
 * Display error as toast notification
 */
export const showErrorToast = (error, options = {}) => {
    const parsedError = parseError(error);
    const message = options.customMessage || parsedError.message;

    toast.error(message, {
        position: "top-right",
        autoClose: options.autoClose || 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options.toastOptions
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', parsedError);
    }

    return parsedError;
};

/**
 * Display success message
 */
export const showSuccessToast = (message, options = {}) => {
    toast.success(message, {
        position: "top-right",
        autoClose: options.autoClose || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options.toastOptions
    });
};

/**
 * Display info message
 */
export const showInfoToast = (message, options = {}) => {
    toast.info(message, {
        position: "top-right",
        autoClose: options.autoClose || 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options.toastOptions
    });
};

/**
 * Display warning message
 */
export const showWarningToast = (message, options = {}) => {
    toast.warning(message, {
        position: "top-right",
        autoClose: options.autoClose || 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        ...options.toastOptions
    });
};

/**
 * Handle API errors consistently
 */
export const handleApiError = (error, options = {}) => {
    const parsedError = parseError(error);

    // Custom handling based on error type
    switch (parsedError.type) {
        case ErrorType.AUTH:
            if (options.onAuthError) {
                options.onAuthError(parsedError);
            } else {
                showErrorToast('Please log in to continue', { autoClose: 3000 });
            }
            break;

        case ErrorType.VALIDATION:
            if (options.onValidationError) {
                options.onValidationError(parsedError);
            } else {
                showErrorToast(parsedError.message);
            }
            break;

        case ErrorType.NETWORK:
            showErrorToast('Network error. Please check your connection.', { autoClose: 4000 });
            break;

        case ErrorType.SERVER:
            showErrorToast('Server error. Please try again later.', { autoClose: 4000 });
            break;

        default:
            showErrorToast(parsedError.message);
    }

    return parsedError;
};

/**
 * Format validation errors for form display
 */
export const formatValidationErrors = (error) => {
    const parsedError = parseError(error);

    if (parsedError.details?.errors) {
        // Backend returns errors object
        return parsedError.details.errors;
    }

    if (parsedError.details?.validationErrors) {
        // Alternative format
        return parsedError.details.validationErrors;
    }

    // Single error message
    return { general: parsedError.message };
};

/**
 * Get user-friendly error message
 */
export const getUserFriendlyMessage = (error) => {
    const parsedError = parseError(error);

    const friendlyMessages = {
        400: 'Invalid request. Please check your input.',
        401: 'Please log in to continue.',
        403: 'You do not have permission to perform this action.',
        404: 'The requested resource was not found.',
        422: 'Please check your input and try again.',
        429: 'Too many requests. Please try again later.',
        500: 'Server error. Please try again later.',
        502: 'Service temporarily unavailable.',
        503: 'Service temporarily unavailable.'
    };

    return friendlyMessages[parsedError.status] || parsedError.message;
};

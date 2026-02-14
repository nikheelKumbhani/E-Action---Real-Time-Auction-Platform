import { useState, useCallback } from 'react';
import { handleApiError, showSuccessToast, showErrorToast } from '../utils/errorHandler';

/**
 * Custom hook for handling async operations with loading and error states
 */
export const useAsyncHandler = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const execute = useCallback(async (asyncFunction, options = {}) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await asyncFunction();

            if (options.successMessage) {
                showSuccessToast(options.successMessage);
            }

            if (options.onSuccess) {
                options.onSuccess(result);
            }

            return { success: true, data: result };
        } catch (err) {
            const parsedError = handleApiError(err, options.errorOptions);
            setError(parsedError);

            if (options.onError) {
                options.onError(parsedError);
            }

            return { success: false, error: parsedError };
        } finally {
            setIsLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setError(null);
        setIsLoading(false);
    }, []);

    return { execute, isLoading, error, reset };
};

/**
 * Custom hook for form validation and error handling
 */
export const useFormErrors = (initialErrors = {}) => {
    const [errors, setErrors] = useState(initialErrors);

    const setFieldError = useCallback((field, message) => {
        setErrors(prev => ({ ...prev, [field]: message }));
    }, []);

    const clearFieldError = useCallback((field) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
    }, []);

    const setMultipleErrors = useCallback((errorObj) => {
        setErrors(errorObj);
    }, []);

    const clearAllErrors = useCallback(() => {
        setErrors({});
    }, []);

    const hasErrors = Object.keys(errors).length > 0;

    return {
        errors,
        setFieldError,
        clearFieldError,
        setMultipleErrors,
        clearAllErrors,
        hasErrors
    };
};

/**
 * Custom hook for dismissible alerts
 */
export const useAlert = () => {
    const [alert, setAlert] = useState(null);

    const showAlert = useCallback((type, message, title = null) => {
        setAlert({ type, message, title });
    }, []);

    const showError = useCallback((message, title = 'Error') => {
        setAlert({ type: 'error', message, title });
    }, []);

    const showSuccess = useCallback((message, title = 'Success') => {
        setAlert({ type: 'success', message, title });
    }, []);

    const showWarning = useCallback((message, title = 'Warning') => {
        setAlert({ type: 'warning', message, title });
    }, []);

    const showInfo = useCallback((message, title = 'Info') => {
        setAlert({ type: 'info', message, title });
    }, []);

    const hideAlert = useCallback(() => {
        setAlert(null);
    }, []);

    return {
        alert,
        showAlert,
        showError,
        showSuccess,
        showWarning,
        showInfo,
        hideAlert
    };
};

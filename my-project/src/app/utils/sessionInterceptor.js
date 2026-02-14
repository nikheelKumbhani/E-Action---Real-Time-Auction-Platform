import axios from 'axios';

/**
 * Axios interceptor to detect session expiry from API responses
 */
export const setupSessionInterceptor = (navigate, dispatch, logoutAction) => {
    // Response interceptor
    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            // Check if error is due to session expiry
            if (error.response?.status === 401) {
                const errorMessage = error.response?.data?.message?.toLowerCase() || '';

                // Check for session-related errors
                if (
                    errorMessage.includes('session') ||
                    errorMessage.includes('expired') ||
                    errorMessage.includes('unauthorized') ||
                    errorMessage.includes('token')
                ) {
                    // Save current location for redirect after login
                    const currentPath = window.location.pathname;
                    if (currentPath !== '/login' && currentPath !== '/register') {
                        sessionStorage.setItem('redirectAfterLogin', currentPath);
                    }

                    // Logout user
                    if (dispatch && logoutAction) {
                        dispatch(logoutAction());
                    }

                    // Redirect to login
                    if (navigate) {
                        navigate('/login');
                    }
                }
            }

            return Promise.reject(error);
        }
    );
};

/**
 * Check if user should be redirected after login
 */
export const checkRedirectAfterLogin = (navigate) => {
    const redirectPath = sessionStorage.getItem('redirectAfterLogin');
    if (redirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(redirectPath);
        return true;
    }
    return false;
};

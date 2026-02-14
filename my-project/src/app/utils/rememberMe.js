/**
 * Secure token storage utilities for Remember Me functionality
 */

const REMEMBER_ME_KEY = 'rememberMe';
const AUTH_TOKEN_KEY = 'authToken';
const USER_EMAIL_KEY = 'userEmail';

/**
 * Save remember me preference and auth token
 */
export const saveRememberMe = (email, token, remember = true) => {
    if (remember) {
        localStorage.setItem(REMEMBER_ME_KEY, 'true');
        localStorage.setItem(USER_EMAIL_KEY, email);
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
        clearRememberMe();
    }
};

/**
 * Get saved email if remember me is enabled
 */
export const getSavedEmail = () => {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
    if (rememberMe === 'true') {
        return localStorage.getItem(USER_EMAIL_KEY) || '';
    }
    return '';
};

/**
 * Get saved auth token if remember me is enabled
 */
export const getSavedToken = () => {
    const rememberMe = localStorage.getItem(REMEMBER_ME_KEY);
    if (rememberMe === 'true') {
        return localStorage.getItem(AUTH_TOKEN_KEY) || null;
    }
    return null;
};

/**
 * Check if remember me is enabled
 */
export const isRememberMeEnabled = () => {
    return localStorage.getItem(REMEMBER_ME_KEY) === 'true';
};

/**
 * Clear remember me data
 */
export const clearRememberMe = () => {
    localStorage.removeItem(REMEMBER_ME_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(AUTH_TOKEN_KEY);
};

/**
 * Update auth token (for token refresh)
 */
export const updateAuthToken = (token) => {
    if (isRememberMeEnabled()) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
};

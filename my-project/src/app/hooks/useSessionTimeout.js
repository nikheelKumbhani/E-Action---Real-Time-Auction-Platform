import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { showWarningToast, showInfoToast } from '../utils/errorHandler';

/**
 * Session timeout configuration
 */
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const WARNING_TIME = 5 * 60 * 1000; // Show warning 5 minutes before expiry
const CHECK_INTERVAL = 60 * 1000; // Check every minute

/**
 * Hook to manage session timeout
 */
export const useSessionTimeout = (options = {}) => {
    const {
        timeout = SESSION_TIMEOUT,
        warningTime = WARNING_TIME,
        onTimeout,
        onWarning,
        enabled = true
    } = options;

    const [showWarning, setShowWarning] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const navigate = useNavigate();
    const timeoutRef = useRef(null);
    const warningRef = useRef(null);
    const checkIntervalRef = useRef(null);
    const lastActivityRef = useRef(Date.now());

    // Reset session timer
    const resetTimer = useCallback(() => {
        lastActivityRef.current = Date.now();
        setShowWarning(false);
        setTimeRemaining(null);

        // Clear existing timers
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);
        if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);

        if (!enabled) return;

        // Set warning timer
        warningRef.current = setTimeout(() => {
            setShowWarning(true);
            if (onWarning) onWarning();
            showWarningToast('Your session will expire soon. Please save your work.', { autoClose: 8000 });
        }, timeout - warningTime);

        // Set timeout timer
        timeoutRef.current = setTimeout(() => {
            handleTimeout();
        }, timeout);

        // Set interval to update remaining time
        checkIntervalRef.current = setInterval(() => {
            const elapsed = Date.now() - lastActivityRef.current;
            const remaining = timeout - elapsed;

            if (remaining <= warningTime && remaining > 0) {
                setTimeRemaining(Math.floor(remaining / 1000));
            }
        }, CHECK_INTERVAL);
    }, [enabled, timeout, warningTime, onWarning]);

    // Handle session timeout
    const handleTimeout = useCallback(() => {
        setShowWarning(false);

        // Save current location for redirect after login
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/register') {
            sessionStorage.setItem('redirectAfterLogin', currentPath);
        }

        if (onTimeout) {
            onTimeout();
        } else {
            showInfoToast('Your session has expired. Please log in again.');
            navigate('/login');
        }

        // Clear all timers
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (warningRef.current) clearTimeout(warningRef.current);
        if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    }, [navigate, onTimeout]);

    // Extend session
    const extendSession = useCallback(() => {
        resetTimer();
        showInfoToast('Session extended');
    }, [resetTimer]);

    // Track user activity
    useEffect(() => {
        if (!enabled) return;

        const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

        const handleActivity = () => {
            const now = Date.now();
            const timeSinceLastActivity = now - lastActivityRef.current;

            // Only reset if more than 1 minute has passed since last activity
            if (timeSinceLastActivity > 60000) {
                resetTimer();
            }
        };

        events.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        // Initialize timer
        resetTimer();

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (warningRef.current) clearTimeout(warningRef.current);
            if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
        };
    }, [enabled, resetTimer]);

    return {
        showWarning,
        timeRemaining,
        extendSession,
        resetTimer
    };
};

/**
 * Hook to save and restore form data
 */
export const useFormPersistence = (formKey, initialData = {}) => {
    const [formData, setFormData] = useState(() => {
        // Try to restore from sessionStorage
        const saved = sessionStorage.getItem(`form_${formKey}`);
        return saved ? JSON.parse(saved) : initialData;
    });

    // Save to sessionStorage whenever form data changes
    useEffect(() => {
        sessionStorage.setItem(`form_${formKey}`, JSON.stringify(formData));
    }, [formData, formKey]);

    // Clear saved data
    const clearSavedData = useCallback(() => {
        sessionStorage.removeItem(`form_${formKey}`);
        setFormData(initialData);
    }, [formKey, initialData]);

    return {
        formData,
        setFormData,
        clearSavedData
    };
};

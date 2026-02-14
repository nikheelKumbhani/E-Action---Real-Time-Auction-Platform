import { useSessionTimeout } from "../../hooks/useSessionTimeout";
import { SessionWarningModal } from "./SessionWarningModal";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/features/authSlice";
import { useNavigate } from "react-router-dom";

export const SessionManager = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { showWarning, timeRemaining, extendSession } = useSessionTimeout({
        timeout: 30 * 60 * 1000, // 30 minutes
        warningTime: 5 * 60 * 1000, // 5 minutes warning
        onTimeout: () => {
            // Save current location for redirect after login
            const currentPath = window.location.pathname;
            if (currentPath !== '/login' && currentPath !== '/register') {
                sessionStorage.setItem('redirectAfterLogin', currentPath);
            }

            // Logout user
            dispatch(logOut());
            navigate('/login');
        }
    });

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    return (
        <>
            {children}
            <SessionWarningModal
                isOpen={showWarning}
                timeRemaining={timeRemaining}
                onExtend={extendSession}
                onLogout={handleLogout}
            />
        </>
    );
};

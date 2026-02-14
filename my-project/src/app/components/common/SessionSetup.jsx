import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setupSessionInterceptor, checkRedirectAfterLogin } from "../../router";
import { logOut } from "../../redux/features/authSlice";

/**
 * Component to handle session setup inside Router context
 * Must be inside BrowserRouter to use useNavigate
 */
export const SessionSetup = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        // Setup session interceptor
        setupSessionInterceptor(navigate, dispatch, logOut);
    }, [dispatch, navigate]);

    // Check for redirect after login
    useEffect(() => {
        if (isLoggedIn) {
            checkRedirectAfterLogin(navigate);
        }
    }, [isLoggedIn, navigate]);

    return <>{children}</>;
};

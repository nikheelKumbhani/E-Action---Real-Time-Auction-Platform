import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../redux/services/authFeatures"

export const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get user state from Redux

    useEffect(() => {
        let isLoggedIn;

        const redirectLoggedOutUser = async () => {
            try {
                isLoggedIn = await authService.getLogInStatus();
            } catch (error) {
                console.log(error.message);
            }

            if (!isLoggedIn) {
                navigate(path);
                return;
            }
        };

        redirectLoggedOutUser();
    }, [path, navigate]);
};
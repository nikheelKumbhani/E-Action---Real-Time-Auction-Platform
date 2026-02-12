import { useDispatch, useSelector } from "react-redux";
import { getuserProfile, selectIsLoggedIn } from "../redux/features/authSlice";
import { useEffect, useState } from "react";

export const useUserProfile = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { user, isloading } = useSelector((state) => state.auth);

    // Ensuring localStorage parsing is safe
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const [role, setRole] = useState(() => user?.role || parsedUser?.role || "");

    useEffect(() => {
        if (isloading && !user) {
            dispatch(getuserProfile());
        } else if (user) {
            setRole(user.role);
        }
    }, [dispatch, isloading, user]);

    useEffect(() => {
        if (user) {
            setRole(user.role);
        }
    }, [user]);

    return { role, isLoggedIn, isloading };
};

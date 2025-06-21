import axios from "axios";
import { BACKEND_URL } from "../../utils/url";

export const AUTH_URL = `${BACKEND_URL}/users/`;

// ✅ Register User
const register = async (userData) => {
    try {
        const response = await axios.post(AUTH_URL + "register", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Registration failed";
    }
};

// ✅ Login User
const login = async (userData) => {
    try {
        const response = await axios.post(AUTH_URL + "login", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Login failed";
    }
};

// ✅ Logout User
// ✅ Logout User (Fixed)
const logout = async () => {
    try {
        // console.log(AUTH_URL)
        const response = await axios.post(`${AUTH_URL}logout`);
        return response.data?.message || "Logout successful";
    } catch (error) {
        console.log(error.response);
        
        throw new Error(error.response?.data?.message || "Logout failed");
    }
};


// ✅ getLogInStatus User
const getLogInStatus = async () => {
    try {
        const response = await axios.get(AUTH_URL + "loggedin");
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to get login status";
    }
};

// ✅ getuserProfile User
const getuserProfile = async () => {
    try {
        const response = await axios.get(AUTH_URL + "getuser");
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to get login status";
    }
};

// ✅ loginUserAsSeller User
const loginuserAsSeller = async (userData) => {
    try {

        const response = await axios.post(AUTH_URL + "/seller", userData, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) { 
        throw error.response?.data || "Failed to get login status";
    }
};


// ✅ getUserIncome User
const getUserIncome = async () => {
    try {
        const response = await axios.get(AUTH_URL + "sell-amount");
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to get income status";
    }
};

// ✅ getIncome Admin
const getIncome = async () => {
    try {
        const response = await axios.get(AUTH_URL + "estimate-income");
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to get income status";
    }
};
// ✅ getAllUser
const getAllUser = async () => {
    try {
        const response = await axios.get(AUTH_URL + "users");
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to get income status";
    }
};

// ✅ Handle deposit
const deposit = async (amount) => {
    try {
        const response = await axios.post(AUTH_URL + "deposit", { amount });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Deposit failed";
    }
};

// ✅ Handle withdrawal
const withdraw = async (amount) => {
    try {
        const response = await axios.post(AUTH_URL + "withdraw", { amount });
        return response.data;
    } catch (error) {
        throw error.response?.data || "Withdrawal failed";
    }
};

// ✅ Delete user
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${AUTH_URL}delete/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to delete user";
    }
};

// ✅ Get User by ID
const getUserById = async (id) => {
    try {
        const response = await axios.get(`${AUTH_URL}user/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || "Failed to get user details";
    }
};

const authService = {
    register,
    login,
    logout,
    getLogInStatus,
    getuserProfile,
    loginuserAsSeller,
    getUserIncome,
    getIncome,
    getAllUser,
    deposit,
    withdraw,
    deleteUser,
    getUserById,
};

export default authService;

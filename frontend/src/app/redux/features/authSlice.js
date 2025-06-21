import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authFeatures";
import { toast } from "react-toastify";

// ✅ Helper function to safely get user from localStorage
const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
};

const initialState = {
    user: getUserFromLocalStorage(),
    users: [],
    income:null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    isLoggedIn: false,
    message: "",
};

// ✅ Register User
export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        console.log(userData);

        const response = await authService.register(userData);
        if (typeof window !== "undefined") {
            // localStorage.setItem("user", JSON.stringify(response));
        }
        // return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Registration failed");
    }
});

// ✅ Login User
export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const response = await authService.login(userData);
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
});

// ✅ Logout User (Fixed)
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await authService.logout();
        if (typeof window !== "undefined") {
            localStorage.removeItem("user"); // ✅ Clears user from localStorage
        }
        return null;
    } catch (error) {
        0
        console.log(error);

        return thunkAPI.rejectWithValue(error.response?.data || "Logout failed");
    }
});

// ✅ getLogInStatus User (Fixed)
export const getLogInStatus = createAsyncThunk("auth/status", async (_, thunkAPI) => {
    try {
        return await authService.getLogInStatus();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get login status");
    }
});

// ✅ getuserProfile User (Fixed)
export const getuserProfile = createAsyncThunk("auth/profile", async (_, thunkAPI) => {
    try {
        return await authService.getuserProfile();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get login status");
    }
});

// ✅ loginUserAsSeller User (Fixed)
export const loginUserAsSeller = createAsyncThunk("auth/login-as-seller", async (userData, thunkAPI) => {
    try {
        const response = await authService.loginuserAsSeller(userData);
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(response));
        }
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get login as seller.");
    }
});

// ✅ getUserIncome User (Fixed)
export const getUserIncome = createAsyncThunk("auth/sell-amount", async (_, thunkAPI) => {
    try {
        return await authService.getUserIncome();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get to income status");
    }
});

// ✅ getUserIncome User (Fixed)
export const getIncome = createAsyncThunk("auth/sell-amount-of-admin", async (_, thunkAPI) => {
    try {
        return await authService.getIncome();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get income status");
    }
});

// ✅ getAllUser (Fixed)
export const getAllUser = createAsyncThunk("auth/getalluser", async (_, thunkAPI) => {
    try {
        return await authService.getAllUser();
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get all User");
    }
});

// ✅ Handle deposit
export const depositMoney = createAsyncThunk("auth/deposit", async (amount, thunkAPI) => {
    try {
        const response = await authService.deposit(amount);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Deposit failed");
    }
});

// ✅ Handle withdrawal
export const withdrawMoney = createAsyncThunk("auth/withdraw", async (amount, thunkAPI) => {
    try {
        const response = await authService.withdraw(amount);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Withdrawal failed");
    }
});

// Add this before the authSlice definition
export const deleteUser = createAsyncThunk("auth/deleteUser", async (id, thunkAPI) => {
    try {
        await authService.deleteUser(id);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to delete user");
    }
});

// Add this before the authSlice definition
export const getUserById = createAsyncThunk("auth/getUserById", async (id, thunkAPI) => {
    try {
        const response = await authService.getUserById(id);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to get user details");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        RESET(state) {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Handle Registration
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Registration failed";
                state.user = null;
                toast.error(action.payload);
            })

            // ✅ Handle Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                toast.success("Login Successful");
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Login failed";
                state.user = null;
                toast.error(action.payload);
            })


            // ✅ Handle Logout (Fixed)
            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = false; // ✅ Fixed incorrect value
                state.user = null; // ✅ Removes user from Redux state
                toast.success("Logout successfully!");

            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Logout failed";
                toast.error(action.payload);
            })

            // ✅ Handle getLogInStatus (Fixed)
            .addCase(getLogInStatus.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLogInStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = action.payload; // ✅ Ensures correct status
            })
            .addCase(getLogInStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })

            // ✅ Handle getuserProfile (Fixed)
            .addCase(getuserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getuserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true; // ✅ Ensures correct status
                state.user = action.payload; // ✅ Ensures correct status
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(getuserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                localStorage.removeItem("user");
                state.isLoggedIn = true; // ✅ Ensures correct status

            })

            // ✅ Handle loginUserAsSeller
            .addCase(loginUserAsSeller.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUserAsSeller.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                state.isError = false;
                toast.success("You are become a Seller.");
            })
            .addCase(loginUserAsSeller.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload || "Login failed";
                state.user = null;
                toast.error(action.payload);
            })

            // ✅ Handle getUserIncome (Fixed)
            .addCase(getUserIncome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserIncome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true; // ✅ Ensures correct status
                state.income = action.payload; // ✅ Ensures correct status
            })
            .addCase(getUserIncome.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isLoggedIn = true; // ✅ Ensures correct status

            })

            // ✅ Handle getIncome (Fixed)
            .addCase(getIncome.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getIncome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true; // ✅ Ensures correct status
                state.income = action.payload; // ✅ Ensures correct status
            })
            .addCase(getIncome.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isLoggedIn = true; // ✅ Ensures correct status

            })
            // ✅ Handle getAllUser (Fixed)
            .addCase(getAllUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isLoggedIn = true; // ✅ Ensures correct status
                state.users = action.payload; // ✅ Ensures correct status
                state.totalUsers = action.payload?.length; // ✅ Ensures correct status
            })
            .addCase(getAllUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.isLoggedIn = true; // ✅ Ensures correct status

            })
            
            // ✅ Handle deposit
            .addCase(depositMoney.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(depositMoney.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                toast.success("Deposit successful");
            })
            .addCase(depositMoney.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // ✅ Handle withdrawal
            .addCase(withdrawMoney.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(withdrawMoney.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                toast.success("Withdrawal successful");
            })
            .addCase(withdrawMoney.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // ✅ Handle deleteUser
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.users = state.users.filter(user => user._id !== action.payload);
                toast.success("User deleted successfully");
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })

            // ✅ Handle getUserById
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.selectedUser = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { RESET } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectIsSuccess = (state) => state.auth.isSuccess;
export default authSlice.reducer;

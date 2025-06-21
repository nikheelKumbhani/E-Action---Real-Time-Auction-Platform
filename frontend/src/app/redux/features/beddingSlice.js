import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import biddingService from '../services/beddingServices';

const initialState = {
    history: [],
    bidding: null,
    isError: false,
    isLoading: false,
    message: "",
    error: null
};

export const getBiddingHistory = createAsyncThunk(
    'bidding/fetchBiddingHistory',
    async (productId) => {
        try {
            return await biddingService.getBiddingHistory(productId);
        } catch (error) {
            return error.response.data;
        }
    }
);

export const sellProduct = createAsyncThunk(
    'bidding/sellProduct',
    async (productId, thunkAPI) => {
        try {
            const response = await biddingService.sellProduct(productId);
            toast.success("Product sold successfully to highest bidder!");
            return response;
        } catch (error) {
            const message = error.response?.data?.error || "Failed to sell product";
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const placeBid = createAsyncThunk(
    'bidding/placeBid',
    async (bidData, thunkAPI) => {
        try {
            const response = await biddingService.placeBid(bidData);
            toast.success("Bid placed successfully");
            return response;
        } catch (error) {
            const message = error.response?.data?.message || "Failed to place bid";
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const biddingSlice = createSlice({
    name: 'bidding',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBiddingHistory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "";
            })
            .addCase(getBiddingHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.history = action.payload;
                // toast.success("Bidding history fetched successfully");
            })
            .addCase(getBiddingHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                // toast.error("Failed to fetch bidding history");
            })
            .addCase(sellProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "";
            })
            .addCase(sellProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                // toast.success("Product sold successfully");
            })
            .addCase(sellProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                // toast.error("Failed to sell product");
            })
            .addCase(placeBid.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.message = "";
            })
            .addCase(placeBid.fulfilled, (state, action) => {
                state.isLoading = false;
                toast.success("Bid placed successfully");
            })
            .addCase(placeBid.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error("Failed to place bid");
            });
    },
});

export default biddingSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getBiddingHistory = createAsyncThunk(
  'bidding/getBiddingHistory',
  async (productId: string) => {
    const response = await axios.get(`/api/bidding/history/${productId}`);
    return response.data;
  }
);

interface BiddingState {
  biddingHistory: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BiddingState = {
  biddingHistory: [],
  isLoading: false,
  error: null,
};

const biddingSlice = createSlice({
  name: 'bidding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBiddingHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBiddingHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.biddingHistory = action.payload;
        state.error = null;
      })
      .addCase(getBiddingHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default biddingSlice.reducer;

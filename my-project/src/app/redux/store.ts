import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import categoryReducer from "./features/categorySlice";
import productReducer from "./features/productSlice";
import biddingReducer from "./features/biddingSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    category: categoryReducer,
    bidding: biddingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
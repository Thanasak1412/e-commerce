import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    addWishlistStart: (state) => {
      state.isFetching = true;
    },
    addWishlistSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.products.push(payload);
    },
    addWishlistError: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    clearWishlist: (state) => {
      state.products = [];
    },
  },
});

export const {
  addWishlistStart,
  addWishlistSuccess,
  addWishlistError,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;

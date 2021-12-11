import { createSlice } from "@reduxjs/toolkit";

export const brandSlice = createSlice({
  name: "brand",
  initialState: {
    brands: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    // GET ALL
    getBrandStart: (state) => {
      state.isFetching = true;
    },
    getBrandSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.brands = payload;
    },
    getBrandFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { getBrandStart, getBrandSuccess, getBrandFailure } =
  brandSlice.actions;

export default brandSlice.reducer;

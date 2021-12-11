import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isFetching: false,
    isError: false,
  },
  reducers: {
    getCategoryStart: (state) => {
      state.isFetching = true;
    },
    getCategorySuccess: (state, { payload }) => {
      state.isFetching = false;
      state.categories = payload;
    },
    getCategoryFailure: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { getCategoryStart, getCategorySuccess, getCategoryFailure } =
  categorySlice.actions;

export default categorySlice.reducer;

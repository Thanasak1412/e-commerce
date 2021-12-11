import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.currentUser = payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    signoutUser: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      storage.removeItem("persist:root");
    },
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.currentUser = payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signoutUser,
  registerStart,
  registerSuccess,
  registerFailure,
} = userSlice.actions;
export default userSlice.reducer;

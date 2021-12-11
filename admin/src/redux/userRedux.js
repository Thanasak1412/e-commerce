import { createSlice } from "@reduxjs/toolkit";

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
      state.currentUser.push(payload);
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
    },
    addUserStart: (state) => {
      state.isFetching = true;
    },
    addUserSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.currentUser.push(payload);
    },
    addUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
    },
    deleteUserSuccess: (state) => {
      state.isFetching = false;
    },
    deleteUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
    },
    updateUserSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.currentUser = payload;
    },
    updateUserError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,

  logout,

  addUserStart,
  addUserSuccess,
  addUserError,

  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,

  updateUserStart,
  updateUserSuccess,
  updateUserError,
} = userSlice.actions;
export default userSlice.reducer;

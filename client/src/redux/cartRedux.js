import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    totalPrice: 0,
    isFetching: false,
    isError: false,
  },
  reducers: {
    addToCartStart: (state) => {
      state.isFetching = true;
      state.isError = false;
    },
    addToCartSuccess: (state, { payload }) => {
      state.isFetching = false;
      state.products.push(payload);
      state.quantity += 1;
      const payloadProduct = payload.savedCart.products.map(
        (product) => product
      );

      state.totalPrice += payloadProduct[0].totalPrice;
    },
    addToCartError: (state) => {
      state.isFetching = false;
      state.isError = true;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCartStart, addToCartSuccess, addToCartError, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./userRedux";
import { addToCartError, addToCartStart, addToCartSuccess } from "./cartRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  addWishlistError,
  addWishlistStart,
  addWishlistSuccess,
} from "./wishlistRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const addToCart = async (dispatch, userId, product, quantity) => {
  dispatch(addToCartStart());

  try {
    const res = await userRequest.post("/carts", {
      user: userId,
      product,
      quantity,
    });

    if (res.status === 201) {
      dispatch(addToCartSuccess(res.data.cart));
    }
  } catch (error) {
    dispatch(addToCartError());
  }
};

export const addWishlist = async (dispatch, userId, productId, isLiked) => {
  dispatch(addWishlistStart());
  try {
    const res = await userRequest.post("/wishlists", {
      userId,
      product: productId,
      isLiked,
    });

    if (res.status === 200) {
      const { wishlist } = res.data;
      dispatch(addWishlistSuccess(wishlist));
    }
  } catch (error) {
    dispatch(addWishlistError());
  }
};

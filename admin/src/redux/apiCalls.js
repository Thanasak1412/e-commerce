import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserError,
  updateUserStart,
  updateUserSuccess,
  updateUserError,
  loginFailure,
  loginStart,
  loginSuccess,
  addUserStart,
  addUserSuccess,
  addUserError,
} from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { getBrandStart, getBrandSuccess, getBrandFailure } from "./brandRedux";
import {
  getCategoryStart,
  getCategorySuccess,
  getCategoryFailure,
} from "./categoryRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const { data } = await publicRequest.post("/auth/login", user);
    console.log("data", data);
    dispatch(loginSuccess(data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const addUser = async (dispatch, user) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post("/auth/register", user);

    if (res.status === 201) {
      const { data } = res.data;
      dispatch(addUserSuccess(data));
    }
  } catch (error) {
    dispatch(addUserError());
  }
};

export const updateUser = async (dispatch, id, user) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.patch(`/users/${id}`, user);

    if (res.status === 200) {
      const { user } = res.data;
      dispatch(updateUserSuccess(user));
    }
  } catch (error) {
    dispatch(updateUserError(error));
  }
};

export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const { status } = await userRequest.delete(`/users/${id}`);

    if (status === 202) {
      dispatch(deleteUserSuccess());
    }
  } catch (error) {
    dispatch(deleteUserError(error));
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");

    if (res.status === 200) {
      const { products } = res.data;
      dispatch(getProductSuccess(products));
    }
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);

    if (res.status === 202) {
      dispatch(deleteProductSuccess(id));
    }
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (dispatch, id, product) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.patch(`/products/${id}`, product);

    if (res.status === 200) {
      const { product } = res.data;
      dispatch(updateProductSuccess({ id: product._id, product }));
    }
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);

    if (res.status === 201) {
      const { product } = res.data;
      dispatch(addProductSuccess(product));
    }
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getBrands = async (dispatch) => {
  dispatch(getBrandStart());
  try {
    const res = await userRequest.get("/brands");

    if (res.status === 200) {
      const { brands } = res.data;

      dispatch(getBrandSuccess(brands));
    }
  } catch (error) {
    dispatch(getBrandFailure(error));
  }
};

export const getCategories = async (dispatch) => {
  dispatch(getCategoryStart());
  try {
    const res = await userRequest.get("/categories");
    if (res.status === 200) {
      const { data } = res;

      dispatch(getCategorySuccess(data));
    }
  } catch (error) {
    dispatch(getCategoryFailure());
  }
};

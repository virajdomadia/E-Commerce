import axios from "axios";
import {
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_UPDATE_REQUEST,
  ADMIN_ORDER_UPDATE_SUCCESS,
  ADMIN_ORDER_UPDATE_FAIL,
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAIL,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_DELETE_FAIL,
  ADMIN_PRODUCT_ADD_REQUEST,
  ADMIN_PRODUCT_ADD_SUCCESS,
  ADMIN_PRODUCT_ADD_FAIL,
  ADMIN_PRODUCT_UPDATE_REQUEST,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
} from "./types";

// Helper function for authorization headers
const getAuthConfig = (getState) => {
  const { userInfo } = getState().user;
  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
      "Content-Type": "application/json",
    },
  };
};

// Fetch all products for admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_LIST_REQUEST });

    const { data } = await axios.get("/api/admin/products"); // Updated endpoint
    dispatch({ type: ADMIN_PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_LIST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Delete a product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/admin/products/${id}`); // Updated endpoint
    dispatch({ type: ADMIN_PRODUCT_DELETE_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_DELETE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Add new product
export const addProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_ADD_REQUEST });

    const config = getAuthConfig(getState);
    const { data } = await axios.post("/api/admin/products", product, config); // Updated endpoint

    dispatch({ type: ADMIN_PRODUCT_ADD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_ADD_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Update existing product
export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_UPDATE_REQUEST });

    const config = getAuthConfig(getState);
    const { data } = await axios.put(
      `/api/admin/products/${id}`,
      product,
      config
    ); // Updated endpoint

    dispatch({ type: ADMIN_PRODUCT_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Fetch all orders (for admin)
export const getAdminOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ORDER_LIST_REQUEST });

    const config = getAuthConfig(getState);
    const { data } = await axios.get("/api/admin/orders", config); // Updated endpoint

    dispatch({ type: ADMIN_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_ORDER_LIST_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

// Update order status (for admin)
export const updateOrderStatus =
  (orderId, status) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_ORDER_UPDATE_REQUEST });

      const config = getAuthConfig(getState);
      const { data } = await axios.put(
        `/api/admin/orders/${orderId}/status`,
        { status },
        config
      ); // Updated endpoint

      dispatch({ type: ADMIN_ORDER_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADMIN_ORDER_UPDATE_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

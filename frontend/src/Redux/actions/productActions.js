import axios from "axios";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_LOADING,
} from "./types";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_LOADING });

  try {
    const response = await axios.get("/api/products");

    // Extract only the products array
    dispatch({
      type: FETCH_PRODUCTS,
      payload: response.data.products, // Extract products array from the response
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.response?.data.message || error.message,
    });
  }
};

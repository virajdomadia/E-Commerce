import axios from "axios";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_LOADING,
} from "./types";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_LOADING }); // Dispatch loading state

  try {
    const response = await axios.get("/api/products"); // Updated API call using axios

    // Dispatch the fetched data
    dispatch({
      type: FETCH_PRODUCTS,
      payload: response.data, // Use response.data for axios
    });
  } catch (error) {
    // Dispatch error if fetching fails
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.response?.data.message || error.message, // Handle error properly
    });
  }
};

import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_LOADING,
} from "./types";

export const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCTS_LOADING }); // Dispatch loading state

  try {
    const response = await fetch("http://localhost:5000/api/products"); // API call to fetch products

    // Check if the response is successful
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    // Dispatch the fetched data
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    // Dispatch error if fetching fails
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

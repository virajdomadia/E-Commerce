import { FETCH_PRODUCTS, FETCH_PRODUCTS_ERROR } from "./types";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("/api/products"); // API call to fetch products
    const data = await response.json();
    dispatch({
      type: FETCH_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCTS_ERROR,
      payload: error.message,
    });
  }
};

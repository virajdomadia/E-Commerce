import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_LOADING,
} from "../actions/types";

const initialState = {
  products: [], // Initially an empty array
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload, // Ensure the payload is an array of products
      };

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload, // Store the error message
      };

    default:
      return state;
  }
};

export default productReducer;

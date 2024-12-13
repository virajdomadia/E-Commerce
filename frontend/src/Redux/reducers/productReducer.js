import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_LOADING,
} from "../actions/types";

// Initial state for products
const initialState = {
  products: [], // Holds the list of products
  loading: false, // Indicates if the products are being fetched
  error: null, // Stores error message if an error occurs during fetching
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        loading: true, // Set loading to true when fetching products
      };

    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: false, // Set loading to false once data is fetched
        products: action.payload, // Save the fetched products data
      };

    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false, // Set loading to false if there was an error
        error: action.payload, // Store the error message
      };

    default:
      return state;
  }
};

export default productReducer;

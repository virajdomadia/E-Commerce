import {
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FAIL,
  ADMIN_PRODUCT_DELETE_SUCCESS,
  ADMIN_PRODUCT_ADD_REQUEST,
  ADMIN_PRODUCT_ADD_SUCCESS,
  ADMIN_PRODUCT_ADD_FAIL,
  ADMIN_PRODUCT_UPDATE_REQUEST,
  ADMIN_PRODUCT_UPDATE_SUCCESS,
  ADMIN_PRODUCT_UPDATE_FAIL,
  ADMIN_ORDER_LIST_REQUEST,
  ADMIN_ORDER_LIST_SUCCESS,
  ADMIN_ORDER_LIST_FAIL,
  ADMIN_ORDER_UPDATE_REQUEST,
  ADMIN_ORDER_UPDATE_SUCCESS,
  ADMIN_ORDER_UPDATE_FAIL,
} from "../types";

// Admin Product List Reducer
export const adminProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_LIST_REQUEST:
      return { loading: true };
    case ADMIN_PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case ADMIN_PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case ADMIN_PRODUCT_ADD_REQUEST:
    case ADMIN_PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case ADMIN_PRODUCT_ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload],
      };
    case ADMIN_PRODUCT_ADD_FAIL:
    case ADMIN_PRODUCT_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ADMIN_PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    default:
      return state;
  }
};

// Admin Order List Reducer
export const adminOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_LIST_REQUEST:
      return { loading: true };
    case ADMIN_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ADMIN_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Admin Order Update Reducer
export const adminOrderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

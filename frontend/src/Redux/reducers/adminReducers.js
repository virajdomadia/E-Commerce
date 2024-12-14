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
} from "../actions/types";

const initialState = {
  products: [],
  orders: [],
  productLoading: false,
  orderLoading: false,
  productError: null,
  orderError: null,
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // Products
    case ADMIN_PRODUCT_LIST_REQUEST:
      return { ...state, productLoading: true };
    case ADMIN_PRODUCT_LIST_SUCCESS:
      return { ...state, productLoading: false, products: action.payload };
    case ADMIN_PRODUCT_LIST_FAIL:
      return { ...state, productLoading: false, productError: action.payload };

    case ADMIN_PRODUCT_ADD_REQUEST:
      return { ...state, productLoading: true };
    case ADMIN_PRODUCT_ADD_SUCCESS:
      return {
        ...state,
        productLoading: false,
        products: [...state.products, action.payload],
      };
    case ADMIN_PRODUCT_ADD_FAIL:
      return { ...state, productLoading: false, productError: action.payload };

    case ADMIN_PRODUCT_UPDATE_REQUEST:
      return { ...state, productLoading: true };
    case ADMIN_PRODUCT_UPDATE_SUCCESS:
      return {
        ...state,
        productLoading: false,
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    case ADMIN_PRODUCT_UPDATE_FAIL:
      return { ...state, productLoading: false, productError: action.payload };

    case ADMIN_PRODUCT_DELETE_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload
        ),
      };
    case ADMIN_PRODUCT_DELETE_FAIL:
      return { ...state, productError: action.payload };

    // Orders
    case ADMIN_ORDER_LIST_REQUEST:
      return { ...state, orderLoading: true };
    case ADMIN_ORDER_LIST_SUCCESS:
      return { ...state, orderLoading: false, orders: action.payload };
    case ADMIN_ORDER_LIST_FAIL:
      return { ...state, orderLoading: false, orderError: action.payload };

    case ADMIN_ORDER_UPDATE_REQUEST:
      return { ...state, orderLoading: true };
    case ADMIN_ORDER_UPDATE_SUCCESS:
      return {
        ...state,
        orderLoading: false,
        orders: state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case ADMIN_ORDER_UPDATE_FAIL:
      return { ...state, orderLoading: false, orderError: action.payload };

    default:
      return state;
  }
};

export default adminReducer;

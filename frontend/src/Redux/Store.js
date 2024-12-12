import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import {
  adminProductListReducer,
  adminOrderListReducer,
  adminOrderUpdateReducer,
} from "./reducers/adminReducers"; // Import admin reducers

// Configure the store with reducers
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    adminProductList: adminProductListReducer, // Admin reducer for product list
    adminOrderList: adminOrderListReducer,
    adminOrderUpdate: adminOrderUpdateReducer, // Admin reducer for order list
  },
});

export default store;

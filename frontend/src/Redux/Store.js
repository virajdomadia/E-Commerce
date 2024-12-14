import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import adminReducer from "./reducers/adminReducers"; // Correct import of default export

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    admin: adminReducer, // Use default export here
  },
});

export default store;

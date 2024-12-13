import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";
import adminReducer from "./reducers/adminReducers"; // Import admin reducers

// Configure the store with reducers
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    admin: adminReducer,
  },
});

export default store;

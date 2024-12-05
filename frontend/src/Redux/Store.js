import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";
import productReducer from "./reducers/productReducer";

// Configure the store with reducers
const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
  },
});

export default store;

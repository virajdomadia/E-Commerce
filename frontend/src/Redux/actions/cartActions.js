import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "./types";

// Add item to cart
export const addToCart = (product, quantity) => async (dispatch, getState) => {
  // Making the API call to update cart on server if needed
  try {
    const { data } = await axios.post("/api/cart", { product, quantity }); // Updated API endpoint
    dispatch({
      type: CART_ADD_ITEM,
      payload: { ...product, quantity, data }, // Include the response data if necessary
    });

    // Saving cart items to localStorage for persistence across sessions
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

// Remove item from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/cart/${id}`); // Updated API endpoint to remove item from cart

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

// Save shipping address
export const saveShippingAddress = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    });

    localStorage.setItem("shippingAddress", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving shipping address:", error);
  }
};

// Save payment method
export const savePaymentMethod = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    });

    localStorage.setItem("paymentMethod", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving payment method:", error);
  }
};

// Clear cart after order is placed
export const clearCart = () => async (dispatch) => {
  try {
    dispatch({
      type: CART_CLEAR_ITEMS,
    });

    localStorage.removeItem("cartItems");
  } catch (error) {
    console.error("Error clearing the cart:", error);
  }
};

// Update item quantity in the cart
export const updateCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.put(`/api/cart/${id}`, { quantity }); // Make API call to update cart on server

    dispatch({
      type: CART_ADD_ITEM, // Using the same type as adding an item to update the quantity
      payload: { ...data.product, quantity, data },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    ); // Save updated cart to localStorage
  } catch (error) {
    console.error("Error updating item in cart:", error);
  }
};

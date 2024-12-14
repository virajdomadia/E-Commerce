import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "./types";

const token = localStorage.getItem("authToken");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  },
};

// Add item to cart
export const addToCart =
  (product, quantity = 1) =>
  async (dispatch, getState) => {
    try {
      let productId = product;
      let productDetails = product;

      if (typeof product === "string" || !product._id) {
        const { data } = await axios.get(`/api/products/${productId}`);
        productDetails = data;
      }

      if (!productDetails._id) {
        console.error("Product ID is required.");
        return;
      }

      // Adding to cart logic
      const { data } = await axios.post(
        "/api/cart",
        { productId: productDetails._id, quantity },
        config
      );

      dispatch({
        type: CART_ADD_ITEM,
        payload: { ...productDetails, quantity, data: data.product }, // Ensure correct product data
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.error(
        "Error adding item to cart:",
        error.response ? error.response.data : error.message
      );
    }
  };

// Remove item from cart
export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/cart/${id}`, config);

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error(
      "Error removing item from cart:",
      error.response ? error.response.data : error.message
    );
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
    const { data } = await axios.put(`/api/cart/${id}`, { quantity }, config);

    dispatch({
      type: CART_ADD_ITEM,
      payload: { ...data.product, quantity, data },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    console.error(
      "Error updating item in cart:",
      error.response ? error.response.data : error.message
    );
  }
};

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product, quantity = 1) => {
    const token = localStorage.getItem("token");
    try {
      // Check if product already in cart locally
      const existingItem = cart.find(
        (item) => item.product?._id === product._id
      );
      if (existingItem) {
        // Just update quantity
        updateQuantity(product._id, existingItem.quantity + quantity);
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/cart/add",
          { productId: product._id, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Backend returns full cart object with items array
        if (res.data && Array.isArray(res.data.items)) {
          setCart(res.data.items);
        } else {
          console.error("Unexpected response from /cart/add:", res.data);
        }
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && Array.isArray(res.data.items)) {
        setCart(res.data.items);
      } else {
        console.error("Unexpected response from /cart/update:", res.data);
      }
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data && Array.isArray(res.data.items)) {
        setCart(res.data.items);
      } else {
        // Fallback local update
        setCart((prev) =>
          prev.filter((item) => item.product?._id !== productId)
        );
      }
    } catch (error) {
      console.error("Failed to remove from cart", error);
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

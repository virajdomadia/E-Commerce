import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart");
        setCart(response.data.cart);
        calculateTotalAmount(response.data.cart);
        setLoading(false);
      } catch (error) {
        setError("Failed to load cart");
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const calculateTotalAmount = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      setCart(cart.filter((item) => item._id !== itemId));
      calculateTotalAmount(cart.filter((item) => item._id !== itemId));
    } catch (error) {
      setError("Failed to remove item from cart");
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        return;
      }
      const response = await axios.put(`/api/cart/${itemId}`, { quantity });
      const updatedCart = cart.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
      calculateTotalAmount(updatedCart);
    } catch (error) {
      setError("Failed to update quantity");
    }
  };
  return (
    <div className="cart">
      <h1>Cart</h1>
      {loading && <p>Loading your Cart.....</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.product.name}</h3>
                <p>${item.product.price}</p>
                <div className="quantity">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <p>Total: ${item.product.price * item.quantity}</p>
                <button
                  className="remove-item"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No Item in your cart</p>
      )}
      {cart.length > 0 && (
        <div className="cart-summary">
          <h3>Cart Summary</h3>
          <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          <button className="checkout-button">Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

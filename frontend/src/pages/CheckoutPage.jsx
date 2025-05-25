import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (acc, item) =>
      item.product && item.product.price
        ? acc + item.product.price * item.quantity
        : acc,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/checkout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message) {
        setMessage(res.data.message);
        clearCart();
      }
    } catch (error) {
      setMessage("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        <p>
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      {cart
        .filter((item) => item.product)
        .map(({ product, quantity }) => (
          <div key={product._id} className="flex justify-between mb-3">
            <div>
              {product.title} x {quantity}
            </div>
            <div>₹{product.price * quantity}</div>
          </div>
        ))}
      <hr className="my-4" />
      <div className="flex justify-between font-bold text-lg">
        <div>Total:</div>
        <div>₹{totalPrice}</div>
      </div>

      {message && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default CheckoutPage;

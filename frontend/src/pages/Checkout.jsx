import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from "../redux/actions/types"; // Import action types
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Get cart items from the Redux store
  const { cartItems } = useSelector((state) => state.cart);

  // Local state for user inputs (shipping, payment, etc.)
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity, // Use optional chaining here
      0
    );
  };

  // Handle item quantity change
  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        payload: productId,
      });
    } else {
      dispatch({
        type: UPDATE_CART,
        payload: { productId, quantity },
      });
    }
  };

  // Handle item removal from the cart
  const handleRemoveFromCart = (productId) => {
    dispatch({
      type: REMOVE_FROM_CART,
      payload: productId,
    });
  };

  // Handle checkout submission (for example, redirect to payment page)
  const handleCheckout = () => {
    if (!shippingAddress || !paymentMethod) {
      alert("Please complete the shipping and payment details.");
      return;
    }

    // Handle checkout logic (e.g., create order, redirect, etc.)
    // You might want to send an API request to create an order
    navigate("/payment"); // Use navigate to redirect to payment page
  };

  return (
    <div>
      <h1>Checkout</h1>

      {/* Cart Items */}
      <div>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product?._id}>
                <div>
                  <h3>{item.product?.name || "Product Name Not Available"}</h3>{" "}
                  {/* Optional chaining */}
                  <p>{item.product?.price || "Price not available"} USD</p>{" "}
                  {/* Optional chaining */}
                  <div>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product?._id,
                          item.quantity - 1
                        )
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.product?._id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product?._id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item.product?._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping Details */}
      <div>
        <h2>Shipping Information</h2>
        <input
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      </div>

      {/* Payment Method */}
      <div>
        <h2>Payment Method</h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="PayPal">PayPal</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      {/* Order Summary */}
      <div>
        <h2>Order Summary</h2>
        <p>Total: {calculateTotal()} USD</p>
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Checkout;

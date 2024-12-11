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
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");

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

  // Function to create Razorpay order on your backend
  const createRazorpayOrder = async () => {
    const orderData = {
      amount: calculateTotal() * 100, // Amount in paise (e.g., $10 = 1000 paise)
      shippingAddress,
    };

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const order = await response.json();
    return order;
  };

  // Function to handle payment through Razorpay
  const handleRazorpayPayment = async () => {
    if (!shippingAddress) {
      alert("Please complete the shipping details.");
      return;
    }

    try {
      // Step 1: Create Razorpay order on backend
      const order = await createRazorpayOrder();

      // Step 2: Trigger Razorpay Checkout
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Test Key ID
        amount: order.amount, // Amount in paise
        currency: "INR",
        name: "Your Company",
        description: "Test Transaction",
        order_id: order.id, // Razorpay Order ID
        handler: async function (response) {
          const verifyResponse = await fetch("/api/payment/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("Payment Successful!");
            navigate("/order-success"); // Redirect to order success page
          } else {
            alert("Payment Verification Failed!");
          }
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment Failed! Please try again.");
    }
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
                  <h3>{item.product?.name || "Product Name Not Available"}</h3>
                  <p>{item.product?.price || "Price not available"} USD</p>
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

      {/* Payment Method (Now only Razorpay) */}
      <div>
        <h2>Payment Method</h2>
        <p>Payment Method: Razorpay</p>
      </div>

      {/* Order Summary */}
      <div>
        <h2>Order Summary</h2>
        <p>Total: {calculateTotal()} USD</p>
        <button onClick={handleRazorpayPayment}>Pay with Razorpay</button>
      </div>
    </div>
  );
};

export default Checkout;

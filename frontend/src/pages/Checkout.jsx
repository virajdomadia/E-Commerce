import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCart } from "../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Razorpay");
  const [loading, setLoading] = useState(false); // For loading state during payment process

  const calculateTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(productId)); // Dispatch the remove action
    } else {
      dispatch(updateCart(productId, quantity)); // Dispatch the update action
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId)); // Dispatch the remove action
  };

  const createRazorpayOrder = async () => {
    const orderData = {
      amount: calculateTotal() * 100, // Amount in paise
      shippingAddress,
    };

    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Failed to create Razorpay order");
    }

    const order = await response.json();
    return order;
  };

  const handleRazorpayPayment = async () => {
    if (!shippingAddress) {
      alert("Please complete the shipping details.");
      return;
    }

    try {
      setLoading(true); // Set loading state before payment starts

      const order = await createRazorpayOrder();

      const options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: order.amount,
        currency: "INR",
        name: "Your Company",
        description: "Test Transaction",
        order_id: order.id,
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
            navigate("/order-success");
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
    } finally {
      setLoading(false); // Reset loading state after payment attempt
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      {/* Cart Items */}
      <div>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. <a href="/">Go shopping</a>
          </p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product?._id}>
                <div>
                  <h3>{item.product?.name || "Product Name Not Available"}</h3>
                  <p>
                    {item.product?.price?.toFixed(2) || "Price not available"}{" "}
                    USD
                  </p>
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
        <p>Payment Method: Razorpay</p>
      </div>

      {/* Order Summary */}
      <div>
        <h2>Order Summary</h2>
        <p>Total: ₹{calculateTotal().toFixed(2)}</p>
        <button onClick={handleRazorpayPayment} disabled={loading}>
          {loading ? "Processing..." : "Pay with Razorpay"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;

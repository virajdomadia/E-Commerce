import React, { useState } from "react";

const RazorpayCheckout = () => {
  const createOrderAPI = "http://localhost:5000/api/payment/create-order"; // Replace with your backend API
  const verifyPaymentAPI = "http://localhost:5000/api/payment/verify-payment"; // Replace with your backend API
  const razorpayTestKey = "rzp_test_lPRyx2UFEHSZNb"; // Replace with your Razorpay Test Key ID

  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Please try again.");
      setLoading(false);
      return;
    }

    try {
      // Step 1: Create Order on Backend
      const orderResponse = await fetch(createOrderAPI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 50000 }), // Amount in paise (₹500.00)
      });

      const orderData = await orderResponse.json();

      if (!orderData || !orderData.id) {
        alert("Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      // Step 2: Configure Razorpay Checkout
      const options = {
        key: razorpayTestKey, // Razorpay Test Key ID
        amount: orderData.amount, // Amount in paise
        currency: "INR",
        name: "Test Company",
        description: "Test Transaction",
        order_id: orderData.id, // Order ID from backend
        handler: async function (response) {
          // Step 3: Verify Payment on Backend
          const verifyResponse = await fetch(verifyPaymentAPI, {
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
          } else {
            alert("Payment Verification Failed!");
          }
          setLoading(false);
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handlePayment} style={styles.button} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

const styles = {
  button: {
    backgroundColor: "#3399cc",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default RazorpayCheckout;

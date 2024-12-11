const express = require("express");
const router = express.Router();
const razorpay = require("../config/razorpay");
const crypto = require("crypto");

// Middleware to parse JSON bodies
router.use(express.json());

// Create Order
router.post("/create-order", async (req, res) => {
  const { amount, currency } = req.body; // Amount in paise (₹1 = 100 paise)

  try {
    const options = {
      amount: amount, // e.g., ₹500 = 50000 paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`, // Unique identifier for this order
    };

    const order = await razorpay.orders.create(options); // Create order in Razorpay
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment verified successfully
      res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      // Verification failed
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

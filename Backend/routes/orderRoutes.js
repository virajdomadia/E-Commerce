const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create an order
router.post("/", protect, async (req, res) => {
  const { items, totalPrice, shippingAddress, paymentMethod } = req.body;
  const userId = req.user._id; // Get user ID from the authenticated user

  // Ensure that required fields are provided
  if (!items || !totalPrice || !shippingAddress || !paymentMethod) {
    return res
      .status(400)
      .json({
        message:
          "Items, total price, shipping address, and payment method are required",
      });
  }

  try {
    const order = new Order({
      user: userId, // Use `user` instead of `userId` as per the schema
      items,
      totalAmount: totalPrice, // Ensure totalAmount is set correctly based on schema
      shippingAddress,
      paymentMethod,
      isPaid: false, // Assuming the order is unpaid initially
      isDelivered: false, // Assuming the order is not delivered initially
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch all orders (admin only)
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Fetch user's orders
router.get("/user", protect, async (req, res) => {
  const userId = req.user._id; // Get user ID from the authenticated user

  try {
    const orders = await Order.find({ user: userId }).populate(
      "user",
      "name email"
    );
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

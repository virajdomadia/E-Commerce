const express = require("express");
const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Admin Registration
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new user with isAdmin set to true
    const adminUser = new User({
      name,
      email,
      password,
      isAdmin: true, // This user will be an admin
    });

    // Encrypt the password
    adminUser.password = await bcrypt.hash(adminUser.password, 10);

    // Save the admin user to the database
    await adminUser.save();

    res
      .status(201)
      .json({ message: "Admin registered successfully", adminUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering admin", error: err.message });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password." });
  }

  try {
    const adminUser = await User.findOne({ email });
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: adminUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(200).json({
      token,
      message: "Login successful",
      user: {
        _id: adminUser._id,
        name: adminUser.name,
        email: adminUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Admin route to add a new product
router.post("/products", adminMiddleware, async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});

// Admin route to update an existing product
router.put("/products/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, stock } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, category, stock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Admin route to delete a product
router.delete("/products/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

// Admin route to get all orders
router.get("/orders", adminMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.status(200).json({ orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
});

// Admin route to update order status
router.put("/orders/:id/status", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // New status like "Shipped", "Delivered", etc.

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
});

// Admin Dashboard Overview - Aggregated Data
router.get("/dashboard", adminMiddleware, async (req, res) => {
  try {
    // Aggregate total number of products, orders, and users
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();

    // Return aggregated data in response
    res.status(200).json({
      totalProducts,
      totalOrders,
      totalUsers,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching dashboard data", error: error.message });
  }
});

module.exports = router;

const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware"); // Import the protect middleware
const router = express.Router();

// Add item to cart (protected route)
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id; // Get user ID from the middleware

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "Product ID and quantity are required" });
  }

  if (quantity <= 0) {
    return res
      .status(400)
      .json({ message: "Quantity must be a positive number" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    // Check if the user already has a cart
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ user: userId, items: [] });
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (existingItemIndex >= 0) {
      // Update quantity if product already exists in the cart
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new product to the cart
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart to the database
    await cart.save();

    res.status(201).json({ message: "Item added to cart successfully", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get items in the user's cart (protected route)
router.get("/", protect, async (req, res) => {
  const userId = req.user._id; // Get user ID from the authenticated user

  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: "No items found in the cart" });
    }

    res.status(200).json({ cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete item from cart (protected route)
router.delete("/:itemId", protect, async (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Get user ID from the authenticated user

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Remove item from the cart
    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;

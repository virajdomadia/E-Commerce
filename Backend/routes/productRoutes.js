const express = require("express");
const Product = require("../models/Product");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// Route to get all products (anyone can view)
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const totalProducts = await Product.countDocuments(); // Get total count of products
    const products = await Product.find().skip(skip).limit(limit);

    res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Route to get a single product by ID (anyone can view)
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by its ID
    const product = await Product.findById(id);

    // If the product doesn't exist, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the product as the response
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

module.exports = router;

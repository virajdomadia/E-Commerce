const express = require("express");
const Product = require("../models/Product");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();

// Route to add a new product (admin only)
router.post("/", adminMiddleware, async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;

  // Basic validation
  if (!name || !price || !category) {
    return res
      .status(400)
      .json({ message: "Name, price, and category are required." });
  }

  try {
    // Create a new product object
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
    });

    // Save the new product to the database
    await newProduct.save();

    // Return the saved product as the response
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});

// Route to update an existing product (admin only)
router.put("/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category, stock } = req.body;

  try {
    // Find the product by its ID and update it
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, image, category, stock },
      { new: true } // Return the updated product
    );

    // If the product doesn't exist, return a 404 error
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return the updated product as the response
    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

// Route to delete a product (admin only)
router.delete("/:id", adminMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the product by its ID and delete it
    const product = await Product.findByIdAndDelete(id);

    // If the product doesn't exist, return a 404 error
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Return a success message
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
  }
});

// Route to get all products (anyone can view)
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    // Fetch all products from the database
    const products = await Product.find().skip(skip).limit(limit);

    // Return the list of products as the response
    res.status(200).json(products);
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

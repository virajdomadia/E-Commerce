const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    match: /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i, // Example regex for image URLs
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0, // Default stock is 0
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

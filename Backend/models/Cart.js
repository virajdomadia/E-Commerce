const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures that the user field is mandatory
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true, // Ensures that the product field is mandatory
        },
        quantity: {
          type: Number,
          required: true, // Ensures that quantity is mandatory
          default: 1,
          min: 1, // Prevents negative or zero quantities
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

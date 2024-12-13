import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions"; // Import correct actions
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Handle updating item quantity
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(addToCart(item.product, newQuantity)); // Call action to update quantity
    }
  };

  // Handle removing the item from the cart
  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.product._id)); // Call action to remove item
  };

  return (
    <div className="cart-item">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="cart-item-image"
      />

      <div className="cart-item-details">
        <h4>{item.product.name}</h4>
        <p>Price: ₹{item.product.price}</p>
        <p>Subtotal: ₹{(item.product.price * item.quantity).toFixed(2)}</p>
      </div>

      {/* Quantity controls */}
      <div className="quantity-controls">
        <button onClick={() => handleQuantityChange(item.quantity - 1)}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={() => handleQuantityChange(item.quantity + 1)}>
          +
        </button>
      </div>

      <button className="remove-button" onClick={handleRemoveItem}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;

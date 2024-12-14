import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(addToCart(item.product, newQuantity));
    }
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.product._id));
  };

  return (
    <div className="cart-item">
      <img
        src={
          item.product?.image ||
          "https://dummyimage.com/200x200/000/fff.jpg&text=image+placeholder"
        }
        alt={item.product?.name || "Product"}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        <h4>{item.product?.name || "Unknown Product"}</h4>
        <p>Price: ₹{item.product?.price?.toFixed(2) || "0.00"}</p>
        <p>Subtotal: ₹{(item.product?.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className="quantity-controls">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
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

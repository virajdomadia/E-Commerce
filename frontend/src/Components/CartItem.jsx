import React, { useState } from "react";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.product));
  };

  const handleQuantityChange = (e) => {
    const newQuantity = e.target.value;
    if (newQuantity <= 0) {
      return;
    }
    setQuantity(newQuantity);
    dispatch(updateCartItem(item.product, newQuantity));
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
        <p>${item.product.price}</p>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          className="cart-item-quantity"
        />
        <button onClick={handleRemove} className="cart-item-remove">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

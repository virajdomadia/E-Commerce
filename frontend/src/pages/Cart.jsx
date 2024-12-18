import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateCart,
} from "../redux/actions/cartActions";
import { Link } from "react-router-dom";
import "./Cart.css";
import emptyCart from "../assets/Images/empty-cart.png";
import Checkout from "./Checkout";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Mock loading, replace with real API call if needed
  }, []);

  const calculateTotal = () =>
    cartItems.reduce(
      (acc, item) => acc + (item.product?.price || 0) * item.quantity,
      0
    );

  const handleRemove = (productId) => dispatch(removeFromCart(productId));

  const handleQuantityChange = (productId, quantity) =>
    quantity > 0 && dispatch(updateCart(productId, quantity));

  const handleClearCart = () => dispatch(clearCart());

  if (loading) return <div className="loading-spinner">Loading...</div>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div>
          <img src={emptyCart} alt="Empty Cart" className="empty-cart-image" />
          <p>Your cart is empty. Why not check out our latest products?</p>
          <Link to="/" className="back-to-home-btn">
            Go back to shopping
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          <div className="cart-header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span>Actions</span>
          </div>
          {cartItems.map((item, index) => (
            <div key={item.product?._id || index} className="cart-item">
              <img
                src={
                  item.product?.image ||
                  "https://dummyimage.com/200x200/000/fff.jpg&text=image+placeholder"
                }
                alt={item.product?.name || "Product"}
                className="cart-item-image"
              />
              <Link
                to={`/product/${item.product?._id}`}
                className="cart-item-name"
              >
                {item.product?.name || "Unknown Product"}
              </Link>
              <div>₹{item.product?.price?.toFixed(2) || "0.00"}</div>
              <div>
                <button
                  onClick={() =>
                    handleQuantityChange(item.product?._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.product?._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div>
                ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
              </div>
              <button onClick={() => handleRemove(item.product?._id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
            <button onClick={handleClearCart}>Clear Cart</button>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

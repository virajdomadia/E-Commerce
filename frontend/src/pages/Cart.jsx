import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/actions/cartActions";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  // Get cart items from Redux store
  const cart = useSelector((state) => state.cart.items);

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  };

  // Remove item from cart
  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Update cart quantity
  const handleQuantityChange = (productId, quantity) => {
    dispatch(addToCart({ product: productId, quantity }));
  };

  // Clear the entire cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    if (cart.length === 0) {
      // Redirect to home if the cart is empty (optional)
    }
  }, [cart]);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
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

          {cart.map((item) => (
            <div key={item.product._id} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <Link
                  to={`/product/${item.product._id}`}
                  className="cart-item-name"
                >
                  {item.product.name}
                </Link>
              </div>
              <div className="cart-item-price">
                ${item.product.price.toFixed(2)}
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.product._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
              <div className="cart-item-actions">
                <button
                  onClick={() => handleRemove(item.product._id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <div className="total-price">
              <h3>Total: ${calculateTotal().toFixed(2)}</h3>
            </div>
            <div className="cart-actions">
              <button onClick={handleClearCart} className="clear-cart-btn">
                Clear Cart
              </button>
              <Link to="/checkout" className="checkout-btn">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

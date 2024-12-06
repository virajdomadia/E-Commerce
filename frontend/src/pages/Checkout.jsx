import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/actions/cartActions";
import "./Checkout.css";

const Checkout = () => {
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

  // Shipping details state
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle order submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !shippingAddress.address ||
      !shippingAddress.city ||
      !shippingAddress.postalCode ||
      !shippingAddress.country
    ) {
      alert("Please fill in all shipping details.");
      return;
    }

    // Simulate order creation (you can replace this with actual API call)
    alert("Order placed successfully!");

    // Clear the cart after order is placed
    dispatch(clearCart());

    // Redirect to order confirmation page (optional)
  };

  useEffect(() => {
    if (cart.length === 0) {
      // Redirect to home page if the cart is empty (optional)
    }
  }, [cart]);

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/" className="back-to-home-btn">
            Go back to shopping
          </Link>
        </div>
      ) : (
        <div className="checkout-container">
          <div className="checkout-items">
            <h3>Order Summary</h3>
            {cart.map((item) => (
              <div key={item.product._id} className="checkout-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <Link
                    to={`/product/${item.product._id}`}
                    className="checkout-item-name"
                  >
                    {item.product.name}
                  </Link>
                  <span>Quantity: {item.quantity}</span>
                  <span>Price: ${item.product.price.toFixed(2)}</span>
                </div>
              </div>
            ))}

            <div className="total-price">
              <h4>Total: ${calculateTotal().toFixed(2)}</h4>
            </div>
          </div>

          <div className="checkout-form">
            <h3>Shipping Details</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Postal Code:
                <input
                  type="text"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Country:
                <input
                  type="text"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <button type="submit" className="submit-order-btn">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;

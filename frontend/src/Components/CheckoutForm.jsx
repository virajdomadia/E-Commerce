import React, { useState } from "react";

const CheckoutForm = ({ onsubmit }) => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "paypal",
  });

  const handleChenge = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onsubmit(formData);
  };
  return (
    <div>
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Shipping Address</h2>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Payment Method</h2>
        <div className="form-group">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked={formData.paymentMethod === "PayPal"}
              onChange={handleChange}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="Stripe"
              checked={formData.paymentMethod === "Stripe"}
              onChange={handleChange}
            />
            Stripe
          </label>
        </div>

        <button type="submit" className="checkout-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

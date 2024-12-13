import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Product Image */}
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>

      {/* Product Details */}
      <div className="product-details">
        <h3 className="product-name">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">
          {product.description.substring(0, 100)}...
        </p>
      </div>

      {/* Add to Cart Button */}
      <button className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductCard;

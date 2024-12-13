import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1)); // Adding 1 by default, can adjust for quantity
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div> {/* Add your spinner here */}
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Error: {error}{" "}
        <button onClick={() => dispatch(fetchProducts())}>Retry</button>
      </div>
    );
  }

  if (products.length === 0) {
    return <div>No products available at the moment.</div>;
  }

  return (
    <div className="home-page">
      <h2>Welcome to Our Store</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="cart-item-image"
            />
            <div className="product-info">
              <Link to={`/product/${product._id}`} className="product-name">
                {product.name}
              </Link>
              <p className="product-description">{product.description}</p>
              <span className="product-price">
                ₹{product.price?.toFixed(2) || "0.00"}
              </span>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

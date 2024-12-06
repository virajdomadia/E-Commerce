import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";

const Home = () => {
  const dispatch = useDispatch();

  // Fetch products from the Redux store
  const { products, loading, error } = useSelector((state) => state.products);

  // Fetch the products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle adding a product to the cart
  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1)); // Adding 1 by default, can adjust for quantity
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
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
              className="product-image"
            />
            <div className="product-info">
              <Link to={`/product/${product._id}`} className="product-name">
                {product.name}
              </Link>
              <p className="product-description">{product.description}</p>
              <span className="product-price">${product.price}</span>
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

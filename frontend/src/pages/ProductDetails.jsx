import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";
import "./ProductDetails.css";

const ProductDetail = () => {
  const { productId } = useParams(); // Get product ID from URL params
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for product details

  useEffect(() => {
    // Fetch product details by productId
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= product.stock) {
      dispatch(addToCart({ ...product, quantity }));
    }
  };

  const handleQuantityChange = (e) => {
    let value = Math.max(1, e.target.value); // Ensure quantity is at least 1
    value = value > product.stock ? product.stock : value; // Don't exceed stock
    setQuantity(value);
  };

  if (loading) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="product-detail-page">
      {error && <p className="error-message">{error}</p>}
      {product ? (
        <div className="product-detail">
          <div className="product-image">
            <img
              src={
                product.image ||
                "https://dummyimage.com/200x200/000/fff.jpg&text=image+placeholder"
              }
              alt={product.name}
            />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-stock">Stock: {product.stock}</p>
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity: </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
            <button
              onClick={handleAddToCart}
              className="add-to-cart-btn"
              disabled={product.stock === 0 || quantity <= 0}
            >
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      ) : (
        <p>No product details available.</p>
      )}
    </div>
  );
};

export default ProductDetail;

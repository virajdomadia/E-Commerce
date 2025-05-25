import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://e-commerce-backend-dfvz.onrender.com/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    const checkUser = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);

      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setIsAdmin(payload?.role === "admin");
        } catch {
          setIsAdmin(false);
        }
      }
    };

    fetchProduct();
    checkUser();
  }, [id]);

  const handleEdit = () => navigate(`/admin/edit-product/${id}`);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://e-commerce-backend-dfvz.onrender.com/api/products/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Product deleted successfully.");
      navigate("/admin");
    } catch (error) {
      alert("Failed to delete product.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <img
        src={product.images?.[0] || "/placeholder-image.png"}
        alt={product.title}
        className="w-full md:w-1/2 object-cover rounded-lg"
      />

      <div className="flex-1">
        {product.isFeatured && (
          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full mb-3">
            Featured
          </span>
        )}

        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-lg text-yellow-600 font-semibold mb-1">
          ₹{product.price}
        </p>
        <p className="text-sm text-purple-600 uppercase mb-4">
          {product.category}
        </p>
        <p className="text-gray-800 mb-6">{product.description}</p>
        <p className="text-sm font-medium mb-4">
          {product.countInStock > 0 ? (
            <span className="text-green-600">
              In Stock: {product.countInStock}
            </span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        {isAdmin ? (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-lg shadow-md hover:brightness-110 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ) : (
          isLoggedIn &&
          product.countInStock > 0 && (
            <button
              onClick={() => addToCart(product)}
              className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
            >
              Add to Cart
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

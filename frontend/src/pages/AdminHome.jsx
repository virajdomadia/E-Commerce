import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-backend-dfvz.onrender.com/api/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const handleAddProduct = () => navigate("/admin/add-product");
  const handleEdit = (product) =>
    navigate(`/admin/edit-product/${product._id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to perform this action.");
        return;
      }

      await axios.delete(
        `https://e-commerce-backend-dfvz.onrender.com/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== id));
      alert("Product deleted successfully.");
    } catch (error) {
      console.error("Failed to delete product", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showActions={true}
              showAddToCart={false}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isAdmin={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminHome;

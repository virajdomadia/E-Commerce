import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from "../redux/actions/adminActions";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm"; // A form for adding/updating products

const ManageProducts = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProductList
  );

  const [editingProduct, setEditingProduct] = useState(null); // To track product being edited

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  // Handle product deletion
  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  // Handle adding a new product
  const handleAddProduct = (productData) => {
    dispatch(addProduct(productData));
    setEditingProduct(null); // Clear editing state after adding
  };

  // Handle updating an existing product
  const handleUpdateProduct = (productData) => {
    dispatch(updateProduct(productData));
    setEditingProduct(null); // Clear editing state after updating
  };

  // Handle editing a product (populate form with product data)
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Handle canceling editing
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div>
      <h1>Manage Products</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {/* Product Form for Adding/Editing */}
      <div>
        <h2>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
        <ProductForm
          product={editingProduct} // Pass product data if editing
          onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} // Handle add or update
          onCancel={handleCancelEdit} // Handle cancel edit
        />
      </div>

      {/* Product List */}
      <div>
        <h2>Product List</h2>
        <ProductList
          products={products}
          onDelete={handleDelete}
          onEdit={handleEdit} // Pass edit handler to the ProductList
        />
      </div>
    </div>
  );
};

export default ManageProducts;

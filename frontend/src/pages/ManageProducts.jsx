import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts, deleteProduct } from "../redux/actions/adminActions";
import ProductList from "../components/ProductList";

const ManageProducts = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.adminProductList
  );

  useEffect(() => {
    dispatch(getAdminProducts()); // Fetch products when component mounts
  }, [dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div>
      <h1>Manage Products</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ProductList products={products} onDelete={handleDelete} />
    </div>
  );
};

export default ManageProducts;

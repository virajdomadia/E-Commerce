import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/actions/adminActions";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { products } = useSelector((state) => state.adminProductList);

  useEffect(() => {
    if (id) {
      const productToEdit = products.find((product) => product._id === id);
      if (productToEdit) {
        setName(productToEdit.name);
        setPrice(productToEdit.price);
        setDescription(productToEdit.description);
      }
    }
  }, [id, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateProduct(id, { name, price, description }));
    } else {
      dispatch(addProduct({ name, price, description }));
    }
    navigate("/admin/products");
  };

  return (
    <div>
      <h2>{id ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default ProductForm;

import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ products, onDelete }) => {
  // Function to format price to INR
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(price);
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{formatPrice(product.price)}</td> {/* Format price to INR */}
              <td>
                <Link to={`/admin/products/edit/${product._id}`}>Edit</Link>
                <button onClick={() => onDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;

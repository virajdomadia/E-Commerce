import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({
  product,
  showActions,
  showAddToCart,
  onEdit,
  onDelete,
  isAdmin,
}) => {
  const { addToCart } = useCart();

  return (
    <div className="relative group">
      <div className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col h-full">
        <Link to={`/products/${product._id}`} className="block">
          <img
            src={product.images?.[0] || "/placeholder-image.png"}
            alt={product.title}
            className="h-56 w-full object-cover rounded-md mb-5"
          />
          {product.isFeatured && (
            <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full mb-2 self-start">
              Featured
            </span>
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
            {product.title}
          </h3>
          <p className="text-yellow-600 font-bold text-lg mb-1">
            ₹{product.price}
          </p>
          <p className="text-sm uppercase font-medium text-purple-600 mb-3 tracking-wide">
            {product.category}
          </p>
          <p className="text-gray-700 text-sm flex-grow">
            {product.description}
          </p>
        </Link>

        {product.countInStock > 0 && (
          <p className="mt-2 text-sm font-medium text-gray-800">
            <span className="text-green-600">
              In Stock: {product.countInStock}
            </span>
          </p>
        )}

        {showAddToCart && product.countInStock > 0 && (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg shadow-md hover:bg-purple-700 transition"
          >
            Add to Cart
          </button>
        )}
      </div>

      {showActions && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => onEdit(product)}
            className="px-3 py-1 bg-yellow-500 text-white rounded-md text-sm shadow-md hover:brightness-110 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="px-3 py-1 bg-red-600 text-white rounded-md text-sm shadow-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

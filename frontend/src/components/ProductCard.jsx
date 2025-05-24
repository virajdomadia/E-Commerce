import React from "react";

const ProductCard = ({
  product,
  showActions,
  showAddToCart,
  onEdit,
  onDelete,
  isAdmin, // new prop to check admin status
}) => {
  return (
    <div className="border rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col">
      {/* Show first image from images array or fallback */}
      <img
        src={product.images?.[0] || "/placeholder-image.png"}
        alt={product.title}
        className="h-56 w-full object-cover rounded-md mb-5"
      />

      {/* Featured badge */}
      {product.isFeatured && (
        <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-semibold px-2 py-1 rounded-full mb-2 self-start">
          Featured
        </span>
      )}

      <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
        {product.title}
      </h3>

      <p className="text-yellow-600 font-bold text-lg mb-1">${product.price}</p>

      <p className="text-sm uppercase font-medium text-purple-600 mb-3 tracking-wide">
        {product.category}
      </p>

      <p className="text-gray-700 text-sm flex-grow">{product.description}</p>

      {/* Show stock info only if isAdmin is true */}
      {isAdmin && (
        <p className="mt-2 text-sm font-medium text-gray-800">
          {product.countInStock > 0 ? (
            <span className="text-green-600">
              In Stock: {product.countInStock}
            </span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>
      )}

      {showActions && (
        <div className="flex justify-between mt-6">
          <button
            onClick={() => onEdit(product)}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white rounded-lg shadow-md hover:brightness-110 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}

      {showAddToCart && product.countInStock > 0 && (
        <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg shadow-md hover:bg-purple-700 transition">
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;

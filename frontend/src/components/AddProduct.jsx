import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    images: [""],
    countInStock: 0,
    isFeatured: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // make sure you have token stored on login

      await axios.post(
        "https://e-commerce-backend-dfvz.onrender.com/api/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/admin");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to add product. Please try again."
      );
      console.error("Failed to add product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Disable submit if required fields are empty
  const isSubmitDisabled =
    !formData.title ||
    !formData.price ||
    !formData.description ||
    !formData.category ||
    !formData.images[0] ||
    formData.countInStock < 0 ||
    loading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg space-y-6"
        aria-label="Add new product form"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Add New Product
        </h2>

        {error && (
          <div
            className="bg-red-100 text-red-700 p-3 rounded mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
          required
          aria-required="true"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
          required
          min="0"
          step="0.01"
          aria-required="true"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
          required
          aria-required="true"
          rows={4}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
          required
          aria-required="true"
        />

        {/* Images inputs */}
        <div>
          <label
            htmlFor="images"
            className="block mb-2 font-semibold text-gray-700"
          >
            Product Images (URLs)
          </label>
          {formData.images.map((img, idx) => (
            <div key={idx} className="flex mb-2 space-x-2">
              <input
                id={`image-${idx}`}
                type="url"
                value={img}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                placeholder="Image URL"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
                required={idx === 0}
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(idx)}
                  className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  aria-label={`Remove image URL field ${idx + 1}`}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Add Image
          </button>
        </div>

        <input
          type="number"
          name="countInStock"
          placeholder="Count in Stock"
          value={formData.countInStock}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
          min={0}
          required
          aria-required="true"
        />

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-5 h-5 text-yellow-500 rounded border-gray-300 focus:ring-yellow-400"
          />
          <span className="text-gray-700 font-semibold">Featured Product</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`w-full py-3 rounded-lg font-semibold transition duration-200 ${
            isSubmitDisabled
              ? "bg-yellow-300 cursor-not-allowed text-gray-700"
              : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }`}
          aria-disabled={isSubmitDisabled}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

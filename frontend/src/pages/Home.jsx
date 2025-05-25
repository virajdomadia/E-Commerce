import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchProducts(); // your existing fetch function
    }, 5000); // refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900">
        Welcome to the Store
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          No products available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showActions={false}
              showAddToCart={true}
              isAdmin={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

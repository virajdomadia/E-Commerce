import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://e-commerce-backend-dfvz.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      const { user, token } = response.data;

      login({ user, token });
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-12">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Create Account
          </h2>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full px-5 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full px-5 py-3 mb-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-yellow-400"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition duration-200"
          >
            Register
          </button>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 items-center justify-center text-white p-12">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-extrabold mb-6">Join ShopEase Today!</h1>
          <p className="text-lg font-medium">
            Create your account and start exploring exclusive deals and offers
            tailored for you.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/891/891462.png"
            alt="shopping cart"
            className="mx-auto mt-8 w-32 h-32 opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

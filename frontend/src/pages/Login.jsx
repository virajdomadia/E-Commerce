import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      login({ user, token });

      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 items-center justify-center text-white p-12">
        <div className="text-center max-w-md">
          <h1 className="text-5xl font-extrabold mb-6">
            Welcome Back to ShopEase!
          </h1>
          <p className="text-lg font-medium">
            Discover amazing deals and get your favorite products delivered to
            your doorstep.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            alt="shopping bag"
            className="mx-auto mt-8 w-32 h-32 opacity-80"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-12">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Sign In
          </h2>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

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
            Login
          </button>

          <p className="mt-6 text-center text-gray-600">
            New to ShopEase?{" "}
            <Link
              to="/register"
              className="text-yellow-500 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

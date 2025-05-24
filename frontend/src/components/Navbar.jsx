import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (e) {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className={`flex justify-between items-center px-8 py-4 shadow-md ${
        user?.isAdmin
          ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white"
          : "bg-white border-b border-gray-200"
      } rounded-b-md`}
    >
      <Link
        to={user?.isAdmin ? "/admin" : "/"}
        className={`text-2xl font-extrabold tracking-tight ${
          user?.isAdmin ? "text-white" : "text-yellow-600"
        }`}
      >
        {user?.isAdmin ? "🛠 Admin Panel" : "🛒 ShopEase"}
      </Link>

      <div className="flex items-center space-x-6">
        {user?.isAdmin ? (
          <>
            <Link
              to="/admin"
              className="font-semibold hover:text-yellow-100 transition duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/add-product"
              className="font-semibold hover:text-yellow-100 transition duration-200"
            >
              Add Product
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-yellow-600 font-semibold hover:text-yellow-700 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="text-yellow-600 font-semibold hover:text-yellow-700 transition duration-200"
            >
              Cart
            </Link>
            <Link
              to="/profile"
              className="text-yellow-600 font-semibold hover:text-yellow-700 transition duration-200"
            >
              Profile
            </Link>
          </>
        )}

        <button
          type="button"
          onClick={handleLogout}
          className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
            user?.isAdmin
              ? "bg-yellow-300 text-red-700 hover:bg-yellow-400"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

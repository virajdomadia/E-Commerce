import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../redux/actions/userActions";
import { useNavigate, useLocation } from "react-router-dom";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is /admin/register
  const isAdminRoute = location.pathname === "/admin/register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      let response;

      // Admin registration logic (only works when accessing /admin/register)
      if (isAdminRoute) {
        response = await fetch("/api/admin/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        // Normal user registration logic
        response = await dispatch(signup(formData));
      }

      const data = await response.json();

      if (data.success) {
        navigate("/login"); // Redirect to login page after successful signup
      } else {
        setError(data.message || "Failed to sign up. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-form">
      <h2>{isAdminRoute ? "Admin Sign Up" : "User Sign Up"}</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" className="signup-button">
          {isAdminRoute ? "Register Admin" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;

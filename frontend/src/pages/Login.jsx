import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import the Link component
import LoginForm from "../components/LoginForm"; // Import the LoginForm component
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null); // For managing errors

  // Handle the login flow
  const handleLogin = (isAdmin, userData) => {
    // If isAdmin flag is true, check admin login, otherwise, check user login
    if (isAdmin) {
      // Admin login action
      navigate("/admin/dashboard"); // Redirect to Admin Dashboard
    } else {
      // Normal user login
      dispatch(setUser(userData)); // Save user data in Redux
      navigate("/"); // Redirect to the home page after login
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Display any error */}
      {/* Passing the setError prop to LoginForm to manage errors */}
      <LoginForm setError={setError} handleLogin={handleLogin} />
      <p className="signup-link">
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;

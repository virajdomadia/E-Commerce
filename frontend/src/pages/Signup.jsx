import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import SignupForm from "../components/SignupForm"; // Import the SignupForm component
import "./Signup.css"; // Assuming you have styling for the Signup page

const Signup = () => {
  const [error, setError] = useState(null); // For displaying error messages
  const [loading, setLoading] = useState(false); // To track loading state
  const navigate = useNavigate();

  const handleSignupSuccess = () => {
    // Handle successful signup (redirect to login page or auto-login)
    navigate("/login"); // Redirect to login page after successful signup
  };

  const handleSignupError = (errorMessage) => {
    // Handle error message from signup process
    setError(errorMessage);
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error */}
        {/* Pass necessary props to the SignupForm */}
        <SignupForm
          onSuccess={handleSignupSuccess} // Pass success handler
          onError={handleSignupError} // Pass error handler
          loading={loading} // Pass loading state
          setLoading={setLoading} // Allow the form to set loading state
        />
      </div>
    </div>
  );
};

export default Signup;

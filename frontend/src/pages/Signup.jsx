import React from "react";
import SignupForm from "../components/SignupForm"; // Import the SignupForm component
import "./Signup.css"; // Assuming you have styling for the Signup page

const Signup = () => {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create an Account</h2>
        {/* Render the SignupForm component here */}
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;

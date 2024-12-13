import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logoutUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      // Redirect to login page if user is not logged in
      navigate("/login");
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      // Simulate updating profile on the backend
      // Example: const response = await api.updateProfile({ name, email });

      // Simulate successful profile update
      setMessage("Profile updated successfully!");
      setError("");
      dispatch(setUser({ name, email })); // Update the user state in Redux
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Handle logout
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>User Profile</h2>
        <form className="profile-form" onSubmit={handleUpdateProfile}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="update-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

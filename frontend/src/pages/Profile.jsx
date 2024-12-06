import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";
import { logoutUser } from "../redux/actions/userActions";
import "./Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // You can add a request to your backend to update the profile
    setMessage("Profile updated successfully!");
    dispatch(setUser({ name, email }));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && <p className="success-message">{message}</p>}
          <button type="submit" className="update-btn">
            Update Profile
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

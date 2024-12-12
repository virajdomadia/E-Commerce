import React from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard">
        <h1>Welcome to the Admin Dashboard</h1>
        <div className="overview">
          <div className="card">
            <h3>Total Products</h3>
            <p>100</p>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>150</p>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>250</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

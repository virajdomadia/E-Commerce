import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const fetchStats = async () => {
        try {
          const { data } = await axios.get("/api/admin/dashboard", {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          setStats(data);
        } catch (error) {
          setError("Error fetching dashboard data");
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [userInfo]);

  if (!userInfo || !userInfo.isAdmin) {
    return <p>You do not have access to this page</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <AdminNavbar />
      <div className="admin-dashboard">
        <h1>Welcome to the Admin Dashboard</h1>
        <div className="overview">
          <div className="card">
            <h3>Total Products</h3>
            <p>{stats.totalProducts}</p>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

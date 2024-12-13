import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminNavbar.css";

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <NavLink to="/admin/dashboard" activeClassName="active-link">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" activeClassName="active-link">
            Manage Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/orders" activeClassName="active-link">
            Manage Orders
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/profile" activeClassName="active-link">
            Admin Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;

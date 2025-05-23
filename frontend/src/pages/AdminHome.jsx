import React from "react";
import { useAuth } from "../context/AuthContext";

const AdminHome = () => {
  const { logout } = useAuth();
  return (
    <>
      <div className="p-8">
        <h1 className="text-2xl mb-4">Welcome to the Admin Home</h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default AdminHome;

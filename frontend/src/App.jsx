import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute"; // Assuming you have a PrivateRoute component
import RazorpayCheckout from "./components/RazorpayCheckout";
import ManageProducts from "./pages/ManageProducts"; // Import Manage Products Page
import ManageOrders from "./pages/ManageOrders"; // Import Manage Orders Page
import { autoLogin } from "./redux/actions/userActions"; // Import the autoLogin action
import "./app.css";

const App = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function

  useEffect(() => {
    dispatch(autoLogin()); // Dispatch autoLogin action to authenticate the user
  }, [dispatch]); // Only runs on initial render (when dispatch is available)

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <RazorpayCheckout /> {/* Razorpay payment button */}
              </PrivateRoute>
            }
          />

          {/* Admin Routes - Protected with isAdmin prop */}
          <Route
            path="/admin/products"
            element={
              <PrivateRoute isAdmin={true}>
                <ManageProducts /> {/* Admin Products Management */}
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <PrivateRoute isAdmin={true}>
                <ManageOrders /> {/* Admin Orders Management */}
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/payment");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/users", userRoutes); // User routes
app.use("/api/products", productRoutes); // Product routes
app.use("/api/cart", cartRoutes); // Cart routes
app.use("/api/orders", orderRoutes); // Order routes
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Backend Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

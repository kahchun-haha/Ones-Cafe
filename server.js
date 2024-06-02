const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const multer = require("multer");
const menuRoutes = require('./routes/menus');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); // Serve static files

// Use the defined routes for menus, users, and orders
app.use(menuRoutes);
app.use(userRoutes);
app.use(orderRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Serve HTML files for specific routes
const sendFileWithLogging = (res, filePath) => {
  console.log(`Serving file: ${filePath}`);
  res.sendFile(filePath, { root: path.join(__dirname, "templates") }, (err) => {
    if (err) {
      console.error(`Error sending file: ${filePath}`, err);
      res.status(err.status || 500).end();
    }
  });
};

// Define route handlers for serving HTML files
const routes = [
  { path: "/", file: "index.html" },
  { path: "/home", file: "home.html" },
  { path: "/menu", file: "menu.html" },
  { path: "/checkout", file: "checkout.html" },
  { path: "/rewards", file: "rewards.html" },
  { path: "/voucher", file: "voucher.html" },
  { path: "/feedback", file: "feedback.html" },
  { path: "/login", file: "profile/login.html" },
  { path: "/register", file: "profile/register.html" },
  { path: "/forgotPassword", file: "profile/forgotPassword.html" },
  { path: "/resetPassword", file: "profile/resetPassword.html" },
  { path: "/profile", file: "profile/profile.html" },
  { path: "/admin/menuManagement", file: "admin/menuManagement.html" },
  { path: "/admin/orderManagement", file: "admin/orderManagement.html" },
  { path: "/admin/addMenu", file: "admin/addMenu.html" },
  { path: "/admin/modifyMenu", file: "admin/modifyMenu.html" },
  { path: "/admin/inventory", file: "admin/inventory.html" },
  { path: "/admin/salesReport", file: "admin/salesReport.html" },
  { path: "/404", file: "404.html" },
];

routes.forEach(route => {
  app.get(route.path, (req, res) => sendFileWithLogging(res, route.file));
});

// Fallback route for handling 404 errors
app.use((req, res) => sendFileWithLogging(res, "404.html"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  (async () => {
    const open = (await import('open')).default;
    open(`http://localhost:${PORT}`);
  })();
});
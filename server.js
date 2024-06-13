const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require('connect-mongo');

dotenv.config();

const menuRoutes = require('./routes/menus');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const inventoryRoutes = require('./routes/inventories');
const adminRoutes = require('./routes/admins');
const feedbackRoutes = require('./routes/feedbacks');
const voucherRoutes = require("./routes/vouchers");

const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static"))); // Serve static files

// Use session with MongoStore
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions'
  }),
  cookie: { secure: false }
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware to set isAuthenticated in res.locals
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated || false;
  next();
});

// Route definitions with explicit layout specification
const routes = [
  { path: "/", view: "index", title: "Ones Café", layout: "main", css: ['https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css', '/css/home.css'], js: ['https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js', '/js/home/home.js'] },
  { path: "/menu", view: "menu", title: "Menu: Ones Café", layout: "main", css: ['/css/menu.css'], js: ['/js/menu/menu.js'] },
  { path: "/checkout", view: "checkout", title: "Checkout: Ones Café", layout: "main", css: ['/css/checkout.css'], js: ['/js/checkout/checkout.js'] },
  { path: "/rewards", view: "rewards", title: "Rewards: Ones Café", layout: "main", css: ['/css/rewards.css'], js: ['/js/rewards/rewards.js'] },
  { path: "/voucher", view: "voucher", title: "Rewards: Ones Café", layout: "main", css: ['/css/rewards.css'], js: ['/js/rewards/rewards.js'] },
  { path: "/feedback", view: "feedback", title: "Feedback: Ones Café", layout: "main", css: ['/css/feedback.css'], js: ['https://code.jquery.com/jquery-3.6.0.min.js','/js/feedback/feedback.js'] },
  { path: "/login", view: "profile/login", title: "Login Page: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/profile/login.js'] },
  { path: "/register", view: "profile/register", title: "Register: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/profile/register.js'] },
  { path: "/forgotPassword", view: "profile/forgotPassword", title: "Forgot Password: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/profile/forgotPassword.js'] },
  { path: "/resetPassword", view: "profile/resetPassword", title: "Reset Password: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/profile/resetPassword.js'] },
  { path: "/changePassword", view: "profile/changePassword", title: "Change Password: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/profile/changePassword.js'] },
  { path: "/profile", view: "profile/profile", title: "Profile: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/profile/profile.js'] },
  { path: "/admin/menuManagement", view: "admin/menuManagement", title: "Menu Management: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/menuManagement.css'], js: ['/js/admin/dashboard.js', '/js/admin/menuManagement.js'] },
  { path: "/admin/orderManagement", view: "admin/orderManagement", title: "Order Management: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/menuManagement.css', '/css/admin/order.css'], js: ['https://kit.fontawesome.com/bbd49eb172.js', '/js/admin/dashboard.js', '/js/admin/main.js', '/js/admin/orderManagement.js'] },
  { path: "/admin/addMenu", view: "admin/addMenu", title: "Add Menu: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/menuManagement.css', '/css/admin/add-menu.css'], js: ['/js/admin/dashboard.js', '/js/admin/addMenu.js'] },
  { path: "/admin/modifyMenu", view: "admin/modifyMenu", title: "Modify Menu: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/menuManagement.css', '/css/admin/add-menu.css'], js: ['https://cdn.ckeditor.com/ckeditor5/17.0.0/classic/ckeditor.js', '/js/admin/dashboard.js', '/js/admin/modifyMenu.js'] },
  { path: "/admin/inventory", view: "admin/inventory", title: "Inventory: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/menuManagement.css', '/css/admin/inventory.css'], js: ['https://kit.fontawesome.com/bbd49eb172.js', '/js/admin/dashboard.js', '/js/admin/main.js', '/js/admin/inventoryManagement.js'] },
  { path: "/admin/salesReport", view: "admin/salesReport", title: "Sales Report: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/sales-report.css', '/css/admin/menuManagement.css'], js: ['https://kit.fontawesome.com/bbd49eb172.js', '/js/admin/dashboard.js', '/js/admin/main.js', '/js/admin/orderHistory.js'] },
  { path: "/admin/viewFeedback", view: "admin/viewFeedback", title: "Feedback: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/viewFeedback.css'], js: ['https://kit.fontawesome.com/bbd49eb172.js', '/js/admin/dashboard.js', '/js/admin/main.js', '/js/admin/viewFeedback.js'] },
  { path: "/admin/announcements", view: "admin/announcements", title: "Announcements: Ones Café", layout: "admin", css: ['https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css', '/css/admin/general.css', '/css/admin/sidebar.css', '/css/admin/announcements.css'], js: ['https://kit.fontawesome.com/bbd49eb172.js', '/js/admin/dashboard.js', '/js/admin/main.js', '/js/admin/announcement.js'] },
  { path: "/admin/adminLogin", view: "admin/adminLogin", title: "Admin Login: Ones Café", layout: "main", css: ['/css/profile.css'], js: ['/js/admin/adminLogin.js'] },
  { path: "/404", view: "404", title: "404 Not Found", layout: "admin", css: ['/css/404.css'], js: ['https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'] },
];

app.use(menuRoutes);
app.use(userRoutes);
app.use(orderRoutes);
app.use(inventoryRoutes);
app.use(adminRoutes);
app.use(feedbackRoutes);
app.use(voucherRoutes);

routes.forEach(route => {
  app.get(route.path, (req, res) => {
    res.render(route.view, { title: route.title, layout: `layouts/${route.layout}`, css: route.css, js: route.js, isAuthenticated: res.locals.isAuthenticated });
  });
});

// Fallback route for handling 404 errors
app.use((req, res) => res.status(404).render('404', { title: '404 Not Found', layout: 'layouts/admin', css: ['/css/404.css'], js: ['https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js'] }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  (async () => {
    const open = (await import('open')).default;
    open(`http://localhost:${PORT}`);
  })();
});

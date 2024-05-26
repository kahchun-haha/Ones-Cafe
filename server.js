const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static'))); // Serve static files with /static prefix

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

// Define routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Serve HTML files for specific routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'home.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'menu.html'));
});

app.get('/rewards', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'rewards.html'));
});

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'feedback.html'));
});

app.get('/profile/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'profile', 'login.html'));
});

app.get('/profile/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'profile', 'register.html'));
});

// Fallback route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'templates', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const app = express();
const router = require('./src/router/allRoutes'); // Path to your routes file
const { authenticateToken } = require('./middleware/authMiddleware')
require('dotenv').config(); // Ensure dotenv is loaded before accessing environment variables

const SECRET_KEY = process.env.SECRET_KEY; // Retrieve from .env

// Middleware
app.use(express.json());
app.use('/api', router); // All routes prefixed with /api

// Start the server
const PORT = process.env.PORT || 3000; // Use .env PORT or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

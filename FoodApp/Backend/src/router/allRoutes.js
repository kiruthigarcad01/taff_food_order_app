// const express = require("express");
// const router = express.Router();
// const userController = require('../controllers/userController');
// const foodController = require("../controllers/foodController");
// const orderController = require("../controllers/orderController");

// // User Routes
// router.post("/signup", userController.signup);
// router.post("/login", userController.login);

// // Food Routes
// router.post("/food", foodController.createFood); // Admin only
// router.get("/food", foodController.getAllFood);
// router.put("/food/:id", foodController.updateFood); // Admin only
// router.delete("/food/:id", foodController.deleteFood); // Admin only

// // Order Routes
// router.post("/cart", orderController.addToCart);
// router.put("/cart/:id", orderController.updateCart);
// router.delete("/cart/:id", orderController.removeFromCart);

// module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const foodController = require('../controllers/foodController');
const orderController = require('../controllers/orderController');
const { authenticateToken, authorizeAdmin, authorizeUser } = require('../../middleware/authMiddleware');

// User Routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);

// Food Routes
router.post('/food', authenticateToken, authorizeAdmin, foodController.createFood);
router.get('/food', authenticateToken, foodController.getAllFood);
router.put('/food/:id', authenticateToken, authorizeAdmin, foodController.updateFood);
router.delete('/food/:id', authenticateToken, authorizeAdmin, foodController.deleteFood);

// Order Routes
router.post('/cart', authenticateToken, authorizeUser, orderController.addToCart);
router.put('/cart/:id', authenticateToken, authorizeUser, orderController.updateCart);
router.delete('/cart/:id', authenticateToken, authorizeUser, orderController.removeFromCart);

module.exports = router;

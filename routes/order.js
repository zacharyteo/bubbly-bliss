const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const authMiddleware = require('../middleware/authMiddleware');

// let the user create an order, but only if they are logged in. Otherwise, redirect to login page
router.get('/', authMiddleware.isLoggedIn, OrderController.createOrder);

// router.post('/create', OrderController.createOrder);

// router.get('/history/:customerId', OrderController.getOrderHistory);

// router.get('/:orderId', OrderController.getOrderById);

module.exports = router;


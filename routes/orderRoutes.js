// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.post('/create', authController.protect, orderController.createOrder);
router.get('/', authController.protect, orderController.getOrderDetails);

module.exports = router;

// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

router.post('/add', authController.protect, cartController.addToCart);
router.delete(
  '/:itemId',
  authController.protect,
  cartController.deleteCartItemById,
);
router.get('/', authController.protect, cartController.getCartDetails);

module.exports = router;

const express = require('express');

const bookController = require('../controllers/bookController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(bookController.getAllBooks)
  .post(bookController.createBook);
router
  .route('/:id')
  .get(bookController.getBookById)
  .patch(bookController.updateBookItem)
  .delete(
    authController.protect,
    // authController.restrictTo('supplier'),
    bookController.deleteBookItem,
  );
// router
//   .route('/supplier/:id')
//   .get(authController.protect, bookController.getAllMaterialItemsBySupplier);

module.exports = router;

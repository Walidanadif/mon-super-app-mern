// backend/routes/productRoutes.js

const express = require('express');
const {
  getProducts,
  getProductById, // This will now be correctly imported
  createProduct,  // This will now correctly map to the function
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to get all products (no authentication needed for viewing in a typical e-commerce site)
router.route('/').get(getProducts);

// Protected routes for product management (e.g., only admins can create, update, delete)
router.route('/')
  .post(protect, authorize('admin'), createProduct); // <--- This line will now work!

router.route('/:id')
  .get(getProductById) // This will now work!
  .put(protect, authorize('admin'), updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

module.exports = router;
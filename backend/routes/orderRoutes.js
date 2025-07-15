// backend/routes/orderRoutes.js

const express = require('express');
const {
  getOrders,
  getOrderById,
  createOrder, // <--- Expected to be a function, but likely isn't
  updateOrder, // <--- Expected to be a function, but likely isn't
  deleteOrder,
  getUserOrders
} = require('../controllers/orderController'); // Ensure these are all correctly defined and exported!
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin'), getOrders)
  .post(protect, createOrder); // Line 19: Error here, 'createOrder' isn't a function

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, authorize('admin'), updateOrder) // Line 23: Error here, 'updateOrder' isn't a function
  .delete(protect, authorize('admin'), deleteOrder);

router.route('/myorders').get(protect, getUserOrders);

module.exports = router;
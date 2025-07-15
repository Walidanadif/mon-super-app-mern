// backend/routes/customerRoutes.js


const express = require('express');

const {
  getCustomers,
  addCustomer, // Assuming this is for creating new customers (e.g., register)
  updateCustomer,
  deleteCustomer,
  getCustomerById // If you have this one too, ensure it's imported
} = require('../controllers/customerController');

const { protect, authorize } = require('../middleware/authMiddleware'); // Make sure this path is correct!

const router = express.Router();

// Example routes (adjust access as per your app's logic)
router.route('/')
  .get(protect, authorize('admin'), getCustomers) // Only admins can get all customers
  .post(protect, addCustomer); // Protect adding new customers, potentially just for admins or self-registration

router.route('/:id')
  .get(protect, authorize('admin'), getCustomerById) // Only admins or the customer themselves
  .put(protect, authorize('admin'), updateCustomer) // Only admins or the customer themselves
  .delete(protect, authorize('admin'), deleteCustomer); // Only admins

module.exports = router;
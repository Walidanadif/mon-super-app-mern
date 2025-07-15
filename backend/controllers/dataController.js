// backend/controllers/dataController.js
const Order = require('../models/Order'); // Assuming sales data comes from Orders
const Product = require('../models/Product'); // Assuming product popularity comes from Products/Orders

// @desc    Get sales data for chart
// @route   GET /api/data/sales
// @access  Private (Admin only)
const getSalesData = async (req, res) => {
  try {
    // This is a placeholder. You'll need to implement actual data aggregation
    // For example, aggregate sales by month/day from your Order model.
    // This example returns dummy data.
    const salesData = [
      { month: 'Jan', sales: 1200 },
      { month: 'Feb', sales: 1900 },
      { month: 'Mar', sales: 1500 },
      { month: 'Apr', sales: 2200 },
      { month: 'May', sales: 2800 },
      { month: 'Jun', sales: 2000 },
      { month: 'Jul', sales: 2500 },
    ];
    res.json(salesData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error fetching sales data');
  }
};

// @desc    Get product popularity data for chart
// @route   GET /api/data/product-popularity
// @access  Private (Admin only)
const getProductPopularityData = async (req, res) => {
  try {
    // This is a placeholder. You'll need to query your database
    // to find popular products (e.g., by counting how many times each product appears in orders).
    // This example returns dummy data.
    const productPopularityData = [
      { name: 'Laptop Pro', count: 150 },
      { name: 'Smartphone X', count: 120 },
      { name: 'Wireless Headphones', count: 90 },
      { name: 'Smartwatch 2.0', count: 75 },
      { name: 'Gaming Mouse', count: 60 },
    ];
    res.json(productPopularityData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error fetching product popularity data');
  }
};

module.exports = {
  getSalesData,
  getProductPopularityData,
};
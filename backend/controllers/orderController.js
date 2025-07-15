// backend/controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product'); // Assuming you might need Product model for order processing later
// If using express-async-handler, import it:
// const asyncHandler = require('express-async-handler');


// @desc    Get all orders with pagination and search
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search; // Example: search by user name or order ID
    const status = req.query.status; // Example: filter by order status

    let query = {};

    if (search) {
        // This is a simplified search, you might need to query the 'user' field more robustly
        // if searching by user name, or by order._id for ID search.
        query.$or = [
            { '_id': { $regex: search, $options: 'i' } }, // Search by Order ID
            // { 'user.name': { $regex: search, $options: 'i' } } // If user field is populated and has name
        ];
    }

    if (status) {
      query.status = status;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalOrders = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .populate('user', 'name email') // Populate user details
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(limit)
      .skip(startIndex);

    const results = {};

    if (endIndex < totalOrders) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.total = totalOrders;
    results.currentPage = page;
    results.totalPages = Math.ceil(totalOrders / limit);
    results.orders = orders;

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private (User specific or Admin)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Optional: Only allow user to view their own orders unless admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Order not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ msg: 'No order items' });
      return;
    } else {
      const order = new Order({
        user: req.user._id, // Assign to the logged-in user
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// @desc    Update an order (e.g., status, delivery)
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrder = async (req, res) => {
  try {
    const { status, isDelivered, deliveredAt, isPaid, paidAt } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    // Update fields if provided
    if (status) order.status = status;
    if (typeof isDelivered === 'boolean') {
      order.isDelivered = isDelivered;
      order.deliveredAt = isDelivered ? (deliveredAt || Date.now()) : null;
    }
    if (typeof isPaid === 'boolean') {
      order.isPaid = isPaid;
      order.paidAt = isPaid ? (paidAt || Date.now()) : null;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Order not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};


// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Order not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};


// @desc    Get logged in user's orders
// @route   GET /api/orders/myorders
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    // req.user will be available from the protect middleware
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getOrders,
  getOrderById,
  createOrder,     // Make sure this is defined above
  updateOrder,     // Make sure this is defined above
  deleteOrder,
  getUserOrders,
};
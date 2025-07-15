// backend/controllers/customerController.js

const Customer = require('../models/Customer'); // Make sure your Customer model path is correct
// If using express-async-handler, import it:
// const asyncHandler = require('express-async-handler');


// @desc    Get all customers with pagination and search
// @route   GET /api/customers
// @access  Private/Admin
const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCustomers = await Customer.countDocuments(query);

    const customers = await Customer.find(query)
      .sort({ name: 1 })
      .limit(limit)
      .skip(startIndex);

    const results = {};

    if (endIndex < totalCustomers) {
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

    results.total = totalCustomers;
    results.currentPage = page;
    results.totalPages = Math.ceil(totalCustomers / limit);
    results.customers = customers;

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// --- START ADDITION / CORRECTION ---

// @desc    Get a single customer by ID
// @route   GET /api/customers/:id
// @access  Private/Admin (or the customer themselves)
const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Optional: Add logic to allow only the customer themselves or an admin to view their profile
    // if (customer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    //   return res.status(401).json({ msg: 'Not authorized to view this customer' });
    // }

    res.json(customer);
  } catch (err) {
    console.error(err.message);
    // Handle CastError for invalid IDs
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Customer not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};

// --- END ADDITION / CORRECTION ---


// @desc    Add a new customer (e.g., during registration)
// @route   POST /api/customers
// @access  Public (or Private if admin only registration)
const addCustomer = async (req, res) => {
  const { name, email, phone, address, password } = req.body; // Assuming these fields from your model

  try {
    // Check if customer already exists
    let customer = await Customer.findOne({ email });
    if (customer) {
      return res.status(400).json({ msg: 'Customer already exists' });
    }

    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      password // Password should be hashed before saving in a real app (e.g., using bcrypt)
    });

    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private/Admin (or the customer themselves)
const updateCustomer = async (req, res) => {
  const { name, email, phone, address } = req.body; // Add other fields as needed

  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    // Optional: Only allow customer to update their own profile unless admin
    // if (customer._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    //   return res.status(401).json({ msg: 'Not authorized to update this customer' });
    // }

    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;

    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Customer not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({ msg: 'Customer not found' });
    }

    res.json({ msg: 'Customer removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Customer not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};


module.exports = {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById, // <--- Ensure this is correctly exported
};
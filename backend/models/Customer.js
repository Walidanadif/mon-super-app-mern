const Customer = require('../models/Customer'); // Make sure the path to your Customer model is correct

// @route   GET api/customers
// @desc    Get all customers with pagination and search
// @access  Private (Admin only)
const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search; // Search term (e.g., for name or email)

    let query = {};

    // Filtering by search (on name or email)
    if (search) {
      query.$or = [ // Use $or to search in multiple fields
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalCustomers = await Customer.countDocuments(query);

    const customers = await Customer.find(query)
      .sort({ name: 1 }) // Sort by name by default
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

// @route   POST api/customers
// @desc    Add a new customer
// @access  Private (Admin only)
const addCustomer = async (req, res) => { // <-- Ensure this function is correctly defined
    const { name, email, phone, address } = req.body;

    try {
        const newCustomer = new Customer({
            name,
            email,
            phone,
            address,
        });

        const customer = await newCustomer.save();
        res.status(201).json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   PUT api/customers/:id
// @desc    Update a customer
// @access  Private (Admin only)
const updateCustomer = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        let customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        customer.name = name || customer.name;
        customer.email = email || customer.email;
        customer.phone = phone || customer.phone;
        customer.address = address || customer.address;

        customer = await customer.save();
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/customers/:id
// @desc    Delete a customer
// @access  Private (Admin only)
const deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);

        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }

        res.json({ msg: 'Customer removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
  getCustomers,
  addCustomer, // <-- Crucially, 'addCustomer' must be listed here
  updateCustomer,
  deleteCustomer,
};
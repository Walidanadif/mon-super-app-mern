// backend/models/Customer.js

const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'], // Name is required
    },
    email: {
      type: String,
      required: [true, 'Please add an email'], // Email is required
      unique: true, // Email must be unique
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, // Regex for email validation
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      required: false, // Phone might be optional
      // You could add a regex for phone number validation here if needed
    },
    address: {
      type: String,
      required: false, // Address might be optional
    },
    // You might add other fields specific to your e-commerce customers
    // e.g., orders (references to Order model), lastLogin, totalSpending, etc.
    // example:
    // orders: [{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Order'
    // }]
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model('Customer', customerSchema);
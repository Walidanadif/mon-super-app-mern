const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerName: { // Or customer (ObjectId, ref to User/Customer model)
    type: String, // Keep as String if no dedicated Customer model yet, otherwise use ObjectId
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to your Product model
        required: true,
      },
      name: { // Store name for simpler display
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  // You might want to add a reference to the user who placed the order
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Order', OrderSchema);
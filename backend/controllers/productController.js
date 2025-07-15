// backend/controllers/productController.js

const Product = require('../models/Product');
// If you are using express-async-handler for error handling, import it:
// const asyncHandler = require('express-async-handler');

// @route   GET api/products
// @desc    Get all products with pagination and search
// @access  Private (Admin only in a real app, but accessible for now)
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search;
    const category = req.query.category;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalProducts = await Product.countDocuments(query);

    const products = await Product.find(query)
      .sort({ name: 1 })
      .limit(limit)
      .skip(startIndex);

    const results = {};

    if (endIndex < totalProducts) {
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

    results.total = totalProducts;
    results.currentPage = page;
    results.totalPages = Math.ceil(totalProducts / limit);
    results.products = products;

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- START ADDITION / CORRECTION ---

// @route   GET api/products/:id
// @desc    Get a single product by ID
// @access  Public (or Private if desired)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    // Handle CastError for invalid IDs
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found (Invalid ID)' });
    }
    res.status(500).send('Server Error');
  }
};

// --- END ADDITION / CORRECTION ---


// @route   POST api/products
// @desc    Add a new product (Renamed from addProduct to createProduct for consistency)
// @access  Private (Admin only)
const createProduct = async (req, res) => {
  const { name, description, price, stockQuantity, category, imageUrl } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      stockQuantity,
      category,
      imageUrl,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/products/:id
// @desc    Update a product
// @access  Private (Admin only)
const updateProduct = async (req, res) => {
  const { name, description, price, stockQuantity, category, imageUrl } = req.body;

  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.stockQuantity = stockQuantity || product.stockQuantity;
    product.category = category || product.category;
    product.imageUrl = imageUrl || product.imageUrl;

    product = await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/products/:id
// @desc    Delete a product
// @access  Private (Admin only)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getProducts,
  getProductById, // This line will now correctly reference the function defined above
  createProduct,
  updateProduct,
  deleteProduct,
};
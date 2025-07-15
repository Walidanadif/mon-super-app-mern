const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Keep this line, we'll fix the path below
const cors = require('cors');
const path = require('path');


dotenv.config();
connectDB(); // Call the database connection function

const app = express();
app.use(express.json());
app.use(cors());

// --- ONLY ONE DECLARATION FOR EACH ROUTE ---
const authRoutes = require('./routes/authRoutes'); // <--- Make sure this is declared ONLY ONCE
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const dataRoutes = require('./routes/dataRoutes'); // Add this line
// Add other route imports here, each only once.

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/data', dataRoutes); // Add this line
// Mount other routes here.
// app.use('/api/private', privateRoutes); // Example private route

// Optional: Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
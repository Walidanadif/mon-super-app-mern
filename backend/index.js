require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoute');
const dataRoutes = require('./routes/dataRoutes'); // Importez les nouvelles routes de données

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Basic route (keep for testing)
app.get('/', (req, res) => {
    res.send('E-commerce Dashboard Backend is running!');
});

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Use private routes
app.use('/api/private', privateRoutes);

// Utilisez les routes de données
app.use('/api/data', dataRoutes); // Toutes les routes dans dataRoutes seront préfixées par /api/data

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
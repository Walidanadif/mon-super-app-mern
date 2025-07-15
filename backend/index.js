require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the auth routes
const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoute'); // Vérifie bien le nom du fichier : privateRoute.js ?

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

// Use authentication routes
app.use('/api/auth', authRoutes);

// Use private routes - protected by auth middleware
app.use('/api/private', privateRoutes);

// Basic route (keep for testing)
app.get('/', (req, res) => {
    res.send('E-commerce Dashboard Backend is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

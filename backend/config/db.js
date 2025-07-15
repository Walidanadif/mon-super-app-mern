// backend/config/db.js

const mongoose = require('mongoose');

// Replace this with your actual MongoDB connection URI.
// For MongoDB Atlas, it looks like:
// 'mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/<database-name>?retryWrites=true&w=majority'
// For local MongoDB: 'mongodb://localhost:27017/yourdbname'
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecomdashboard'; // Default to local if MONGO_URI isn't set

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
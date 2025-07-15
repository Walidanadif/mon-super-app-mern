const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,   // Remove whitespace from both ends
    },
    password: {
        type: String,
        required: true,
    },
    role: { // Optional: for authorization (e.g., 'admin', 'user')
        type: String,
        enum: ['user', 'admin'], // Only these values allowed
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', UserSchema);
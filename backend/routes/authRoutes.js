const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import our User model
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware


// @route   GET /api/private
// @desc    Get private data (protected route example)
// @access  Private
router.get('/private', protect, (req, res) => {
  res.json({ message: `Bienvenue, ${req.user.name}! Vous avez accédé aux données privées.` });
});

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body; // role is optional for now
     console.log('Received request:', req.body); // DEBUG

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. Create new user instance
        user = new User({
            username,
            password, // This will be hashed
            role: role || 'user', // Default role to 'user' if not provided
        });

        // 3. Hash password
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        user.password = await bcrypt.hash(password, salt); // Hash the password

        // 4. Save user to database
        await user.save();

        // 5. Create and sign JWT
        const payload = {
            user: {
                id: user.id, // MongoDB's _id is accessible as 'id' after save
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Your secret key from .env
            { expiresIn: '2h' }, // Token expires in 2 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, role: user.role } }); // Send token and basic user info
            }
        );

    } catch (err) {
        console.error('Registration error:', err); // Show exact error in terminal
        res.status(500).json({ msg: 'Server error', error: err.message }); // more details in response
    }
});


// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1. Check if user exists
        let user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 2. Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // 3. Create and sign JWT
        const payload = {
            user: {
                id: user.id,
                role: user.role,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
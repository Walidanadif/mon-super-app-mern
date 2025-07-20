// Example: backend/controllers/userController.js (login function excerpt)
const jwt = require('jsonwebtoken');

// Helper to generate token (if not already defined)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token valid for 1 hour
    });
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) { // Assuming matchPassword is a method on your User model
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role, // Important for authorization middleware
            token: generateToken(user._id), // Token is generated here
        });
    } else {
        res.status(401).json({ msg: 'Invalid email or password' });
    }
};
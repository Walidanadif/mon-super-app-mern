// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');

      // --- CRITICAL CHECK: Line 26 ---
      if (!req.user) { // If user was deleted or ID doesn't exist
        res.status(401);
        throw new Error('Not authorized, user not found');
      }
      next();
    } catch (error) {
      console.error(error); // Log the actual error for debugging
      res.status(401);
      // --- CRITICAL CHECK: Line 33 ---
      throw new Error('Not authorized, token failed'); // Catches expired, malformed, or wrong secret tokens
    }
  }

  if (!token) { // If no token was provided at all
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    // This check handles cases where protect might have failed (though ideally it wouldn't call next())
    if (!req.user || !req.user.role) {
      res.status(403); // Forbidden
      throw new Error('Not authorized, user role not available');
    }
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`User role ${req.user.role} is not authorized to access this route`);
    }
    next();
  };
};

module.exports = { protect, authorize };
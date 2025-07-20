// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      console.log('TOKEN:', token); // log after it's set

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('DECODED:', decoded); // only log after it's declared

      req.user = await User.findById(decoded.user.id).select('-password'); // or decoded.id depending on how it's structured
      console.log('USER:', req.user);

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (error) {
    console.error('AUTH ERROR:', error.message);
    res.status(401).json({ message: 'Not authorized, token failed' });
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
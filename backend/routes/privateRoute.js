const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Import our authentication middleware

// @route   GET /api/private
// @desc    Get data accessible only to authenticated users
// @access  Private
router.get('/', auth, (req, res) => {
    // If we reach here, the user is authenticated because `auth` middleware passed
    res.json({
        msg: `Welcome, ${req.user.username || 'Authenticated User'}! This is private data.`,
        userId: req.user.id,
        userRole: req.user.role,
    });
});

// You could also add role-based authorization here
router.get('/admin-only', auth, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admin required.' }); // 403 Forbidden
    }
    res.json({ msg: `Hello Admin ${req.user.username || ''}! This is admin-only data.` });
});


module.exports = router;
const express = require('express');
const router = express.Router();

// Import correct du middleware protect
const { protect } = require('../middleware/authMiddleware');

// Routes protégées avec le middleware `protect`
router.get('/', protect, (req, res) => {
    res.json({
        msg: `Welcome, ${req.user.username || 'Authenticated User'}! This is private data.`,
        userId: req.user.id,
        userRole: req.user.role,
    });
});

router.get('/admin-only', protect, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Admin required.' });
    }
    res.json({ msg: `Hello Admin ${req.user.username || ''}! This is admin-only data.` });
});

module.exports = router;

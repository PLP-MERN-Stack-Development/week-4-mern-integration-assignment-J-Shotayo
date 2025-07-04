const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const { check } = require('express-validator');
const { protect } = require('../middleware/authMiddleware'); // Correct destructured import

// Debug logs
console.log('Middleware function exists:', !!protect);
console.log('Middleware type:', typeof protect);

// Register user
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  register
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  login
);

// Get current user - using protect directly
router.get('/me', protect, getCurrentUser);

module.exports = router;
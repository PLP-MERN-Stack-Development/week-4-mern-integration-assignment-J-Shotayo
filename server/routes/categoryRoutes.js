const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Protected routes (require authentication)
const { protect } = require('../middleware/authMiddleware');
router.use(protect);

// Create category
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('name', 'Name must be between 3 and 50 characters').isLength({ min: 3, max: 50 })
  ],
  categoryController.createCategory
);

module.exports = router;
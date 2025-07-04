const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Get all posts
router.get('/', postController.getAllPosts);

// Search posts
router.get('/search', postController.searchPosts);

// Get single post
router.get('/:id', postController.getPostById);

// Protected routes (require authentication)
const { protect } = require('../middleware/authMiddleware');
router.use(protect);

// Create post
router.post(
  '/',
  uploadMiddleware.single('featuredImage'),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ],
  postController.createPost
);

// Update post
router.put(
  '/:id',
  uploadMiddleware.single('featuredImage'),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('content', 'Content is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty()
  ],
  postController.updatePost
);

// Delete post
router.delete('/:id', postController.deletePost);

module.exports = router;
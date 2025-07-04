const Post = require('../models/Post');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('category', 'name')
      .populate('author', 'username')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalPosts = await Post.countDocuments();

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name')
      .populate('author', 'username')
      .populate('comments');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, category } = req.body;
    
    const post = new Post({
      title,
      content,
      category,
      author: req.user.id,
      featuredImage: req.file ? req.file.path : ''
    });

    await post.save();

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, category } = req.body;
    const updateData = { title, content, category };

    if (req.file) {
      updateData.featuredImage = req.file.path;
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

exports.searchPosts = async (req, res, next) => {
  try {
    const { query } = req.query;
    
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    })
    .populate('category', 'name')
    .populate('author', 'username');

    res.json({
      success: true,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};
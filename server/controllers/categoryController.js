const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json({
      success: true,
      data: categories
    });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, description } = req.body;
    
    const category = new Category({
      name,
      description
    });

    await category.save();

    res.status(201).json({
      success: true,
      data: category
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Category name already exists'
      });
    }
    next(err);
  }
};
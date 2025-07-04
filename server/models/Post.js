const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    minlength: 10
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Post', postSchema);
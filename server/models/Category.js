const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  description: {
    type: String,
    trim: true,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Category', categorySchema);
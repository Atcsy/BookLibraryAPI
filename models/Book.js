const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
    maxlength: 100,
  },
  country: {
    type: String,
    maxlength: 100,
  },
  imageLink: {
    type: String,
    maxlength: 555,
  },
  language: {
    type: String,
    maxlength: 255,
  },
  link: {
    type: String,
  },
  pages: {
    type: Number,
    min: 1,
    max: 9999,
  },
  title: {
    type: String,
    required: true,
    maxlength: 255,
  },
  year: {
    type: Number,
  },
  inStock: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);

const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  author: {
    type: String,
    unique: true,
    required: true,
    maxlength: 100,
  },
  country: {
    type: String,
    maxlength: 100,
    required: true,
  },
  imageLink: {
    type: String,
    maxlength: 555,
  },
  language: {
    type: String,
    maxlength: 255,
    required: true,
  },
  link: {
    type: String,
  },
  pages: {
    type: Number,
    min: 1,
    max: 9999,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
  },
  year: {
    type: Number,
    max: 2500,
    min: -9000,
  },
  inStock: {
    type: Number,
    min: 0,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', BookSchema);

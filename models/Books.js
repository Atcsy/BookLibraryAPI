const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  bookReleasedAt: {
    type: Number,
    min: 1,
    max: 6
  },
  inStock: {
    type: Number,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Book', BookSchema);



book.image_url
book.released_at 
genre.genre 
status 
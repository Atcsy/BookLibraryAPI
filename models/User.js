const mongoose = require('mongoose');

const BooksRentedSchema = new mongoose.Schema({
  BookID : {type: String},
  rentedDate: {type: String},
  expireDate: {type: String}  
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    select: false
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  booksRented : [BooksRentedSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', UserSchema);

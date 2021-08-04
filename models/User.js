const mongoose = require('mongoose');

const BooksRentedSchema = new mongoose.Schema({
  BookId : { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  rentedDate: { type: Date }  
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
  booksRented : [ BooksRentedSchema ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('User', UserSchema);

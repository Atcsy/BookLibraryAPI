const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  issueDate: {
    type: Date,
    default: Date.now(),
  },
  returnDate: { type: Date },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Rental', RentalSchema);

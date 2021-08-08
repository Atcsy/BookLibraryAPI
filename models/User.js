const mongoose = require('mongoose');
const brcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    maxlength: 255,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    select: false,
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  role: {
    type: String,
    enum: ['user', 'librarian', 'admin'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//use mongoose middleware to hash the password after saving user
UserSchema.pre('save', async function (next) {
  const salt = await brcryptjs.genSalt(9);
  this.password = await brcryptjs.hash(this.password, salt);
});

//Sign JWT and return back to user
UserSchema.methods.getJwt = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

UserSchema.methods.matchPasswords = async function (enteredPassword) {
  return await brcryptjs.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

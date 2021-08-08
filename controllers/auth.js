const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// POST api/v1/register
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, phone } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
  });

  const token = user.getJwt();
  res.status(201).json({ success: true, token });
});

// POST api/v1/login
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('password');

  if (!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }
  // Check for matching passwords
  const isMatch = await user.matchPasswords(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }

  const token = user.getJwt();
  res.status(201).json({ success: true, token });
});

// GET api/v1/me auth
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(201).json({ success: true, data: user });
});

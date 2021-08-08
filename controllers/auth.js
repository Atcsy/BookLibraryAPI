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
  res.status(201).json({ success: true, message: 'Successful Registration' });
});

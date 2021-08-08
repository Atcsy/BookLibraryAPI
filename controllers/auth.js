const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');

// POST api/v1/register
exports.registerUser = asyncHandler(async (req, res, next) => {
  res.status(201).json({ success: true, data: 'reg' });
});

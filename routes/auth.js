const express = require('express');
const {
  registerUser,
  loginUser,
  getMe,
  registerAdmin,
} = require('../controllers/auth');

const router = express.Router();

const { auth } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/me').get(auth, getMe);
router.route('/register/admin').post(registerAdmin);

module.exports = router;

const express = require('express');
const {
  rentBook,
  returnBook,
  getOverDueRentals,
} = require('../controllers/rentals');

const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/overdue/').get(auth, getOverDueRentals);
router.route('/rent/').post(auth, rentBook);
router.route('/return/').post(auth, returnBook);

module.exports = router;

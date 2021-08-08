const express = require('express');
const {
  rentBook,
  returnBook,
  getOverDueRentals,
} = require('../controllers/rentals');

const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/overdue/').get(auth, getOverDueRentals);
router.route('/rent/:id').post(auth, rentBook);
router.route('/return/:id').post(auth, returnBook);

module.exports = router;

const express = require('express');
const {
  rentBook,
  returnBook,
  getOverDueRentals,
} = require('../controllers/rentals');

const router = express.Router();

router.route('/overdue/').get(getOverDueRentals);
router.route('/rent/:id').post(rentBook);
router.route('/return/:id').post(returnBook);

module.exports = router;

const express = require('express');
const {rentBook} = require('../controllers/rentals');
const router = express.Router();



router
    .route('/:id')
    .post(rentBook);

   

module.exports = router;
const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getUsers).post(auth, createUser);

router
  .route('/:id')
  .get(getUser)
  .put(auth, updateUser)
  .delete(auth, deleteUser);

module.exports = router;

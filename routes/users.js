const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const { auth, admin } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(auth, admin, getUsers).post(auth, createUser);

router
  .route('/:id')
  .get(auth, admin, getUser)
  .put(auth, admin, updateUser)
  .delete(auth, admin, deleteUser);

module.exports = router;

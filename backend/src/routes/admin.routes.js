const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { admin } = require('../middleware/role.middleware');

router.use(protect, admin);

router.route('/users').get(getUsers);
router.route('/users/:id').delete(deleteUser);

module.exports = router;

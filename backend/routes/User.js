const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.post('/register', UserController.createUser);
router.post('/login', UserController.getUser);

module.exports = router;
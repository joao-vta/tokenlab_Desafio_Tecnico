const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User')

router.post('/user/register', UserController.createUser);
router.post('/user/login', UserController.getUser);

module.exports = router;
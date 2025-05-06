const express = require('express');
const router = express.Router();

const register = require('../controllers/users/register');
const login = require('../controllers/users/login');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
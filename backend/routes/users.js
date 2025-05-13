const express = require('express');
const router = express.Router();

const register = require('../controllers/users/register');
const login = require('../controllers/users/login');
const list = require('../controllers/users/list');

const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

router.post('/register', register);
router.post('/login', login);
router.get('/list', verifyToken, isAdmin, list);

module.exports = router;
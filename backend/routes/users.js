const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// 🔑 api Admin
const list = require('../controllers/users/list');

router.get('/list', verifyToken, isAdmin, list);

// 🎯 api User
const register = require('../controllers/users/register');
const login = require('../controllers/users/login');
const infos = require('../controllers/users/infos')

router.post('/register', register);
router.post('/login', login);
router.get('/infos', verifyToken, infos);

module.exports = router;
const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// 🔑 api Admin
const create = require('../controllers/nodes/create');
router.post('/create', verifyToken, isAdmin, create);

module.exports = router;
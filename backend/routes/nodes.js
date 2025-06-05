const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// 🔑 api Admin
const create = require('../controllers/nodes/create');
const list = require('../controllers/nodes/list');

router.post('/create', verifyToken, isAdmin, create);
router.get('/list', verifyToken, isAdmin, list);

module.exports = router;
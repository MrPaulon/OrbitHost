const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// 🔑 api Admin
const create = require('../controllers/nodes/create');
const list = require('../controllers/nodes/list');
const remove = require('../controllers/nodes/delete');

router.post('/create', verifyToken, isAdmin, create);
router.get('/list', verifyToken, isAdmin, list);
router.delete('/delete/:id', verifyToken, isAdmin, remove);

module.exports = router;
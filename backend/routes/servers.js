const express = require('express');
const router = express.Router();

// Middleware
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// 🔑 api Admin
const listall = require('../controllers/servers/listall');
router.get('/listall', verifyToken, isAdmin, listall);
const create = require('../controllers/servers/create');
router.post('/create', verifyToken, isAdmin, create);

// 🎯 api User
const list = require('../controllers/servers/list');
const remove = require('../controllers/servers/delete');

router.get('/list', verifyToken, list);
router.delete('/delete/:id', verifyToken, remove);

module.exports = router;
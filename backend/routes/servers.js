const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');
const create = require('../controllers/servers/create');
const list = require('../controllers/servers/list');

router.post('/create', verifyToken, create);
router.get('/list', verifyToken, list);

module.exports = router;
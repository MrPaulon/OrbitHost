const express = require('express');
const router = express.Router();

const create = require('../controllers/servers/create');
const verifyToken = require('../middleware/auth');

router.post('/create', verifyToken, create);

module.exports = router;
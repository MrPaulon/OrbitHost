const express = require('express');
const router = express.Router();

// Module vérification token
const verifyToken = require('../middleware/auth');

// Routes
const ping = require('../controllers/agents/ping');
router.post('/ping', verifyToken, ping);

module.exports = router;
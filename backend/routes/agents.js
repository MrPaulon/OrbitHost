const express = require('express');
const router = express.Router();

// Module vérification token
const verifyToken = require('../middleware/auth');

// Routes
const run = require('../controllers/agents/run');

router.post('/run', verifyToken, run);

module.exports = router;
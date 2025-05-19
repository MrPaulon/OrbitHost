const express = require('express');
const router = express.Router();

// Module vérification token
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Routes
const create = require('../controllers/locations/create');
router.post('/create', verifyToken, isAdmin, create);

module.exports = router;
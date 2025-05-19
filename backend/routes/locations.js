const express = require('express');
const router = express.Router();

// Module vérification token
const verifyToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Routes
const create = require('../controllers/locations/create');
const list = require('../controllers/locations/list');
router.post('/create', verifyToken, isAdmin, create);
router.get('/list', verifyToken, isAdmin, list);

module.exports = router;
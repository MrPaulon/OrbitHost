const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');
const verify = require('../controllers/token/verify');


router.get('/verify', verifyToken, verify);

module.exports = router;
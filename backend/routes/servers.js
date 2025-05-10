const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/auth');
const create = require('../controllers/servers/create');
const list = require('../controllers/servers/list');
const remove = require('../controllers/servers/delete');

router.post('/create', verifyToken, create);
router.get('/list', verifyToken, list);
router.delete('/delete/:id', verifyToken, remove);

module.exports = router;
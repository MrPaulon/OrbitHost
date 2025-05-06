const express = require('express');
const router = express.Router();
const { getConnection } = require('../db/connection');

router.get('/', async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
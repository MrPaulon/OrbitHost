const mariadb = require('mariadb');
require('dotenv').config(); // Charge les variables depuis le .env

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

// Fonction pour obtenir une connexion (ex: dans un routeur)
async function getConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    return conn;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  pool,
  getConnection
};
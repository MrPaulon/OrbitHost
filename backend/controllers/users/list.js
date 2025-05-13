const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  try {
    const conn = await getConnection();
    const users = await conn.query('SELECT * FROM users');
    conn.release();

    logger.info(`Liste des utilisateurs récupérée`, { ip: req.ipAddress });
    return res.status(200).json(users);
  } catch (err) {
    logger.error(`Erreur lors de la récupération des utilisateurs: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
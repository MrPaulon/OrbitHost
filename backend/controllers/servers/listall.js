const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    logger.warn(`Tentative de récupération d'un utilisateur non authentifié`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  try {
    const conn = await getConnection();
    const rows = await conn.query('SELECT * FROM servers');
    conn.release();

    logger.info(`Récupération de la liste des serveurs par l'utilisateur: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json(rows);
  } catch (err) {
    logger.error(`Erreur lors de la récupération des serveurs : ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
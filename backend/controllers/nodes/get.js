const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const userId = req.user?.userId;
  const nodeId = req.params.id;

  if (!userId) {
    logger.warn(`Tentative de récupération des nodes par un utilisateur non authentifié`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  try {
    const conn = await getConnection();
    const node = await conn.query(
      'SELECT * FROM nodes WHERE id = ?',
      [nodeId]
    );
    // Vérification que la node existe
    if (node.length === 0) {
      logger.warn(`Node inexistante. Node id: ${nodeId} par: ${userId}`, { ip: req.ipAddress });
      conn.release();
      return res.status(404).json({ error: 'Node inexistante.' });
    }   

    logger.info(`Récupération de la node: ${nodeId} par l'utilisateur: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json(node);
  } catch (err) {
    logger.error(`Erreur lors de la récupération de la node : ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
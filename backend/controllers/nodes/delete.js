

const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const nodeId = req.params.id;
  const userId = req.user?.userId;

  if (!userId) {
    logger.error(`Tentative de suppression de node échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  if (!nodeId) {
    return res.status(400).json({ error: 'ID de la node manquant.' });
  }

  try {
    const conn = await getConnection();
    const rows = await conn.query(
      'SELECT * FROM nodes WHERE id = ?',
      [nodeId]
    );
    // Vérification que la node existe
    if (rows.length === 0) {
      logger.warn(`Node inexistante. Node id: ${nodeId} par: ${userId}`, { ip: req.ipAddress });
      conn.release();
      return res.status(404).json({ error: 'Node inexistante.' });
    }   

    // Suppression de la node
    await conn.query(
      'DELETE FROM nodes WHERE id = ?',
      [nodeId]
    );

    logger.info(`Node: ${nodeId} supprimé par: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json({ message: 'Node supprimé.' });
  } catch (err) {
    logger.error(`Erreur lors de la suppression d'une node: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne de la node.' });
  }
};
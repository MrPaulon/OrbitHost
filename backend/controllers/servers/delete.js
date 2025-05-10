

const { getConnection } = require('../../db/connection');

module.exports = async (req, res) => {
  const serverId = req.params.id;
  const userId = req.user?.userId;

  if (!userId) {
    logger.error(`Tentative de suppression de serveur échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  if (!serverId) {
    return res.status(400).json({ error: 'ID du serveur manquant.' });
  }

  try {
    const conn = await getConnection();
    const result = await conn.query(
      'DELETE FROM servers WHERE id = ? AND user_id = ?',
      [serverId, userId]
    );
    conn.release();

    if (result.affectedRows === 0) {
        logger.warn(`Tentative de suppression du serveyr: ${serverId} par: ${userId}`, { ip: req.ipAddress });
        return res.status(404).json({ error: 'Serveur non trouvé ou non autorisé.' });
    }

    logger.info(`Serveur: ${serverId} supprimé par: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json({ message: 'Serveur supprimé.' });
  } catch (err) {
    logger.error(`Erreur lors de la suppression d'un serveur: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
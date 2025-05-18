

const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const serverId = req.params.id;
  const userId = req.user?.userId;
  const userIsAdmin = req.user.isAdmin;

  console.log(userIsAdmin);

  if (!userId) {
    logger.error(`Tentative de suppression de serveur échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  if (!serverId) {
    return res.status(400).json({ error: 'ID du serveur manquant.' });
  }

  try {
    const conn = await getConnection();
    const rows = await conn.query(
      'SELECT * FROM servers WHERE id = ?',
      [serverId]
    );
    // Vérification que le serveur existe
    if (rows.length === 0) {
      logger.warn(`Serveur inexistant. Server id: ${serverId} par: ${userId}`, { ip: req.ipAddress });
      conn.release();
      return res.status(404).json({ error: 'Serveur inexistant.' });
    }   

    // Vérification que l'utilisateur est propriétaire du serveur ou est un administrateur
    if (rows.user_id != userId && !userIsAdmin ) {
      logger.warn(`Non autorisé à supprimer le serveur. id: ${serverId} par: ${userId}`, { ip: req.ipAddress });
      conn.release();
      return res.status(404).json({ error: 'Non autorisé à supprimer.' });
    }

    // Suppression du serveur
    await conn.query(
      'DELETE FROM servers WHERE id = ?',
      [serverId]
    );

    logger.info(`Serveur: ${serverId} supprimé par: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json({ message: 'Serveur supprimé.' });
  } catch (err) {
    logger.error(`Erreur lors de la suppression d'un serveur: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
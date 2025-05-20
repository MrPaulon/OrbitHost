const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const locationID = req.params.id;
  const userId = req.user?.userId;

  if (!userId) {
    logger.error(`Tentative de suppression d'un emplacement échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  if (!locationID) {
    return res.status(400).json({ error: 'ID emplacement manquant.' });
  }

  try {
    const conn = await getConnection();
    const result = await conn.query(
        'DELETE FROM locations WHERE id = ?',
        [locationID]
    );
    conn.release();

    // Vérification de la suppression
    if (result.affectedRows === 0) {
        logger.warn(`Emplacement non trouvé. Emplacement id: ${locationID} par: ${userId}`, { ip: req.ipAddress });
        return res.status(404).json({ error: 'Emplacement non trouvé.' });
    }   

    logger.info(`Emplacement: ${locationID} supprimé par: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json({ message: 'Emplacement supprimé.' });
  } catch (err) {
    logger.error(`Erreur lors de la suppression d'un emplacement: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
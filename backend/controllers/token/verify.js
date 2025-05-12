

const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    logger.warn(`Tentative de récupération d'un utilisateur non authentifié`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  try {
    logger.info(`Vérification validité d'un token`, { ip: req.ipAddress });
    return res.status(200).json({token: 'valide'});
  } catch (err) {
    logger.error(`Erreur lors de la vérification du token : ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};


const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const { userTarget = req.user?.userId } = req.body; // Récupère l'utilisateur cible ou lui même par défaut
  const userId = req.user?.userId;
  const userIsAdmin = req.user.isAdmin;


  // Vérifiaction que l'utilisateur soit identifié
  if (!userId) {
    logger.warn(`Tentative de récupération d'un utilisateur non authentifié`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  try {

    // S'assure que ce soit l'utilisateur qui récupère ses propes infos ou un admin
    if (userTarget != userId && !userIsAdmin) {
        logger.warn(`Non autorisé à récupérer le profil. targer id: ${userId} par: ${userId}`, { ip: req.ipAddress });
        return res.status(404).json({ error: 'Non autorisé à consulter le profil.' });
    }

    // Récupère l'utilisateur souhaité en BDD
    const conn = await getConnection();
    const result = await conn.query('SELECT * FROM users WHERE id = ?', [userTarget]);

    // Vérification que l'utilisatuer existe
    if (result.length === 0) {
      logger.warn(`Utilisateur inexistant. Utilisateur cible: ${userTarget} par: ${userId}`, { ip: req.ipAddress });
      conn.release();
      return res.status(404).json({ error: 'Utilisateur inexistant.' });
    } 
    
    // Ferme la liaison DBB et renvoie les informations
    conn.release();
    logger.info(`Récupération des informations du compte ${userTarget} par l'utilisateur: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json(result);
  } catch (err) {
    logger.error(`Erreur lors de la récupération du compte : ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
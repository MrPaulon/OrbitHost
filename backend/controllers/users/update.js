

const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
    const { userTarget = req.user?.userId, pseudo = '', email = '', password = '' } = req.body;
    const userId = req.user?.userId;
    const userIsAdmin = req.user.isAdmin;


    // Vérifiaction que l'utilisateur soit identifié
    if (!userId) {
        logger.warn(`Tentative de modification par un utilisateur non authentifié`, { ip: req.ipAddress });
        return res.status(401).json({ error: 'Non authentifié.' });
    }

    try {

        // S'assure que ce soit l'utilisateur qui récupère ses propes infos ou un admin
        if (userTarget != userId && !userIsAdmin) {
            logger.warn(`Non autorisé à modifier le profil. target id: ${userId} par: ${userId}`, { ip: req.ipAddress });
            return res.status(404).json({ error: 'Non autorisé à modifier le profil.' });
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

        // Mise à jour des champs fournis
        const fieldsToUpdate = {};
        if (pseudo) fieldsToUpdate.pseudo = pseudo;
        if (email) fieldsToUpdate.email = email;
        if (password) fieldsToUpdate.password = password;

        if (Object.keys(fieldsToUpdate).length === 0) {
            conn.release();
            return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
        }

        const updateQuery = 'UPDATE users SET ' + Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ') + ' WHERE id = ?';
        const updateValues = [...Object.values(fieldsToUpdate), userTarget];

        await conn.query(updateQuery, updateValues);
        // Ferme la liaison DBB et renvoie les informations
        conn.release();
        logger.info(`Modification du compte ${userTarget} par l'utilisateur: ${userId}`, { ip: req.ipAddress });
        return res.status(200).json({message: 'Modification effectué'});
    } catch (err) {
        logger.error(`Erreur lors de la récupération du compte : ${err.message}`, { ip: req.ipAddress });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
    const { name, description = ''} = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        logger.warn(`Tentative de création d'un emplacement échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
        return res.status(401).json({ error: 'Non authentifié.' });
    }

    if (!name) {
        logger.warn(`Emplacement non créé. Paramètres manquants : ${JSON.stringify(req.body)}`, { ip: req.ipAddress });
        return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    try {
        const conn = await getConnection();

        // Insert la location en BDD
        const result = await conn.query(
            'INSERT INTO locations (name, description) VALUES (?, ?)',
            [name, description]
        );
        const locationID = Number(result.insertId);

        conn.release();
        
        logger.info(`Emplacement ajouté par l'utilisateur ${userId} avec l'ID ${locationID}`, { ip: req.ipAddress });

        return res.status(201).json({
            message: 'Emplacement ajouté.',
            id: locationID
        });
    } catch (err) {
        logger.error(`Erreur lors de création d'un emplacement: ${err.message}`, { ip: req.ipAddress });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
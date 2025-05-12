const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
    const { name, ip_address, ssh_port = 22, username, ownerId = req.user?.userId} = req.body;

    const userId = req.user?.userId;

    if (!userId) {
        logger.warn(`Tentative de création de serveur échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
        return res.status(401).json({ error: 'Non authentifié.' });
    }

    if (!name || !ip_address || !username) {
        logger.warn(`Serveur non créé. Paramètres manquants : ${JSON.stringify(req.body)}`, { ip: req.ipAddress });
        return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.([0-5]?[0-9]{1,2})\.([0-5]?[0-9]{1,2})\.([0-5]?[0-9]{1,2})$/;
        if (!ipRegex.test(ip_address)) {
        return res.status(400).json({ error: 'Adresse IP invalide.' });
    }

    if (ssh_port < 1 || ssh_port > 65535) {
        return res.status(400).json({ error: 'Port SSH invalide.' });
    }

    try {
        const conn = await getConnection();
        const result = await conn.query(
            'INSERT INTO servers (user_id, name, ip_address, ssh_port, username) VALUES (?, ?, ?, ?, ?)',
            [ownerId, name, ip_address, ssh_port, username]
        );
        conn.release();
        // Transforme le server id en INT
        const serverID = Number(result.insertId);

        logger.info(`Serveur ajouté par l'utilisateur ${userId} avec l'ID ${serverID}`, { ip: req.ipAddress });

        return res.status(201).json({ message: 'Serveur ajouté.', id: serverID });
    } catch (err) {
        logger.error(`Erreur lors de l'ajout du serveur: ${err.message}`, { ip: req.ipAddress });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
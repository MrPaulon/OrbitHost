const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');
const axios = require('axios');


module.exports = async (req, res) => {
    const {nodeID, cmd} = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        logger.warn(`Tentative de création d'un emplacement échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
        return res.status(401).json({ error: 'Non authentifié.' });
    }

    if (!nodeID || !cmd) {
        logger.warn(`Commande non envoyée. Paramètres manquants : ${JSON.stringify(req.body)}`, { ip: req.ipAddress });
        return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    try {
        const conn = await getConnection();

        // Récupère la node
        const [node] = await conn.query(
            'SELECT * FROM nodes WHERE id = ?',
            [nodeID]
        );

        if (!node) {
            logger.warn(`Node non trouvé.`, { ip: req.ipAddress });
            return res.status(404).json({ error: 'Node non trouvé.' });
        }

        conn.release();

        const response = await axios.post(`http://${node.ip_address}:${node.ssh_port}/run`, 
            { cmd },
            {
                headers: {
                    'Authorization': `Bearer ${node.token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        logger.info(`Commande "${cmd}" envoyée à l'agent du node ${nodeID} par l'utilisateur ${userId}`, { ip: req.ipAddress });

        return res.status(201).json({
            message: 'Commande envoyée.',
            data: response.data
        });
    } catch (err) {
        logger.error(`Erreur lors de l'envoie de la commande: ${err.message}`, { ip: req.ipAddress });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
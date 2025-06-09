const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { name, fqdn, ip_address, location_id, storageValue, memoryValue, cpuValue, maintenance, port = '5555' } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
        logger.warn(`Tentative de création de node échouée pour un utilisateur non authentifié.`, { ip: req.ipAddress });
        return res.status(401).json({ error: 'Non authentifié.' });
    }

    try {
        const conn = await getConnection();

        // Étape 1 : insérer d'abord sans token
        const result = await conn.query(
            'INSERT INTO nodes (name, fqdn, ip_address, location_id, storage_usage, ram_usage, cpu_usage, maintenance, ssh_port) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [name, fqdn, ip_address, location_id, storageValue, memoryValue, cpuValue, maintenance, port]
        );
        const nodeID = Number(result.insertId);

        // Étape 2 : créer un token JWT avec le nodeID
        const token = jwt.sign(
            {
                nodeId: nodeID,
                name,
                ip: ip_address
            },
            process.env.JWT_SECRET,
            { expiresIn: '9999 years' }
        );

        // Étape 3 : mettre à jour la ligne pour ajouter le token
        await conn.query(
            'UPDATE nodes SET token = ? WHERE id = ?',
            [token, nodeID]
        );

        conn.release();

        logger.info(`Node ajouté par l'utilisateur ${userId} avec l'ID ${nodeID}`, { ip: req.ipAddress });

        const envContent = `AGENT_TOKEN=${token}\nAGENT_PORT=${port}\nAGENT_IP=${ip_address}`;
        const command = `echo "${envContent}" > .env && ./start.sh`;

        return res.status(201).json({
            message: 'Node ajouté.',
            nodeID: nodeID,
            command

        });
    } catch (err) {
        logger.error(`Erreur lors de l'ajout du node: ${err.message}`, { ip: req.ipAddress });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
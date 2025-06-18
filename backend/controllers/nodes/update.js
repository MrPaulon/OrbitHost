const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
    const { nodeId, name, fqdn, ip_address, location_id, token, status, ssh_port, maintenance, cpu_usage, ram_usage, storage_usage } = req.body;
    const userId = req.user?.userId;

    // Vérifiaction que l'utilisateur soit identifié
    if (!userId) {
        logger.warn(`Tentative de modification par un utilisateur non authentifié`, { ip: req.ipAddress });
        return res.status(401).json({ error: 'Non authentifié.' });
    }

    try {
        // Récupère la node souhaité en BDD
        const conn = await getConnection();
        const result = await conn.query('SELECT * FROM nodes WHERE id = ?', [nodeId]);

        // Vérification que la node existe
        if (result.length === 0) {
            logger.warn(`Node inexistante. Node cible: ${nodeId} par: ${userId}`, { ip: req.ipAddress });
            conn.release();
            return res.status(404).json({ error: 'Node inexistante.' });
        }

        // Mise à jour des champs fournis
        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (fqdn) fieldsToUpdate.fqdn = fqdn;
        if (ip_address) fieldsToUpdate.ip_address = ip_address;
        if (location_id) fieldsToUpdate.location_id = location_id;
        if (token) fieldsToUpdate.token = token;
        if (status) fieldsToUpdate.status = status;
        if (ssh_port) fieldsToUpdate.ssh_port = ssh_port;
        if (maintenance) fieldsToUpdate.maintenance = maintenance;
        if (cpu_usage) fieldsToUpdate.cpu_usage = cpu_usage;
        if (ram_usage) fieldsToUpdate.ram_usage = ram_usage;
        if (storage_usage) fieldsToUpdate.storage_usage = storage_usage;

        if (Object.keys(fieldsToUpdate).length === 0) {
            conn.release();
            return res.status(400).json({ error: 'Aucun champ à mettre à jour.' });
        }

        console.log(fieldsToUpdate)

        const updateQuery = 'UPDATE nodes SET ' + Object.keys(fieldsToUpdate).map(key => `${key} = ?`).join(', ') + ' WHERE id = ?';
        const updateValues = [...Object.values(fieldsToUpdate), nodeId];

        await conn.query(updateQuery, updateValues);
        // Ferme la liaison DBB et renvoie les informations
        conn.release();
        logger.info(`Modification de la node ${nodeId} par l'utilisateur: ${userId}`, { ip: req.ipAddress });
        return res.status(200).json({message: 'Modification effectué'});
    } catch (err) {
        logger.error(`Erreur lors de la récupération du compte : ${err.message}`, { ip: req.ipAddress });
        return res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};
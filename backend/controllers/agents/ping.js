const jwt = require('jsonwebtoken');
const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

module.exports = async (req, res) => {
  const { hostname, os, os_version, cpu_usage, ram_total, ram_used, uptime } = req.body;

  try {
    const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token à partir de l'en-tête Authorization
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const serverId = decoded.serverId;
    const conn = await getConnection();

    const rows = await conn.query(
      'SELECT id FROM server_metrics WHERE server_id = ?',
      [serverId]
    );

    if (rows != null) {
      // INSERT
      await conn.query(
        'INSERT INTO server_metrics (server_id, hostname, os, os_version, cpu_usage, ram_total, ram_used, uptime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [serverId, hostname, os, os_version, cpu_usage, ram_total, ram_used, uptime]
      );
    } else {
      // UPDATE
      await conn.query(
        'UPDATE server_metrics SET hostname = ?, os = ?, os_version = ?, cpu_usage = ?, ram_total = ?, ram_used = ?, uptime = ?, created_at = CURRENT_TIMESTAMP WHERE server_id = ?',
        [hostname, os, os_version, cpu_usage, ram_total, ram_used, uptime, serverId]
      );
    }

    conn.release();


    logger.info(`Serveur n°${serverId} a envoyé ces metrics`, { ip: req.ipAddress });

    return res.status(200).json({
      message: 'Informations reçues.'
    });
  } catch (err) {
    logger.error(`Erreur lors de la connexion d'un serveur: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
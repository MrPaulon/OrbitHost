const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');
const axios = require('axios');

module.exports = async (req, res) => {
  const userId = req.user?.userId;
  const nodeId = req.params.id;

  if (!userId) {
    logger.warn(`Tentative de récupération des metrics d'un node par un utilisateur non authentifié`, { ip: req.ipAddress });
    return res.status(401).json({ error: 'Non authentifié.' });
  }

  try {
    const conn = await getConnection();
    const [node] = await conn.query(
      'SELECT * FROM nodes WHERE id = ?',
      [nodeId]
    );
    // Vérification que la node existe
    if (node.length === 0) {
      logger.warn(`Node inexistante. Node id: ${nodeId} par: ${userId}`, { ip: req.ipAddress });
      conn.release();
      return res.status(404).json({ error: 'Node inexistante.' });
    }

    const result = await axios.get(`http://${node.ip_address}:${node.ssh_port}/metrics`, 
      {
        headers: {
          'Authorization': `Bearer ${node.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const metrics = result.data


    await conn.query(
      'INSERT INTO node_metrics (node_id, os, os_version, architecture, processor, cpu_count, cpu_percent, memory_total_gb, memory_used_gb, memory_percent, disk_total_gb, disk_used_gb, disk_percent, boot_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nodeId, metrics.os, metrics.os_version, metrics.architecture, metrics.processor, metrics.cpu_count, metrics.cpu_percent, metrics.memory_total_gb, metrics.memory_used_gb, metrics.memory_percent, metrics.disk_total_gb, metrics.disk_used_gb, metrics.disk_percent, metrics.boot_time]
    );

    conn.release();

    logger.info(`Récupération des metrics la node: ${nodeId} par l'utilisateur: ${userId}`, { ip: req.ipAddress });
    return res.status(200).json(metrics);
  } catch (err) {
    logger.error(`Erreur lors de la récupération de la node : ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
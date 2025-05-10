const bcrypt = require('bcrypt');
const { getConnection } = require('../../db/connection');
const logger = require('../../utils/logger');

const SALT_ROUNDS = 10;

module.exports = async (req, res) => {
  const { email, password, pseudo } = req.body;
  if (!email || !password || !pseudo) {
    return res.status(400).json({ error: 'Email, mot de passe et pseudo sont requis.' });
  }

  try {
    const conn = await getConnection();
    const [existingUserByEmail] = await conn.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUserByEmail) {
      conn.release();
      return res.status(409).json({ error: 'Cet email est déjà utilisé.' });
    }

    const [existingUserByPseudo] = await conn.query('SELECT id FROM users WHERE pseudo = ?', [pseudo]);
    if (existingUserByPseudo) {
      conn.release();
      return res.status(409).json({ error: 'Ce pseudo est déjà utilisé.' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await conn.query(
      'INSERT INTO users (email, password_hash, pseudo) VALUES (?, ?, ?)',
      [email, passwordHash, pseudo]
    );

    // Transforme le user id en INT
    const userID = Number(result.insertId);

    conn.release();
    logger.info(`Création d'un nouveau compte: ${userID}`, { ip: req.ipAddress });

    return res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (err) {
    logger.error(`Erreur lors de la création d'un compte: ${err.message}`, { ip: req.ipAddress });
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
};
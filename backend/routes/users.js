const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getConnection } = require('../db/connection');

const SALT_ROUNDS = 10;

router.post('/register', async (req, res) => {
  const { email, password, pseudo } = req.body;

  // Validation de base
  if (!email || !password || !pseudo) {
    return res.status(400).json({ error: 'Email, mot de passe et pseudo sont requis.' });
  }

  try {
    const conn = await getConnection();

    // Vérifie si l'utilisateur existe déjà avec l'email ou le pseudo
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

    // Hachage du mot de passe
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insertion du nouvel utilisateur avec pseudo
    await conn.query(
      'INSERT INTO users (email, password_hash, pseudo) VALUES (?, ?, ?)',
      [email, passwordHash, pseudo]
    );

    conn.release();
    return res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (err) {
    console.error('Erreur lors de l’inscription:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
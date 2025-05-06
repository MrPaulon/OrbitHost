const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../db/connection');

const SALT_ROUNDS = 10;

// Route d'inscription
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

// Route de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe sont requis.' });
  }

  try {
    const conn = await getConnection();

    // Recherche l'utilisateur par email
    const [user] = await conn.query('SELECT id, email, password_hash FROM users WHERE email = ?', [email]);
    
    if (!user) {
      conn.release();
      return res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }

    // Comparaison du mot de passe envoyé avec le mot de passe haché
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      conn.release();
      return res.status(401).json({ error: 'Mot de passe incorrect.' });
    }

    // Génération d'un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET, // Assure-toi d'avoir une clé secrète dans ton .env
      { expiresIn: '1h' } // Expiration du token dans 1 heure
    );

    conn.release();
    return res.status(200).json({
      message: 'Connexion réussie.',
      token
    });
  } catch (err) {
    console.error('Erreur lors de la connexion:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur.' });
  }
});

module.exports = router;
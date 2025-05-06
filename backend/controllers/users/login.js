

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('../../db/connection');

module.exports = async (req, res) => {
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
};
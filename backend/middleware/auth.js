const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Récupérer le token à partir de l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
  }

  try {
    // Vérification du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajoute les informations de l'utilisateur dans la requête
    next(); // Passe à la route suivante
  } catch (err) {
    return res.status(400).json({ error: 'Token invalide ou expiré.' });
  }
};

module.exports = verifyToken;
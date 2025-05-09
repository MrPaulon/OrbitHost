const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charge les variables depuis le .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permet de lire le JSON dans les requêtes

// Routes
const userRoutes = require('./routes/users'); // Exemple : fichier routes/users.js
app.use('/api/users', userRoutes);

// Routes
const serverRoutes = require('./routes/servers'); // Exemple : fichier routes/users.js
app.use('/api/servers', serverRoutes);

// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
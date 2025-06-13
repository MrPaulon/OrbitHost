const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Charge les variables depuis le .env

// Charge le middleware pour l'ip
const ipMiddleware = require('./middleware/ip');

// Initialise express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Permet de lire le JSON dans les requêtes

app.use(ipMiddleware);

// Routes token
const tokenRoutes = require('./routes/token');
app.use('/api/token', tokenRoutes);

// Routes users
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

// Routes servers
const serverNodes = require('./routes/nodes');
app.use('/api/nodes', serverNodes);

// Routes servers
const serverRoutes = require('./routes/servers');
app.use('/api/servers', serverRoutes);

// Routes agent
const agentRoutes = require('./routes/agents');
app.use('/api/agents', agentRoutes);

// Routes locations
const locationsRoutes = require('./routes/locations');
app.use('/api/locations', locationsRoutes);


// Port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server API running on http://localhost:${PORT}`);
});
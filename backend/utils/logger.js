// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // 'info' pour les logs normaux, 'error' pour les erreurs
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }), // Log dans la console
    new winston.transports.File({ filename: 'logs/app.log' }) // Log dans un fichier
  ]
});

module.exports = logger;
# Utilise une image légère
FROM python:3.11-slim

# Définit le dossier de travail
WORKDIR /app

# Copie les fichiers
COPY . .
COPY .env .

COPY start.sh .
RUN chmod +x start.sh

# Installe les dépendances
RUN pip install --no-cache-dir --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

# Définit les variables d’environnement
ENV PYTHONUNBUFFERED=1

# Expose le port (ex. 5555)
EXPOSE 5555

# Commande de démarrage
CMD ["./start.sh"]
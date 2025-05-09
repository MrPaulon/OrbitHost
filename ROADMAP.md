# 🚀 Roadmap - Gestionnaire de Serveurs

**Stack choisi :**
- Frontend : Nuxt 3
- Backend : Express.js avec requêtes SQL écrites à la main
- Base de données : MariaDB
- Agent VPS : Python

---

## 🔹 Phase 1 – Planification & Préparation
**Durée : 1-2 jours**
- [X] Définir les fonctionnalités MVP (auth, ajout serveurs, monitoring, exécution de commandes)
- [X] Créer un monorepo ou arborescence :
  - `frontend/` (Nuxt)
  - `backend/` (Express)
  - `agent/` (Python)
- [X] Choisir MariaDB et créer la base de données
- [X] Écrire un fichier `schema.sql` pour créer les tables à la main

---

## 🔹 Phase 2 – Authentification & Utilisateurs
**Durée : 4-6 jours**

### Backend (Express + SQL)
- [X] Configurer MariaDB avec
- [X] Créer les tables :
  - `users (id, email, password_hash, created_at)`
- [X] Routes :
  - `POST /auth/register` → INSERT utilisateur
  - `POST /auth/login` → SELECT + vérification mot de passe (bcrypt)
- [X] JWT pour authentifier les utilisateurs

### Frontend (Nuxt)
- [X] Pages login / register
- [X] Connexion à l’API pour auth
- [ ] Stockage du JWT (via cookies ou localStorage)

---

## 🔹 Phase 3 – Gestion des serveurs
**Durée : 5-7 jours**

### Backend
- [ ] Tables :
  - `servers (id, user_id, name, token, created_at)`
- [ ] Routes :
  - `POST /servers` → créer un serveur avec un token unique
  - `GET /servers` → lister les serveurs de l'utilisateur connecté
  - `DELETE /servers/:id` → suppression sécurisée
- [ ] Middleware JWT pour protéger les routes

### Frontend
- [ ] Page "Mes serveurs" avec liste et bouton d’ajout
- [ ] Génération d’une commande à copier pour installer l’agent (avec token)

---

## 🔹 Phase 4 – Agent Python (script côté VPS)
**Durée : 5-7 jours**

### Agent Python
- [ ] Lecture d’un fichier de config (token, URL de l’API)
- [ ] Authentification via token serveur
- [ ] Envoi périodique :
  - hostname, IP, uptime, CPU, RAM, disque
- [ ] Utilise `requests`, `psutil`, `socket`, etc.

### Backend
- [ ] Table `metrics (id, server_id, timestamp, cpu, ram, disk, uptime)`
- [ ] Route `POST /agent/metrics` → vérifie token, INSERT dans DB

---

## 🔹 Phase 5 – Commandes à distance
**Durée : 6-10 jours**

### Backend
- [ ] Table `commands (id, server_id, command, status, result, created_at, executed_at)`
- [ ] Routes :
  - `POST /servers/:id/commands` → créer une commande à exécuter
  - `GET /agent/commands` → l’agent demande les commandes en attente
  - `POST /agent/commands/:id/result` → renvoyer la sortie

### Agent Python
- [ ] Récupère périodiquement les commandes en attente
- [ ] Les exécute (ex: `uptime`, `df -h`, etc.)
- [ ] Envoie les résultats à l’API

### Frontend
- [ ] Interface pour exécuter une commande sur un serveur
- [ ] Affichage des résultats

---

## 🔹 Phase 6 – Sécurité & Production
**Durée : 4-6 jours**
- [ ] HTTPS obligatoire (Let's Encrypt avec Nginx ou Caddy)
- [ ] Vérifications d'entrée côté API (validation, sanitisation)
- [ ] Protection brute force (`express-rate-limit`)
- [ ] Logs des actions (auth, exécutions, agents)
- [ ] Expiration ou rotation des tokens serveur (optionnel)

---

## 🔹 Phase 7 – Améliorations & Extensions
**Durée : 7+ jours**
- [ ] Interface admin (liste globale des serveurs & users)
- [ ] Graphiques (CPU, RAM dans le temps avec Chart.js ou ApexCharts)
- [ ] WebSocket ou polling pour mises à jour temps réel
- [ ] Dockerisation du backend et de l’agent
- [ ] Script d’installation rapide : `curl https://... | python`

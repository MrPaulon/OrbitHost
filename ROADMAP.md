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
- [X] Stockage du JWT (via cookies ou localStorage)

---

## 🔹 Phase 3 – Gestion des serveurs
**Durée : 5-7 jours**

### Backend
- [X] Tables :
  - `servers (id, user_id, name, token, created_at)`
- [X] Routes :
  - `POST /servers` → créer un serveur avec un token unique
  - `GET /servers` → lister les serveurs de l'utilisateur connecté
  - `DELETE /servers/:id` → suppression sécurisée
- [X] Middleware JWT pour protéger les routes

### Frontend
- [X] Page "Mes serveurs" avec liste et bouton d’ajout
- [X] Génération d’une commande à copier pour installer l’agent (avec token)

---

## 🔹 Phase 4 – Agent Python (script côté VPS)
**Durée : 5-7 jours**

### Agent Python
- [X] Lecture d’un fichier de config (token, URL de l’API)
- [X] Authentification via token serveur
- [X] Envoi périodique :
  - hostname, IP, uptime, CPU, RAM, disque
- [X] Utilise `requests`, `psutil`, `socket`, etc.

### Backend
- [X] Table `metrics (id, server_id, timestamp, cpu, ram, disk, uptime)`
- [X] Route `POST /agent/metrics` → vérifie token, INSERT dans DB

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
- [X] Webconsole
- [X] Récupère les commandes
- [X] Les exécute (ex: `uptime`, `df -h`, etc.)
- [ ] Envoie les résultats à l’API

### Frontend
- [X] Interface pour exécuter une commande sur un serveur
- [X] Interface avec Webconsole
- [X] Affichage des résultats

---

## 🔹 Phase 6 – Interface de gestion Client + Administrateur
**Durée : 4-6 jours**
- [X] Mise en place du site vitrine + docs
- [X] Interface admin (Liaison avec API)
- [ ] Interface client (Gestion du serveur, Webconsole, FileManager...)
- [ ] Logs des actions (auth, exécutions, agents)

---

## 🔹 Phase 7 – Sécurité & Production
**Durée : 4-6 jours**
- [ ] HTTPS obligatoire (Let's Encrypt avec Nginx ou Caddy)
- [ ] Vérifications d'entrée côté API (validation, sanitisation)
- [ ] Protection brute force (`express-rate-limit`)
- [ ] Logs des actions (auth, exécutions, agents)
- [ ] Expiration ou rotation des tokens serveur (optionnel)

---

## 🔹 Phase 8 – Améliorations & Extensions
**Durée : 7+ jours**
- [ ] Interface admin (liste globale des serveurs & users)
- [ ] Graphiques (CPU, RAM dans le temps avec Chart.js ou ApexCharts)
- [ ] WebSocket ou polling pour mises à jour temps réel
- [ ] Dockerisation du backend et de l’agent
- [ ] Script d’installation rapide : `curl https://... | python`

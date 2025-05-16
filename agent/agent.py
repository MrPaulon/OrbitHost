# Import des packages
import json
import time
import requests
from utils.system_info import collect_system_info

# Chargement de la configuration
with open('config.json') as f:
    config = json.load(f)

API_URL = config["api_url"]
TOKEN = config["token"]
INTERVAL = config["interval"]

# Header des requêtes api
headers = {
    "Authorization": f"Bearer {TOKEN}"
}

# Test de la connexion
data = collect_system_info()
print(data)
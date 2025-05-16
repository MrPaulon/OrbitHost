# Import packages
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



# Token api
headers = {
    "Authorization": f"Bearer {TOKEN}"
}

# Envoie des données
while True:
    try:
        data = collect_system_info()
        res = requests.post(f"{API_URL}/ping", json=data, headers=headers)
        print(f"[PING] Status: {res.status_code}, Response: {res.text}")
    except Exception as e:
        print(f"[ERREUR] {e}")
    time.sleep(INTERVAL)
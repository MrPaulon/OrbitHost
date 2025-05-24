import json
import time
import asyncio
import requests
import websockets
from utils.system_info import collect_system_info
from utils.web_console import terminal

# Chargement de la configuration
with open('config.json') as f:
    config = json.load(f)

API_URL = config["api_url"]
TOKEN = config["token"]
INTERVAL = config["interval"]

headers = {
    "Authorization": f"Bearer {TOKEN}"
}

# Fonction bloquante exécutée dans un thread séparé
def send_data():
    try:
        data = collect_system_info()
        res = requests.post(f"{API_URL}/ping", json=data, headers=headers)
        print(f"[PING] Status: {res.status_code}, Response: {res.text}")
    except Exception as e:
        print(f"[ERREUR] {e}")

# Tâche périodique async qui appelle la fonction bloquante
async def periodic_sender():
    loop = asyncio.get_event_loop()
    while True:
        await loop.run_in_executor(None, send_data)
        await asyncio.sleep(INTERVAL)

# Fonction principale
async def main():
    # Démarrage du serveur WebSocket
    server = await websockets.serve(terminal, "0.0.0.0", 8765)
    print("✅ WebSocket Terminal Server started on ws://0.0.0.0:8765")

    # Lancement parallèle de la tâche d'envoi
    await periodic_sender()

# Lancement de la boucle
asyncio.run(main())
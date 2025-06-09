from dotenv import load_dotenv
import os

load_dotenv()

AGENT_TOKEN = os.getenv("AGENT_TOKEN")
AGENT_PORT = int(os.getenv("AGENT_PORT"))
AGENT_IP = os.getenv("AGENT_IP")
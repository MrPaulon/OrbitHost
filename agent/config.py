from dotenv import load_dotenv
import os

load_dotenv()

AGENT_TOKEN = os.getenv("AGENT_TOKEN", "changeme")
AGENT_PORT = int(os.getenv("AGENT_PORT", "5000"))
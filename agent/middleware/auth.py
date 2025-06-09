from fastapi import Request, HTTPException
from config import AGENT_TOKEN

async def verify_token(request: Request):
    auth = request.headers.get("Authorization")
    if not auth or not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = auth.split(" ")[1]
    if token != AGENT_TOKEN:
        raise HTTPException(status_code=403, detail="Forbidden")
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import asyncio
import os
import pty
import subprocess

router = APIRouter()

@router.websocket("/ws")
async def websocket_console(websocket: WebSocket):
    await websocket.accept()
    master_fd, slave_fd = pty.openpty()
    
    proc = subprocess.Popen(
        ["/bin/bash"],
        preexec_fn=os.setsid,
        stdin=slave_fd,
        stdout=slave_fd,
        stderr=slave_fd,
        universal_newlines=True
    )

    async def read_from_terminal():
        loop = asyncio.get_event_loop()
        while True:
            try:
                data = await loop.run_in_executor(None, os.read, master_fd, 1024)
                await websocket.send_text(data.decode())
            except:
                break

    asyncio.create_task(read_from_terminal())

    try:
        while True:
            data = await websocket.receive_text()
            os.write(master_fd, data.encode())
    except WebSocketDisconnect:
        proc.terminate()
# Import des packages
import asyncio
import os
import pty

async def terminal(websocket, path):
    pid, fd = pty.fork()
    if pid == 0:
        # Enfant : exécute le shell
        os.execvp("bash", ["bash"])
    else:
        loop = asyncio.get_event_loop()

        async def read_pty():
            while True:
                data = await loop.run_in_executor(None, os.read, fd, 1024)
                await websocket.send(data.decode(errors='ignore'))

        async def write_pty():
            async for message in websocket:
                os.write(fd, message.encode())

        await asyncio.gather(read_pty(), write_pty())

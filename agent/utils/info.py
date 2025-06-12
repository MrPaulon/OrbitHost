import platform
import psutil
import asyncio

async def get_system_info():
    return {
        "os": platform.system(),
        "os_version": platform.version(),
        "architecture": platform.machine(),
        "processor": platform.processor(),
        "cpu_count": psutil.cpu_count(logical=True),
        "cpu_percent": psutil.cpu_percent(interval=1),
        "memory_total_gb": round(psutil.virtual_memory().total / (1024**3), 2),
        "memory_used_gb": round(psutil.virtual_memory().used / (1024**3), 2),
        "disk_total_gb": round(psutil.disk_usage("/").total / (1024**3), 2),
        "disk_used_gb": round(psutil.disk_usage("/").used / (1024**3), 2),
        "disk_percent": psutil.disk_usage("/").percent,
        "boot_time": psutil.boot_time()
    }
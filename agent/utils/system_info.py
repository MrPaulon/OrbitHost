# Import des packages
import platform
import psutil
import socket
import uptime


# Fonction de récupération des informations
def collect_system_info():
    return {
        "hostname": socket.gethostname(),
        "os": platform.system(),
        "os_version": platform.version(),
        "cpu_usage": psutil.cpu_percent(),
        "ram_total": psutil.virtual_memory().total,
        "ram_used": psutil.virtual_memory().used,
        "uptime": int(uptime.uptime())
    }
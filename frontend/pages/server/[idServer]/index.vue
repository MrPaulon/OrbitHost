<template>
    <div class="serverpage dark">
      <div class="content">
        <h1>Console</h1>
        <div class="header">
          <h1>VPS Paul</h1>
          <UBadge style="margin-left: 10px;" color="success" variant="subtle">En ligne</UBadge>
          <div class="buttons">
            <UButton style="color: var(--color-text);" variant="solid" color="primary" @click="sendCommand('start')">Start</UButton>
            <UButton variant="solid" color="warning" @click="sendCommand('restart')">Restart</UButton>
            <UButton style="color: var(--color-text);" variant="solid" color="error" @click="sendCommand('stop')">Stop</UButton>
          </div>
        </div>
  
        <div class="webconsole">
          <pre class="output">{{ consoleOutput }}</pre>
          <div class="input-container">
            <UInput icon="solar:sidebar-code-bold-duotone" size="xl" class="cmd" v-model="inputCommand" @keyup.enter="sendCommand" placeholder="Entrer une commande..." />
          </div>
        </div>

        <div class="infos">
          <div class="srvinfos">
            
          </div>
          <div class="srvcapacity">

          </div>
          <div class="srvstatus">

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import "~/assets/css/server/index.scss"
  import { useRoute } from 'vue-router'
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  
  definePageMeta({
    layout: 'server'
  })
  
  const route = useRoute()
  const idServer = route.params.idServer as string
  
  const inputCommand = ref('')
  const consoleOutput = ref('')
  
  // WebSocket
  let socket: WebSocket
  
  const connectWebSocket = () => {
    socket = new WebSocket(`wss://your-api-url.com/servers/${idServer}/console`)
  
    socket.onmessage = (event) => {
      consoleOutput.value += `\n${event.data}`
    }
  
    socket.onclose = () => {
      consoleOutput.value += '\n[Déconnecté du serveur]'
    }
  
    socket.onerror = () => {
      consoleOutput.value += '\n[Erreur de connexion]'
    }
  }
  
  const sendCommand = (cmd?: string) => {
    const command = cmd ?? inputCommand.value
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(command)
      inputCommand.value = ''
    } else {
      consoleOutput.value += `\n[Erreur] Impossible d'envoyer : ${command}`
    }
  }
  
  onMounted(connectWebSocket)
  onBeforeUnmount(() => {
    socket?.close()
  })
</script>
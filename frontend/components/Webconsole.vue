<template>
    <div ref="terminalContainer" class="terminal-container" />
</template>
  
<script setup lang="ts">
import { Style } from '#components'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Terminal } from 'xterm'
import '~/assets/css/components/webconsole.scss'

const terminalContainer = ref<HTMLDivElement | null>(null)
let terminal: Terminal
let socket: WebSocket
  
const initTerminal = () => {
    terminal = new Terminal()
  
    terminal.open(terminalContainer.value!)
    terminal.focus()
  
    terminal.onData(data => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(data)
      }
    })
}
  
const connectWebSocket = () => {
    socket = new WebSocket('ws://localhost:8765')
  
    socket.onopen = () => {
      terminal.write('\r\n[✅ Connecté au VPS]')
    }
  
    socket.onmessage = (event) => {
      terminal.write(event.data)
    }
  
    socket.onclose = () => {
      terminal.write('\r\n[⚠️ Déconnecté]')
    }
  
    socket.onerror = () => {
      terminal.write('\r\n[⛔️ Erreur WebSocket]')
    }
}
  
onMounted(() => {
    initTerminal()
    connectWebSocket()
})
  
onBeforeUnmount(() => {
    socket?.close()
    terminal?.dispose()
})
</script>
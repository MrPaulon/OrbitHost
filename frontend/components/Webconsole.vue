<template>
    <div ref="terminalContainer" class="terminal-container" />
</template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Terminal } from 'xterm'
import '~/assets/css/components/webconsole.scss'

const props = defineProps({
  idServer: String,
  ip: String,
  port: Number
})

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
  console.log(props.ip)
  console.log(props.port)
    socket = new WebSocket(`ws://${props.ip}:${props.port}`)
  
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
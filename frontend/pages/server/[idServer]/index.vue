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
        <ClientOnly>
          <WebConsole />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "~/assets/css/server/index.scss"
import { useRoute } from 'vue-router'
import { defineAsyncComponent } from 'vue'

definePageMeta({ layout: 'server' })

const route = useRoute()
const idServer = route.params.idServer as string

// Import dynamique du composant console pour éviter self/window error
const WebConsole = defineAsyncComponent(() => import('~/components/Webconsole.vue'))

// Envoi de commande via requête API ou WebSocket ?
const sendCommand = (cmd: string) => {
  const socket = new WebSocket('ws://localhost:8765')
  socket.onopen = () => {
    socket.send(cmd + '\n')
    socket.close()
  }
}
</script>
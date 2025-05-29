<template>
  <div class="serverpage dark">
    <div class="content">
      <h1>Console</h1>
      <div class="header">
        <h1>{{ server?.name || 'Serveur inconnu' }}</h1>
        <UBadge style="margin-left: 10px;" color="success" variant="subtle">En ligne</UBadge>
        <div class="buttons">
          <UButton style="color: var(--color-text);" variant="solid" color="primary">Start</UButton>
          <UButton variant="solid" color="warning">Restart</UButton>
          <UButton style="color: var(--color-text);" variant="solid" color="error">Stop</UButton>
        </div>
      </div>

      <div class="webconsole">
        <ClientOnly>
          <WebConsole
            v-if="server"
            :idServer="idServer"
            :ip="server.ip_address"
            :port="server.ssh_port"
          />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Désactivation Layout
definePageMeta({ layout: 'server' })
// Style
import "~/assets/css/server/index.scss"

// Importations des modules
import { useRoute } from 'vue-router'
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useToast } from '#imports'

// Variables
const route = useRoute()
const toast = useToast()

const idServer = route.params.idServer as string
const servers = ref<Server[]>([])
const server = ref<Server | null>(null)
const token = ref<string | null>(null)

interface Server {
  id: string
  name: string
  status: string
  ip_address: string
  ssh_port: number
}

onMounted(async () => {
  token.value = localStorage.getItem('token')
  if (!token.value) return

  try {
    const result = await $fetch<Server[]>('http://localhost:3001/api/servers/list', {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    servers.value = result
    server.value = servers.value.find(s => s.id == idServer) || null

    if (!server.value) {
      toast.add({
        title: 'Serveur introuvable',
        description: `Aucun serveur avec l’ID ${idServer} n’a été trouvé.`,
        color: 'warning'
      })
    }
  } catch (error) {
    toast.add({
      title: 'Erreur lors du chargement des serveurs',
      description: String(error),
      color: 'error'
    })
  }
})

const WebConsole = defineAsyncComponent(() => import('~/components/Webconsole.vue'))
</script>
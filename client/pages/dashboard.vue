<template>
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">{{ server.name }}</h1>
          <p class="text-gray-500">{{ server.ip }}</p>
        </div>
        <UBadge :color="server.status === 'online' ? 'green' : 'red'">
          {{ server.status }}
        </UBadge>
      </div>
  
      <!-- Server Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <UCard>
          <template #header>RAM</template>
          <p class="text-2xl font-semibold">{{ server.ram }} GB</p>
        </UCard>
  
        <UCard>
          <template #header>Stockage</template>
          <p class="text-2xl font-semibold">{{ server.storage }} GB</p>
        </UCard>
  
        <UCard>
          <template #header>OS</template>
          <p class="text-xl">{{ server.os }}</p>
        </UCard>
  
        <UCard>
          <template #header>Uptime</template>
          <p class="text-xl">{{ formattedUptime }}</p>
        </UCard>
  
        <UCard>
          <template #header>Dernier redémarrage</template>
          <p class="text-xl">{{ lastRestart }}</p>
        </UCard>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const server = {
    name: 'Serveur Principal',
    ip: '192.168.1.100',
    ram: 32, // en GB
    storage: 512, // en GB
    status: 'online', // ou 'offline'
    os: 'Ubuntu 22.04 LTS',
    uptime: 86400 * 5 + 3600 * 4, // en secondes
    lastRestartTimestamp: Date.now() - (86400 * 5 + 3600 * 4) * 1000, // timestamp
  }
  
  // Formatage du uptime en jours/heures/minutes
  const formattedUptime = computed(() => {
    const days = Math.floor(server.uptime / 86400)
    const hours = Math.floor((server.uptime % 86400) / 3600)
    const minutes = Math.floor((server.uptime % 3600) / 60)
    return `${days}j ${hours}h ${minutes}min`
  })
  
  // Formatage de la dernière date de reboot
  const lastRestart = computed(() => {
    const date = new Date(server.lastRestartTimestamp)
    return date.toLocaleString()
  })
  </script>
  
  <style scoped>
  </style>
<template>
    <div class="p-6 space-y-6 bg-gray-900 min-h-screen">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-white">{{ server.name }}</h1>
          <p class="text-gray-400">{{ server.ip }}</p>
        </div>
        <UBadge :color="server.status === 'online' ? 'green' : 'red'" size="lg">
          {{ server.status.toUpperCase() }}
        </UBadge>
      </div>

      <!-- Server Control Buttons -->
      <div class="space-x-4">
        <UButton color="primary" variant="solid">
          Start
        </UButton>
        <UButton color="warning" variant="solid">
          Restart
        </UButton>
        <UButton color="error" variant="solid">
          Stop
        </UButton>
      </div>
  
      <!-- Server Cards Grouped by Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  
        <!-- Infos Serveur -->
        <UCard class="bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
          <template #header>
            <span class="text-xl font-bold flex items-center gap-2">
              <Icon name="solar:monitor-outline" />
              Informations Serveur
            </span>
          </template>
          <div class="space-y-2">
            <p><span class="font-semibold">Nom :</span> {{ server.name }}</p>
            <p><span class="font-semibold">IP :</span> {{ server.ip }}</p>
            <p><span class="font-semibold">Type :</span> {{ server.type }}</p>
            <p><span class="font-semibold">OS :</span> {{ server.os }}</p>
          </div>
        </UCard>
  
        <!-- Performances -->
        <UCard class="bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
          <template #header>
            <span class="text-xl font-bold flex items-center gap-2">
              <Icon name="solar:graph-outline" />
              Performances
            </span>
          </template>
          <div class="space-y-2">
            <p><span class="font-semibold">RAM :</span> {{ server.ram }} GB</p>
            <p><span class="font-semibold">Stockage :</span> {{ server.storage }} GB</p>
            <p><span class="font-semibold">Utilisation CPU :</span> {{ server.cpuUsage }}%</p>
            <p><span class="font-semibold">Utilisation RAM :</span> {{ server.ramUsage }}%</p>
          </div>
        </UCard>
  
        <!-- Réseau -->
        <UCard class="bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
          <template #header>
            <span class="text-xl font-bold flex items-center gap-2">
              <Icon name="solar:wi-fi-router-bold" />
              Réseau
            </span>
          </template>
          <div class="space-y-2">
            <p><span class="font-semibold">MAC :</span> {{ server.macAddress }}</p>
            <p><span class="font-semibold">Download :</span> {{ server.network.download }} Mbps</p>
            <p><span class="font-semibold">Upload :</span> {{ server.network.upload }} Mbps</p>
          </div>
        </UCard>
  
        <!-- État du Serveur -->
        <UCard class="bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
          <template #header>
            <span class="text-xl font-bold flex items-center gap-2">
              <Icon name="solar:settings-outline" />
              État du Serveur
            </span>
          </template>
          <div class="space-y-2">
            <p><span class="font-semibold">Uptime :</span> {{ formattedUptime }}</p>
            <p><span class="font-semibold">Dernier redémarrage :</span> {{ lastRestart }}</p>
            <p>
              <span class="font-semibold">Status :</span>
              <UBadge :color="server.status === 'online' ? 'green' : 'red'" variant="solid" size="sm">
                {{ server.status }}
              </UBadge>
            </p>
          </div>
        </UCard>
  
        <!-- Localisation -->
        <UCard class="bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
          <template #header>
            <span class="text-xl font-bold flex items-center gap-2">
              <Icon name="solar:map-point-outline" />
              Localisation
            </span>
          </template>
          <div class="space-y-2">
            <p><span class="font-semibold">Datacenter :</span> {{ server.location }}</p>
          </div>
        </UCard>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { Icon } from '#components'
  
  const server = {
    name: 'Serveur Principal',
    ip: '192.168.1.100',
    ram: 32, // en GB
    storage: 512, // en GB
    status: 'online', // 'online' ou 'offline'
    os: 'Ubuntu 22.04 LTS',
    uptime: 86400 * 5 + 3600 * 4, // en secondes
    lastRestartTimestamp: Date.now() - (86400 * 5 + 3600 * 4) * 1000,
    cpuUsage: 42, // %
    ramUsage: 68, // %
    macAddress: '00:1A:2B:3C:4D:5E',
    network: {
      download: 950, // en Mbps
      upload: 500, // en Mbps
    },
    type: 'VPS',
    location: 'Paris, France',
  }
  
  // Format uptime
  const formattedUptime = computed(() => {
    const days = Math.floor(server.uptime / 86400)
    const hours = Math.floor((server.uptime % 86400) / 3600)
    const minutes = Math.floor((server.uptime % 3600) / 60)
    return `${days}j ${hours}h ${minutes}min`
  })
  
  // Format last reboot
  const lastRestart = computed(() => {
    const date = new Date(server.lastRestartTimestamp)
    return date.toLocaleString()
  })
  </script>
  
  <style scoped>
  </style>
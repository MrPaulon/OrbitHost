<script lang="ts">
import '~/assets/css/dashboard.scss'
</script>
<template>
    <div class="dashboard p-6 space-y-6 min-h-screen">
      <!-- Header and Server Control Buttons Card -->
      <UCard class="w-full bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 class="title text-3xl font-bold text-white flex items-center gap-2">
              {{ server.name }}
              <span v-if="server.status === 'online'" class="w-3 h-3 rounded-full bg-green-500"></span>
            </h1>
            <p class="text-gray-400">{{ server.ip }}</p>
          </div>
          <div class="space-x-4">
            <UButton color="primary" variant="soft">
              Start
            </UButton>
            <UButton color="warning" variant="soft">
              Restart
            </UButton>
            <UButton color="error" variant="soft">
              Stop
            </UButton>
          </div>
        </div>
      </UCard>
  
      <!-- Server Cards Grouped by Category -->
      <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6">
  
        <!-- Infos Serveur -->
        <UCard class="h-auto bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
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
  
        <!-- RAM & Stockage Card (Combined) -->
        <UCard class="h-auto bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
          <template #header>
            <span class="text-xl font-bold flex items-center gap-2">
              <Icon name="solar:cpu-outline" />
              Capacités
            </span>
          </template>
          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between font-semibold">
                <p>RAM :</p>
                <p class="text-sm text-gray-300">{{ server.ramUsage }}% / {{ server.ram }} GB</p>
              </div>
              <div class="w-full bg-white/10 rounded-[10px] h-4">
                <div class="bg-indigo-500 h-4 rounded-[10px]" :style="{ width: server.ramUsage + '%' }"></div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between font-semibold">
                <p>Stockage :</p>
                <p class="text-sm text-gray-300">{{ server.storageUsage }}% / {{ server.storage }} GB</p>
              </div>
              <div class="w-full bg-white/10 rounded-[10px] h-4">
                <div class="bg-indigo-500 h-4 rounded-[10px]" :style="{ width: server.storageUsage + '%' }"></div>
              </div>
            </div>
          </div>
        </UCard>
  
  
        <!-- Réseau -->
        <UCard class="h-auto bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
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
        <UCard class="h-auto bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
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
              <UBadge color="success" variant="soft" style="margin-left: 5px;">En ligne</UBadge>
            </p>
          </div>
        </UCard>
  
        <!-- Localisation -->
        <UCard class="h-auto bg-white/5 backdrop-blur-lg border border-white/10 text-white shadow-md focus:outline-none">
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
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { Icon } from '#components'
import { Chart, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, DoughnutController } from 'chart.js'

// Register required components including DoughnutController
Chart.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, DoughnutController)

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
  storageUsage: 55, // %
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
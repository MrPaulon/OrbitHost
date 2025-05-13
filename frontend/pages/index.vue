<template>
  <div class="index dark">

    <!--Card buttons -->
    <section class="buttons flex justify-center gap-4 my-20">
      <div class="box">
        <UButton class="button" size="lg" :color="filter === 'mine' ? 'primary' : 'gray'" @click="filter = 'mine'" variant="solid">Mes serveurs <UBadge color="primary" variant="soft">{{ mineCount }}</UBadge></UButton>
        <UButton class="button" size="lg" :color="filter === 'others' ? 'primary' : 'gray'" @click="filter = 'others'" variant="solid">Autres serveurs <UBadge color="primary" variant="soft">{{ othersCount }}</UBadge></UButton>
        <UButton class="button" size="lg" :color="filter === 'all' ? 'primary' : 'gray'" @click="filter = 'all'" variant="solid">Tous les serveurs <UBadge color="primary" variant="soft">{{ allCount }}</UBadge></UButton>
      </div>
    </section>

    <!-- Liste des serveurs -->
    <section class="servers max-w-6xl mx-auto p-4 grid gap-4 grid-cols-1" style="border: 1px solid var(--color-border);">
      <div class="header flex items-center justify-between mb-6 gap-4 flex-wrap">
        <UInput
          v-model="searchQuery"
          placeholder="Rechercher un serveur..."
          icon="i-heroicons-magnifying-glass"
          size="lg"
          class="w-full sm:w-auto flex-1"
        />
        <UButton class="button" icon="solar:filter-bold-duotone" color="primary" variant="subtle">
          Filtres
        </UButton>
      </div>

      <UCard
        v-for="server in filteredServers"
        :key="server.id"
        class="servercard hover:shadow-lg transition"
      >
        
        <template #default>
          <div class="infos">
            <div class="status"></div>
            <UIcon name="solar:server-square-cloud-bold" class="size-8" />
            <h2 class="title text-lg font-semibold">{{ server.name }}</h2>
            <div class="center">
              <p>IP: {{ server.ip_address }}</p>
              <p>Utilisateur: {{ server.username }}</p>
              <p>Port SSH: {{ server.ssh_port }}</p>
            </div>
          </div>
          <div class="buttons">
            <UButton icon="solar:box-bold-duotone" size="lg" color="primary" variant="solid"></UButton>
          </div>
        </template>
      </UCard>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import "~/assets/css/index.scss"

const filter = ref('mine')
const servers = ref([])
const userId = ref(null)
const searchQuery = ref('')

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  // Décoder le token pour récupérer l'ID utilisateur
  const payload = JSON.parse(atob(token.split('.')[1]))
  userId.value = payload.userId

  const result = await $fetch('http://localhost:3001/api/servers/list', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  servers.value = result
})

const filteredServers = computed(() => {
  const base = filter.value === 'mine'
    ? servers.value.filter(s => s.user_id === userId.value)
    : filter.value === 'others'
      ? servers.value.filter(s => s.user_id !== userId.value)
      : servers.value

  return base.filter(s =>
    s.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    s.ip_address.includes(searchQuery.value)
  )
})

const mineCount = computed(() => servers.value.filter(server => server.user_id === userId.value).length)
const othersCount = computed(() => servers.value.filter(server => server.user_id !== userId.value).length)
const allCount = computed(() => servers.value.length)
</script>
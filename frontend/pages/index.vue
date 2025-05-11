<template>
  <div class="index dark">
    <!-- Navigation -->
    <nav class="flex justify-between items-center p-4 bg-surface border-b border-border">
      <h1 class="text-xl font-bold">Serverly</h1>
      <UButton icon="solar:user-bold" label="Mon compte" color="primary" variant="soft" />
    </nav>

    <!-- View mode buttons -->
    <section class="buttons flex justify-center gap-4 my-20">
      <div class="box">
        <UButton class="button" size="lg" :color="filter === 'mine' ? 'primary' : 'gray'" @click="filter = 'mine'" variant="solid">Mes serveurs <UBadge color="primary" variant="soft">1</UBadge></UButton>
        <UButton class="button" size="lg" :color="filter === 'others' ? 'primary' : 'gray'" @click="filter = 'others'" variant="solid">Autres serveurs <UBadge color="primary" variant="soft">0</UBadge></UButton>
        <UButton class="button" size="lg" :color="filter === 'all' ? 'primary' : 'gray'" @click="filter = 'all'" variant="solid">Tous les serveurs <UBadge color="primary" variant="soft">1</UBadge></UButton>
      </div>
    </section>

    <!-- Liste des serveurs -->
    <section class="servers max-w-5xl mx-auto p-4 grid gap-4 grid-cols-1">
      <UCard
        v-for="server in filteredServers"
        :key="server.id"
        class="servercard hover:shadow-lg transition"
      >
        
        <template #default>
          <div class="infos">
            <UIcon :class="status" name="solar:heart-angle-bold" class="size-8" />
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
import "../assets/css/index.scss"

const filter = ref('mine')
const servers = ref([])
const userId = ref(null)

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
  if (filter.value === 'mine') {
    return servers.value.filter(server => server.user_id === userId.value)
  }
  if (filter.value === 'others') {
    return servers.value.filter(server => server.user_id !== userId.value)
  }
  return servers.value
})
</script>
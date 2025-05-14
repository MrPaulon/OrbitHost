<template>
  <div class="serverspage">
    <div class="content">
      <h1>Liste des serveurs</h1>
      <div class="card">
        <div class="header">
          <UInput class="searchbar" v-model="searchQuery" placeholder="Rechercher un serveur..." icon="i-heroicons-magnifying-glass" />
          <UButton icon="solar:cloud-upload-bold-duotone" class="bouton" size="md" color="primary" :to="'/admin/servers/create'">Créer un serveur</UButton>
        </div>
        <div class="table">
          <div class="tablecontent">
            <div v-for="server in paginatedServers" :key="server.id" class="server">
              <p>Id: {{ server.id }}</p>
              <p>Utilisateur: {{ server.user_id || '—' }}</p>
              <p>Nom: {{ server.name }}</p>
              <p>Ip: {{ server.ip_address }}</p>
              <p>Type: {{ server.os_type || 'VPS' }}</p>
              <div class="serverbtn">
                <UButton icon="solar:eye-bold-duotone" color="primary" variant="solid" :to="`/admin/servers/${server.id}`" />
                <UButton icon="solar:trash-bin-minimalistic-bold-duotone" color="error" variant="solid" @click="() => deleteServer(server.id)" />
              </div>
            </div>
          </div>
          <div class="pagination flex gap-4 mt-4">
            <UButton icon="solar:alt-arrow-left-bold" :disabled="page === 1" @click="page--"></UButton>
            <UButton icon="solar:alt-arrow-right-bold" :disabled="page === pageCount" @click="page++"></UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

import "~/assets/css/admin/servers/index.scss";

const servers = ref([])

const searchQuery = ref('')

const page = ref(1)
const itemsPerPage = 4

const paginatedServers = computed(() => {
  const start = (page.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredServers.value.slice(start, end)
})

const pageCount = computed(() =>
  Math.ceil(filteredServers.value.length / itemsPerPage)
)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const result = await $fetch('http://localhost:3001/api/servers/listall', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    servers.value = result
  } catch (error) {
    console.error('Erreur lors du chargement des serveurs :', error)
  }
})

const filteredServers = computed(() => {
  if (!searchQuery.value) return servers.value
  const query = searchQuery.value.toLowerCase()
  return servers.value.filter(server =>
    server.name?.toLowerCase().includes(query) ||
    server.ip_address?.toLowerCase().includes(query) ||
    server.username?.toLowerCase().includes(query)
  )
})

function deleteServer(id: number) {
  console.log('Supprimer serveur', id)
  // Implement real delete logic here
}
</script>
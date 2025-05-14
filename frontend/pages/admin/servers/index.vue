<template>
  <div class="serverspage">
    <div class="content">
      <h1>Liste des serveurs</h1>
      <ListTable
        title="la liste des serveurs"
        :data="servers"
        item-type="servers"
        :fields="['id', 'user_id', 'name', 'ip_address', 'status']"
        @delete="deleteServer"
      />
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
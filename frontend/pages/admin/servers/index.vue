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
        icon="solar:server-square-cloud-bold-duotone"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
// Layout admin
definePageMeta({
  layout: 'admin'
})

// Style
import "~/assets/css/admin/basic.scss";


// Variables
const servers = ref([])


// Récupération de la liste de tous les serveurs
onMounted(async () => {
  // Récupération du token
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


function deleteServer(id: number) {
  console.log('Supprimer serveur', id)
  // Logique suppresion d'un serveur
}
</script>
<template>
    <div class="serverspage">
      <div class="content">
        <h1>Liste des nodes</h1>
        <ListTable
          title="la liste des nodes"
          :data="nodes"
          item-type="nodes"
          :fields="['id', 'name', 'fqdn', 'ip_address', 'location_id']"
          @delete="deleteNodes"
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
import "~/assets/css/admin/basic.scss"

// Variables
const nodes = ref([])


// Récupération de la liste de tous les nodes
onMounted(async () => {
  // Récupération du token
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const result = await $fetch('http://localhost:3001/api/nodes/list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    nodes.value = result
  } catch (error) {
    console.error('Erreur lors du chargement des nodes :', error)
  }
})


async function deleteNodes(nodeId: number) {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    await $fetch(`http://localhost:3001/api/nodes/delete/${nodeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Mets à jour la liste après suppression
    nodes.value = nodes.value.filter(n => n.id !== nodeId)

  } catch (error) {
    console.error('Erreur lors de la suppression de la node :', error)
  }
}
</script>
<template>
  <div class="serverspage">
    <div class="content">
      <h1>Liste des emplacements</h1>
      <ListTable
        title="la liste des emplacements"
        :data="locations"
        item-type="locations"
        :fields="['id', 'name']"
        @delete="deleteLocations"
        icon="solar:map-point-bold-duotone"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Layout admin
definePageMeta({
layout: 'admin'
})

// Import Style
import '~/assets/css/admin/basic.scss';

// Variables
const locations = ref([])


// Récupération de la liste de tous les locations
onMounted(async () => {
  // Récupération du token
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const result = await $fetch('http://localhost:3001/api/locations/list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    locations.value = result
  } catch (error) {
    console.error('Erreur lors du chargement des emplacements :', error)
  }
})

async function deleteLocations(locationID: number) {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    await $fetch(`http://localhost:3001/api/locations/delete/${locationID}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // Mets à jour la liste après suppression
    locations.value = locations.value.filter(s => s.id !== locationID)

  } catch (error) {
    console.error('Erreur lors de la suppression de emplacement :', error)
  }
}
</script>
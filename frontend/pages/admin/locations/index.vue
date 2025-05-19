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
        icon="solar:server-square-cloud-bold-duotone"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/assets/css/admin/basic.scss";
</style>

<script setup lang="ts">
// Layout admin
definePageMeta({
layout: 'admin'
})


// Variables
const locations = ref([])


// Récupération de la liste de tous les locations
onMounted(async () => {
// Récupération du token
const token = localStorage.getItem('token')
if (!token) return
})


function deleteLocations(id: number) {
console.log('Supprimer emplacement', id)
// Logique suppresion d'une node
}
</script>
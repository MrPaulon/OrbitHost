<template>
    <div class="serverspage">
      <div class="content">
        <h1>Liste des base de données</h1>
        <ListTable
          title="la liste des base de données"
          :data="databases"
          item-type="databases"
          :fields="['id', 'name']"
          @delete="deleteDatabase"
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
const databases = ref([])


// Récupération de la liste de tous les base de données
onMounted(async () => {
// Récupération du token
const token = localStorage.getItem('token')
if (!token) return
})


function deleteDatabase(id: number) {
console.log('Supprimer emplacement', id)
// Logique suppresion d'une base de donnée
}
</script>
<template>
    <div class="serverspage">
      <div class="content">
        <h1>Liste des nodes</h1>
        <ListTable
          title="la liste des nodes"
          :data="nodes"
          item-type="nodes"
          :fields="['id', 'name']"
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
})


function deleteNodes(id: number) {
console.log('Supprimer Nodes', id)
// Logique suppresion d'une node
}
</script>
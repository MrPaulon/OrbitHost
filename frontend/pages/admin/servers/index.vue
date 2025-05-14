<script setup lang="ts">

const data = ref([
  {
    id: '',
    user_id: '',
    name: '',
    ip_address: ''
  },
])

definePageMeta({
  layout: 'admin'
})

import "~/assets/css/admin/servers/index.scss";


const globalFilter = ref('')

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const response = await $fetch('http://localhost:3001/api/servers/listall', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    data.value = response
  } catch (error) {
    console.error('Erreur lors du chargement des serveurs :', error)
  }
})
</script>
<template>
  <div class="serverspage">
    <div class="content">
      <h1>Liste des serveurs</h1>
      <div class="card">
        <div class="header">
          <UInput class="searchbar" v-model="globalFilter"  placeholder="Recherche" />
          <UButton icon="solar:cloud-upload-bold-duotone" class="bouton" size="md" color="primary" :to="'/admin/servers/create'">Créer un serveur</UButton>
        </div>
        <UTable class="table flex-1" v-model:global-filter="globalFilter" :data="data" />
      </div>
    </div>
  </div>
</template>
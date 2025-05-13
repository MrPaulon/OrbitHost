<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})

import "~/assets/css/admin/servers/index.scss";

const data = ref([
  {
    id: '4',
    email: 'paul@serverly.fr',
    pseudo: 'mrpaulon',
    admin: 'true'
  },
])

const globalFilter = ref('')
</script>
<template>
  <div class="serverspage">
    <div class="content">
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
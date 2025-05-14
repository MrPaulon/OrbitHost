<template>
    <div class="serverspage">
      <div class="content">
        <h1>Liste des utilisateurs</h1>
        <ListTable
          title="la liste des utilisateurs"
          :data="users"
          item-type="users"
          :fields="['id', 'email', 'pseudo', 'is_admin']"
          @delete="deleteUser"
        />
      </div>
    </div>
  </template>
  <script setup lang="ts">
  definePageMeta({
    layout: 'admin'
  })
  import "~/assets/css/admin/basic.scss";
  
  const users = ref([])
  
  onMounted(async () => {
    const token = localStorage.getItem('token')
    if (!token) return
  
    try {
      const result = await $fetch('http://localhost:3001/api/users/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      users.value = result
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs :', error)
    }
  })
  
  
  function deleteUser(id: number) {
    console.log('Supprimer serveur', id)
    // Implement real delete logic here
  }
  </script>
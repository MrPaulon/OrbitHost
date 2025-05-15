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
        icon="lets-icons:user-box-duotone"
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
const toast = useToast()
const users = ref([])

// Récupération liste des serveurs
onMounted(async () => {
  // Récupération du token
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    // Connexion api pour liste des serveurs
    const result = await $fetch('http://localhost:3001/api/users/list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    users.value = result
  } catch (error) {
    // Gestion si erreur api
    toast.add({
    title: 'Erreur lors du chargement des utilisateurs :',
    description: `${error}`,
    color: 'error'
    })
  }
})

  
function deleteUser(id: number) {
  console.log('Supprimer serveur', id)
  // Logique pour supprimer un serveur
}
</script>
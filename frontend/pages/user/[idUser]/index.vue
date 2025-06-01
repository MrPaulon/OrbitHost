<template>
	<div class="userpage dark">
		<div class="content">
			<div class="flex justify-center py-10 px-4">
			    <UCard class="w-full max-w-2xl">
			      <template #header>
			        <div class="flex items-center gap-4">
			          <UAvatar
			            size="xl"
			            src="https://i.pravatar.cc/150?u={{ idUser }}"
			            alt="Avatar"
			          />
			          <div>
			            <h2 class="text-xl font-bold">Utilisateur #{{ idUser }}</h2>
			            <p class="text-sm text-gray-500 dark:text-gray-400">Profil public</p>
			          </div>
			        </div>
			      </template>

			      <div class="space-y-4">
			        <UInput v-model="username" label="Nom d'utilisateur" />
			        <UInput v-model="email" label="Email" type="email" />
			        <UTextarea v-model="bio" label="Bio" />
			      </div>

			      <template #footer>
			        <div class="flex justify-end">
			          <UButton @click="updateProfile" icon="i-heroicons-check-circle" color="primary">
			            Sauvegarder
			          </UButton>
			        </div>
			      </template>
			    </UCard>
			  </div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Style (optionnel)
import "~/assets/css/user/index.scss"

import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const idUser = route.params.idUser as string

// Données utilisateur simulées (à remplacer par API plus tard)
const username = ref(`user_${idUser}`)
const email = ref(`user${idUser}@example.com`)
const bio = ref('Je suis un utilisateur passionné par Nuxt.')

const updateProfile = () => {
  console.log('Profil mis à jour :', {
    idUser,
    username: username.value,
    email: email.value,
    bio: bio.value
  })
}
</script>
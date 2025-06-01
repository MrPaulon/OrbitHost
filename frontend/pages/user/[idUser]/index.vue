<template>
	<div class="userpage dark">
		<div class="content">

			<h1>Votre profil</h1>

			<div class="card">

				<UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">

					<div class="line">
						<h3>Pseudo</h3>
						<UInput size="lg" v-model="pseudo" icon="solar:user-hand-up-bold" placeholder="Pseudo" class="w-full" required/>
					</div>

					<div class="line">
						<h3>Adresse email</h3>
						<UInput size="lg" v-model="email" icon="i-lucide-at-sign" placeholder="Adresse email" class="w-full" required/>
					</div>

					<div class="line">
						<h3>Mot de passe</h3>
						<UInput type="password" size="lg" v-model="password" icon="solar:lock-password-bold-duotone" placeholder="Mot de passe" class="w-full" required=""/>
					</div>

					<div class="line">
						<UButton icon="solar:check-square-bold-duotone" type="submit" size="lg" color="primary" class="w-full">
							Enregistrer
						</UButton>
					</div>

					
				</UForm>

			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
// Style
import "~/assets/css/user/index.scss"

// Modules
import { ref } from 'vue'
import { useRoute } from 'vue-router'


// Variables
const route = useRoute()
const idUser = route.params.idUser as string

// Form variables
const pseudo = ref('')
const email = ref('')
const password = ref('')

const schema = {
	pseudo: {
		type: 'string',
		require: true
	},
	email: {
		type: 'string',
		required: true,
	},
	password: {
		type: 'string',
		required: true,
	},
}

const state = ref({
	pseudo: '',
	email: '',
	password: ''
})

const onSubmit = (data: any) => {
	console.log(data)
}

</script>
<template>
	<div class="userpage dark">
		<div class="content">

			<h1>Votre profil</h1>

			<div class="card">

				<UTabs :items="items" class="w-full">

					<template #account="{ item }">
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
					</template>

					<template #2fa="{ item }">
						<div class="line">
							<img src="https://cdn.qrcode-ai.com/template/preview/f54c61b0f1b6607c25bc3500f4e5bd39-1719680140773.png" alt="" style="width: 300px; border-radius: 20px;">
						</div>
						<div class="line">
							<h3>2FA</h3>
							<UInput size="lg" v-model="twoFactor" icon="solar:shield-bold-duotone" placeholder="2FA" class="w-full" required/>
						</div>
						<div class="line">
							<UButton icon="solar:shield-plus-bold-duotone" type="submit" size="lg" color="primary" class="w-full">
								Activer 2FA
							</UButton>
						</div>
					</template>

					<template #api="{ item }">
						<div class="line">
							<h3>API</h3>
							<UInput size="lg" v-model="api" icon="solar:cloud-plus-bold-duotone" placeholder="2FA" class="w-full" required/>
						</div>
						<div class="line">
							<UButton icon="solar:cloud-plus-bold" type="submit" size="lg" color="primary" class="w-full">
								Créer une clé API
							</UButton>
						</div>
					</template>
					
				</UTabs>

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
import type { TabsItem } from '@nuxt/ui'


// Variables
const route = useRoute()
const idUser = route.params.idUser as string

// Tabs
const items = [
  {
    label: 'Profil',
    icon: 'lets-icons:user-box-duotone',
    slot: 'account' as const
  },
  {
    label: '2FA',
    icon: 'solar:shield-bold-duotone',
    slot: '2fa' as const
  },
  {
	label: 'API',
	icon: 'solar:delivery-bold-duotone',
	slot: 'api' as const
  },
  {
	label: 'Préférences',
	icon: 'solar:pallete-2-bold-duotone',
	slot: 'preferences' as const
  }
] satisfies TabsItem[]

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


// 2FA

const twoFactor = ref('')

const onSubmit = (data: any) => {
	console.log(data)
}

</script>
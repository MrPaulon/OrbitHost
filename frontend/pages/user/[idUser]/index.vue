<template>
	<div class="userpage dark">
		<div class="content">
			<h1>Votre profil</h1>
			<div class="card">
				<UTabs :items="items" class="w-full">
					
					<!--Section compte-->
					<template #account="{ item }">
						<UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">

						<div class="line">
							<h3>Pseudo</h3>
							<UInput type="text" size="lg" v-model="state.pseudo" icon="solar:user-hand-up-bold" placeholder="Pseudo" class="w-full" required/>
						</div>

						<div class="line">
							<h3>Adresse email</h3>
							<UInput type="text" size="lg" v-model="state.email" icon="i-lucide-at-sign" placeholder="Adresse email" class="w-full" required/>
						</div>

						<div class="line">
							<h3>Mot de passe</h3>
							<UInput type="password" size="lg" v-model="state.password" icon="solar:lock-password-bold-duotone" placeholder="Mot de passe" class="w-full" required=""/>
						</div>

						<div class="line">
							<UButton icon="solar:check-square-bold-duotone" type="submit" size="lg" color="primary" class="w-full">
								Enregistrer
							</UButton>
						</div>


						</UForm>
					</template>

					<!--Section 2FA-->
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

					<!--Section API-->
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
import { ref, onMounted } from 'vue'
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

// User
const userInfos = ref([])


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


// Récupération des infos de l'utilisateur
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const result = await $fetch(`http://localhost:3001/api/users/infos?userTarget=${idUser}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    userInfos.value = result[0];

	state.value.pseudo = userInfos.value.pseudo
	state.value.email = userInfos.value.email

  } catch (error) {
    console.error("Erreur lors du chargement des informations de l'utilisateur :", error);
  }
});


// 2FA

const twoFactor = ref('')

const onSubmit = (data: any) => {
	console.log(data)
}

</script>
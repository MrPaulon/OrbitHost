<template>
	<div class="userpage dark">
		<div class="content">
			<h1>{{ indexTexts.title }}</h1>
			<div class="card">
				<UTabs v-if="indexTexts.tabs" :items="items" class="w-full">
					
					<!--Section compte-->
					<template v-if="indexTexts.account" #account="{ item }">
						<UForm :schema="schema" :state="state" @submit="onSubmit" class="space-y-4">

						<div class="line">
							<h3>{{ indexTexts.account.pseudo }}</h3>
							<UInput type="text" size="lg" v-model="state.pseudo" icon="solar:user-hand-up-bold" :placeholder="indexTexts.account.pseudo" class="w-full" required/>
						</div>

						<div class="line">
							<h3>{{ indexTexts.account.email }}</h3>
							<UInput type="text" size="lg" v-model="state.email" icon="i-lucide-at-sign" :placeholder="indexTexts.account.email" class="w-full" required/>
						</div>

						<div class="line">
							<h3>{{ indexTexts.account.password }}</h3>
							<UInput type="password" size="lg" v-model="state.password" icon="solar:lock-password-bold-duotone" :placeholder="indexTexts.account.password" class="w-full"/>
						</div>

						<div class="line">
							<UButton icon="solar:check-square-bold-duotone" type="submit" size="lg" color="primary" class="w-full">
								{{ indexTexts.account.save }}
							</UButton>
						</div>

						</UForm>
					</template>

					<!--Section 2FA-->
					<template #twofa="{ item }">
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

// Importation des modules
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { TabsItem } from '@nuxt/ui'
import { getLang } from '~/utils/lang.ts'
import * as yup from 'yup'

// Notification
const toast = useToast()

// Chargement de la langue et des textes
const lang = (await getLang())
const indexTexts = ref({})

// Récupération de l'ID utilisateur depuis l'URL
const route = useRoute()
const idUser = route.params.idUser as string

// Définition des onglets
const items = computed(() => [
  {
    label: indexTexts.value?.tabs?.account,
    icon: 'lets-icons:user-box-duotone',
    slot: 'account' as const
  },
  {
    label: indexTexts.value?.tabs?.twofa,
    icon: 'solar:shield-bold-duotone',
    slot: 'twofa' as const
  },
  {
    label: indexTexts.value?.tabs?.api,
    icon: 'solar:delivery-bold-duotone',
    slot: 'api' as const
  },
  {
    label: indexTexts.value?.tabs?.custom,
    icon: 'solar:pallete-2-bold-duotone',
    slot: 'preferences' as const
  }
]) satisfies TabsItem[]

// Déclaration des états utilisateur
const userInfos = ref([])

// Schéma de validation du formulaire
const schema = yup.object({
  pseudo: yup.string().required('Le pseudo est requis'),
  email: yup.string().email('Email invalide').required('L\'email est requis'),
  password: yup.string().optional()
})

const state = ref({
	pseudo: '',
	email: '',
	password: ''
})

// Chargement des données utilisateur au montage
onMounted(async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  indexTexts.value = await import(`@/assets/texts/${lang}/pages/user/index.json`)

  try {
    const result = await $fetch(`http://localhost:3001/api/users/infos?userTarget=${idUser}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    userInfos.value = result[0];

	// Remplissage des champs du formulaire
	state.value.pseudo = userInfos.value.pseudo
	state.value.email = userInfos.value.email

  } catch (error) {
    console.error("Erreur lors du chargement des informations de l'utilisateur :", error);
  }
});

// Données pour l'authentification à deux facteurs
const twoFactor = ref('')

// Fonction de soumission du formulaire
const onSubmit = async (data: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token manquant');
    return;
  }
  
  data = data.data

  // Construction du payload de mise à jour
  const updatePayload: any = {
    userTarget: idUser,
    pseudo: data.pseudo,
    email: data.email
  };
  if (data.password?.trim()) {
    updatePayload.password = data.password;
  }

  console.log(updatePayload)

  try {
    const response = await $fetch('http://localhost:3001/api/users/update', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: updatePayload
    });

    console.log('Mise à jour réussie :', response);
    toast.add({
      title: indexTexts.value.toast.success.title,
      description: indexTexts.value.toast.success.description,
      color: 'success'
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour du compte :', error);
	toast.add({
      title: indexTexts.value.toast.error.title,
      description: indexTexts.value.toast.error.description,
      color: 'error'
    })
  }
}

</script>
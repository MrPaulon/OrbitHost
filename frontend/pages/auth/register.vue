<template>
    <div class="register dark">
        <UForm :schema="schema" :state="state" @submit="onSubmit" @submit-invalid="onInvalid">
            <UCard variant="solid" class="container" style="height: 530px;">
                <template #header>
                    <h1 class="text-center title">Bienvenue</h1>
                    <p class="text">Créez un compte pour accéder à nos services</p>
                </template>
                <div class="content">
                    <UFormField label="Champs nécéssaire:" required>
                        <UInput v-model="state.email" icon="i-lucide-at-sign" class="input" size="xl" type="email" color="neutral" variant="soft" placeholder="Adresse mail" />
                        <UInput v-model="state.pseudo" icon="solar:user-hand-up-bold" class="input" size="xl" type="text" color="neutral" variant="soft" placeholder="Pseudo" />
                        <UInput v-model="state.password" icon="solar:lock-password-bold" class="input" size="xl" type="password" color="neutral" variant="soft" placeholder="Mot de passe" />
                    </UFormField>
                </div>
                <div class="footer">
                    <p class="text">En créant un compte vous acceptez nos conditions d'utilisations</p>
                    <div class="buttons">
                        <UButton 
                            type="submit"
                            icon="material-symbols:rocket-launch-rounded"
                            color="primary"
                            size="lg"
                            variant="solid"
                            label="Créer le compte"
                        />
                        <div class="divider"></div>
                        <UButton
                            disabled
                            label="Continuer avec Discord"
                            icon="i-simple-icons-discord"
                            color="primary"
                            size="lg"
                            variant="soft"
                        />
                    </div>
                </div>
            </UCard>
        </UForm>
    </div>
</template>

<script setup lang="ts">
// Désactivation du layout
definePageMeta({
  layout: false
})

// Style
import '~/assets/css/auth.scss'

// Importation modules
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'


// Variables
const toast = useToast()

const schema = object({
    email: string().email('Invalid email').required('Required'),
    pseudo: string().required('Required'),
    password: string().required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive<Schema>({
  email: '',
  pseudo: '',
  password: ''
})


// Fonction vérification des informations saisies
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data);
    if (event.data.email != null && event.data.password != null && event.data.pseudo != null) {
        if (event.data.password.length > 8) {
            registerUser(event.data)
            console.log("success")
        } else {
            toast.add({
                title: 'Erreur',
                description: 'Votre mot de passe doit contenir plus de 8 caratères',
                color: 'error'
            })
        }
    } else {
        toast.add({
            title: 'Erreur',
            description: 'Veuillez remplir tous les champs pour créer votre compte',
            color: 'error'
        })
    }
}

// Fonction enregistrement utilisateur dans la bdd via api
async function registerUser(data: Schema) {
  try {
    const response = await $fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      body: data,
    })

    console.log("Inscription réussie", response)
    // Afficher un toast de succès ou rediriger
    toast.add({
      title: 'Connexion réussie',
      description: 'Bienvenue sur votre tableau de bord',
      color: 'success'
    })
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
    // Afficher une alerte/toast d'erreur
    toast.add({
      title: 'Erreur',
      description: 'Un problème est survenue lors de la création de votre compte',
      color: 'error'
    })
  }
}

function onInvalid(error: any) {
    console.warn("Validation error:", error)
}
</script>
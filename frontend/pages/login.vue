<script setup lang="ts">
import '../assets/css/login.scss'
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = object({
    email: string().email('Invalid email').required('Required'),
    password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: '',
    password: ''
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    console.log("Success")
    if (event.data.email != null && event.data.password != null) {
        loginUser(event.data)
    }
}

async function loginUser(data: Schema) {
  try {
    const response = await $fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      body: data,
    })

    console.log("Connexion réussie", response)
    // Afficher un toast de succès ou rediriger
  } catch (error) {
    console.error("Erreur lors de la connexion :", error)
    // Afficher une alerte/toast d'erreur
  }
}

function onInvalid(error: any) {
    console.warn("Validation error:", error)
}
</script>
<template>
    <div class="login dark">
        <UForm :schema="schema" :state="state" @submit="onSubmit" @submit-invalid="onInvalid">
            <UCard variant="solid" class="container">
                <template #header>
                    <h1 class="text-center title">Connexion</h1>
                    <p class="text">Connectez-vous pour accéder à votre espace</p>
                </template>
                <div class="content">
                    <UFormField label="Identifiants de connexion :" required>
                        <UInput v-model="state.email" icon="i-lucide-at-sign" class="input" size="xl" type="email" color="neutral" variant="soft" placeholder="Adresse mail" />
                        <UInput v-model="state.password" icon="solar:lock-password-bold" class="input" size="xl" type="password" color="neutral" variant="soft" placeholder="Mot de passe" />
                    </UFormField>
                </div>
                <div class="footer">
                    <div class="buttons">
                        <UButton 
                            type="submit"
                            icon="material-symbols:rocket-launch-rounded"
                            color="primary"
                            size="lg"
                            variant="solid"
                            label="Se connecter"
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
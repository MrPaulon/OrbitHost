<template>
    <div class="login dark">
        <UForm :schema="schema" :state="state" @submit="onSubmit" @submit-invalid="onInvalid">
            <UCard variant="solid" class="container" style="height: 430px;" v-if="loginTexts">
                <template #header>
                    <h1 class="text-center title">{{ loginTexts.title}}</h1>
                    <p class="text">{{ loginTexts.description }}</p>
                </template>
                <div class="content" v-if="loginTexts.form">
                    <UFormField :label="loginTexts.form.field"required>
                        <UInput v-model="state.email" icon="i-lucide-at-sign" class="input" size="xl" type="email" color="neutral" variant="soft" :placeholder="loginTexts.form.mail" />
                        <UInput v-model="state.password" icon="solar:lock-password-bold" class="input" size="xl" type="password" color="neutral" variant="soft" :placeholder="loginTexts.form.password" />
                    </UFormField>
                </div>
                <div class="footer">
                    <div class="buttons" v-if="loginTexts.buttons">
                        <UButton 
                            type="submit"
                            icon="material-symbols:rocket-launch-rounded"
                            color="primary"
                            size="lg"
                            variant="solid"
                            :label="loginTexts.buttons.login"
                        />
                        <div class="divider"></div>
                        <UButton
                            :label="loginTexts.buttons.register"
                            icon="solar:login-3-bold-duotone"
                            color="primary"
                            size="lg"
                            variant="link"
                            to="/auth/register"
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

// Lang
const lang = (await import('~/assets/texts/lang.json')).default.lang

// Texts
const loginTexts = ref({})

// Variables
const toast = useToast()

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

// Chargement du text json
onMounted(async () => {
    loginTexts.value = await import(`@/assets/texts/${lang}/pages/auth/login.json`)
})

// Fonction submit
async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (event.data.email != null && event.data.password != null) {
        loginUser(event.data)
    }
}

// Fonction API création user
async function loginUser(data: Schema) {
  try {
    // Test des identifiants sur l'api
    const response = await $fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      body: data,
    })

    // Stockage du token
    localStorage.setItem('token', response.token)
    toast.add({
      title: loginTexts.value.alert.success.title,
      description: loginTexts.value.alert.success.description,
      color: 'success'
    })

    // Redirection vers la page d'accueil
    navigateTo('/')
  } catch (error) {
    // Gestion des erreurs
    // Afficher une alerte/toast d'erreur
    toast.add({
      title: loginTexts.value.alert.error.title,
      description: loginTexts.value.alert.error.description,
      color: 'error'
    })
  }
}

function onInvalid(error: any) {
    console.warn("Validation error:", error)
}

</script>
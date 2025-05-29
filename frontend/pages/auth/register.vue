<template>
    <div class="register dark">
        <Lang />
        <UForm :schema="schema" :state="state" @submit="onSubmit" @submit-invalid="onInvalid">
            <UCard variant="solid" class="container" style="height: 550px;" v-if="registerTexts">
                <template #header>
                    <h1 class="text-center title">{{registerTexts.title}}</h1>
                    <p class="text">{{registerTexts.description}}</p>
                </template>
                <div class="content" v-if="registerTexts.form">
                    <UFormField :label="registerTexts.form.field" required>
                        <UInput v-model="state.email" icon="i-lucide-at-sign" class="input" size="xl" type="email" color="neutral" variant="soft" :placeholder="registerTexts.form.mail" />
                        <UInput v-model="state.pseudo" icon="solar:user-hand-up-bold" class="input" size="xl" type="text" color="neutral" variant="soft" :placeholder="registerTexts.form.pseudo" />
                        <UInput v-model="state.password" icon="solar:lock-password-bold" class="input" size="xl" type="password" color="neutral" variant="soft" :placeholder="registerTexts.form.password" />
                    </UFormField>
                </div>
                <div class="footer" v-if="registerTexts.buttons">
                    <p class="text">{{ registerTexts.cgu }}</p>
                    <div class="buttons">
                        <UButton 
                            type="submit"
                            icon="material-symbols:rocket-launch-rounded"
                            color="primary"
                            size="lg"
                            variant="solid"
                            :label="registerTexts.buttons.register"
                        />
                        <div class="divider"></div>
                        <UButton
                            :label="registerTexts.buttons.register"
                            icon="solar:login-2-bold-duotone"
                            color="primary"
                            size="lg"
                            variant="link"
                            to="/auth/login"
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
import { getLang } from '~/utils/lang.ts'


// Lang
const lang = (await getLang())
const registerTexts = ref({})


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

// Chargement du text json
onMounted( async() => {
    registerTexts.value = await import(`@/assets/texts/${lang}/pages/auth/register.json`)
})

// Fonction vérification des informations saisies
async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data);
    if (event.data.email != null && event.data.password != null && event.data.pseudo != null) {
        if (event.data.password.length > 8) {
            registerUser(event.data)
        } else {
            toast.add({
                title: registerTexts.value.alert.fielderror.title,
                description: registerTexts.value.alert.fielderror.description,
                color: 'error'
            })
        }
    } else {
        toast.add({
            title: registerTexts.value.alert.fielderror.title,
            description: registerTexts.value.alert.fielderror.description,
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

    // Afficher un toast de succès ou rediriger
    toast.add({
      title: registerTexts.value.alert.success.title,
      description: registerTexts.value.alert.success.title,
      color: 'success'
    })
  } catch (error) {
    // Afficher une alerte/toast d'erreur
    toast.add({
      title: registerTexts.value.alert.error.title,
      description: registerTexts.value.alert.error.description,
      color: 'error'
    })
  }
}

function onInvalid(error: any) {
    console.warn("Validation error:", error)
}
</script>
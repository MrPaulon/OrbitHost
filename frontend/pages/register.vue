<script setup lang="ts">
import "../assets/css/register.scss";
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = object({
    email: string().email('Invalid email').required('Required'),
    pseudo: string().min(3, 'Invalid pseudo').required('Required'),
    password: string()
        .min(8, 'Must be at least 8 characters')
        .required('Required')
})

type Schema = InferType<typeof schema>

const state = reactive({
    email: undefined,
    pseudo: undefined,
    password: undefined
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
    console.log(event.data)
    console.log("Success")
}

function onInvalid(error: any) {
    console.warn("Validation error:", error)
}
</script>

<template>
    <div class="register dark">
        <UForm :schema="schema" :state="state" @submit="onSubmit" @submit-invalid="onInvalid">
            <UCard variant="solid" class="container">
                <template #header>
                    <h1 class="text-center title">Bienvennue</h1>
                    <p class="text">Créez un compte pour accéder à nos services</p>
                </template>
                <div class="content">
                    <UFormField label="Champs nécéssaire:" required>
                        <UInput v-model="state.email" icon="i-lucide-at-sign" class="input" size="xl" type="email" color="neutral" variant="soft" placeholder="Adresse mail" />
                        <UInput v-model="state.pseudo" icon="solar:user-hand-up-bold" class="input" size="xl" type="text" color="neutral" variant="soft" placeholder="Pseudo" />
                        <UInput v-model="state.password" icon="solar:lock-password-bold" class="input" size="xl" type="password" color="neutral" variant="soft" placeholder="Mot de passe" />
                    </UFormField>
                </div>
                <template #footer>
                    <UButton type="submit" icon="material-symbols:rocket-launch-rounded" color="primary" size="lg" variant="solid" label="Créer le compte" />
                </template>
            </UCard>
        </UForm>
    </div>
</template>
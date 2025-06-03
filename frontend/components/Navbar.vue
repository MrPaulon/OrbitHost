<template>
    <nav class="flex items-center p-4 bg-surface border-b border-border" style="position: fixed; z-index: 100; width: 100%;">
      <img style="width: 50px; margin-left: 20px;" src="/logo_sans_texte_sans_fond.png" alt="">
      <UButton to="/" variant="link" color="neutral"><h1 class="text-xl font-bold ml-2">{{ app.name }}</h1></UButton>

      <div style="display: flex; position: absolute; right: 30px;" class="gap-5">
        <Lang />
        <UChip :show="false">
         <UButton icon="ic:twotone-support" color="neutral" variant="subtle" />
        </UChip>
        <UChip :show="false">
         <UButton icon="solar:bell-bold" color="neutral" variant="subtle" />
        </UChip>

        <UDropdownMenu
          :items="items"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8
          }"
          :ui="{
            content: 'w-48'
          }"
        >
          <UButton :label="navbarTexts.account" icon="solar:user-bold" color="primary" variant="solid" />
        </UDropdownMenu>
      </div>
    </nav>
</template>

<script setup lang="ts">
// Modules
import { ref, onMounted } from 'vue'
import type { DropdownMenuItem } from '@nuxt/ui'
import { getLang } from '~/utils/lang.ts'

// Langue
const lang = (await getLang())
const app = (await import(`~/assets/texts/app.json`)).default

// Références pour le texte et les éléments du menu
const navbarTexts = ref<any>({})
const items = ref<DropdownMenuItem[]>([])

// User id
const userId = ref(null)


onMounted(async () => {
  // Récupération du token
  const token = localStorage.getItem('token')
  if (!token) return

  // Décoder le token pour récupérer l'ID utilisateur
  const payload = JSON.parse(atob(token.split('.')[1]))
  userId.value = payload.userId

  console.log(userId.value)

  const data = await import(`@/assets/texts/${lang}/components/navbar.json`)
  navbarTexts.value = data.default

  // Créer les items dynamiquement avec les labels du JSON
  items.value = [
    {
      label: navbarTexts.value.menu.profile,
      icon: 'solar:user-bold',
      to: `/user/${userId.value}`
    },
    {
      label: navbarTexts.value.menu.logout,
      icon: 'solar:logout-2-bold-duotone',
      to: 'logout'
    },
    {
      label: navbarTexts.value.menu.admin,
      icon: 'solar:shield-bold-duotone',
      to: '/admin'
    }
  ]
})
</script>

<template>
    <nav class="flex items-center p-4 bg-surface border-b border-border" style="position: fixed; z-index: 100; width: 100%;">
      <img style="width: 50px; margin-left: 20px;" src="/logo_sans_texte_sans_fond.png" alt="">
      <UButton to="/" variant="link" color="neutral"><h1 class="text-xl font-bold ml-2">Serverly</h1></UButton>

      <div style="display: flex; position: absolute; right: 30px;" class="gap-5">
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
          <UButton label="Mon compte" icon="solar:user-bold" color="primary" variant="solid" />
        </UDropdownMenu>
      </div>
    </nav>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref<DropdownMenuItem[]>([
  {
    label: 'Profil',
    icon: 'solar:user-bold'
  },
  {
    label: 'Paramètres',
    icon: 'solar:settings-bold-duotone'
  },
  {
    label: 'Déconnexion',
    icon: 'solar:logout-2-bold-duotone',
    to: 'logout'
  },
  {
    label: 'Admin',
    icon: 'solar:shield-bold-duotone',
    to: '/admin'
  },
])
</script>

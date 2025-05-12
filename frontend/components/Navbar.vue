<template>
    <nav class="flex items-center p-4 bg-surface border-b border-border" style="position: relative;">
      <img style="width: 50px; margin-left: 20px;" src="/logo_sans_texte_sans_fond.png" alt="">
      <h1 class="text-xl font-bold ml-2">Serverly</h1>

      <div style="display: flex; position: absolute; right: 30px;" class="gap-5">
        <UChip :show="false">
         <UButton icon="ic:twotone-support" color="neutral" variant="subtle" />
        </UChip>
        <UChip :show="false">
         <UButton icon="solar:bell-bold" color="neutral" variant="subtle" />
        </UChip>
        <UButton icon="solar:user-bold" label="Mon compte" color="primary" variant="solid" />
      </div>
    </nav>
</template>
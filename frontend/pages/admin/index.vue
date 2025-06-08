<template>
  <div class="indexpage">
    <div class="content">
      <h1>Dashboard</h1>
      <p>Version beta (dev-784p)</p>

      <div class="index-card">
        <UIcon style="color: rgb(133, 245, 133);" name="solar:square-bottom-up-bold-duotone" class="size-6" />
        <p>La version actuelle est (dev-784p). Le panel est à jour</p>
      </div>

      <div class="index-card">
        <UIcon style="color: var(--color-primary-400);" name="solar:document-text-bold-duotone" class="size-6" />
        <p>Un soucis ? Consultez la documentation</p>
        <UButton color="primary" label="Documentation" to="https://serverly.gitbook.io/serverly-docs" />
      </div>

      <div class="info-cards">
        <UCard class="card">
          <p class="text-sm">Nodes Actifs</p>
          <p class="information">2</p>
        </UCard>

        <UCard class="card">
          <p class="text-sm">Serveurs Actifs</p>
          <p class="information">8</p>
        </UCard>

        <UCard class="card">
          <p class="text-sm">Nombre utilisateurs</p>
          <p class="information">10</p>
        </UCard>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Layout admin
definePageMeta({
layout: 'admin'
})

// Style
import "~/assets/css/admin/index.scss"
</script>
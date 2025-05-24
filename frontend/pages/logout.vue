<template></template>
<script setup lang="ts">
// Désactivation du layout
definePageMeta({
  layout: false
})
// Supprime le token et redirige vers le login
onMounted(() => {
    const token = localStorage.getItem('token')

    localStorage.removeItem('token')
    return navigateTo('/auth/login')
})
</script>
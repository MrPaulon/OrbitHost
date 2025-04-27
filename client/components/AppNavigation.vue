<script setup lang="ts">
import '~/assets/css/AppNavigation.scss'
</script>
<template>
    <div class="navbar">
        <div class="content  bg-indigo-800 bg-muted rounded-xl opacity-90">
            <div class="left">
                <img src="../public/logo_no_bg.png" alt="logo">
            </div>
            <div class="center">
                <div class="buttons">
                    <UButton
                        icon="solar:home-2-bold"
                        size="md"
                        color="neutral"
                        variant="outline"
                    >
                        Accueil
                    </UButton>
                    <UButton
                        icon="solar:book-2-broken"
                        size="md"
                        color="neutral"
                        variant="outline"
                    >
                        Docs
                    </UButton>
                </div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>
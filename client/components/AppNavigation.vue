<script setup lang="ts">
import '~/assets/css/AppNavigation.scss'
</script>
<template>
    <div class="navigation">
        <div class="content bg-muted/40 text-dark-10">
            <div class="categorie text-indigo-150 text-xs">MENU
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:cloud-bold"
                >
                    Mes serveurs
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="ic:round-support"
                >
                    Support
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:settings-minimalistic-bold"
                >
                    Paramètres
                </UButton>
            </div>

            <!--CATEGORIE SERVER SETTINGS-->
            <div class="categorie text-indigo-150 text-xs">GESTION SERVEUR
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/dashboard"
                    as="button"
                    class="button text-dark-10"
                    icon="material-symbols:space-dashboard"
                >
                    Dashboard
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:programming-bold"
                >
                    Console
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:spedometer-low-bold-duotone"
                >
                    Performance
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:database-bold-duotone"
                >
                    Base de données
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:folder-with-files-bold"
                >
                    Fichiers
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:rewind-back-bold-duotone"
                >
                    Backup
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    to="/"
                    as="button"
                    class="button text-dark-10"
                    icon="solar:document-text-bold"
                >
                    Logs
                </UButton>
            </div>

            <!--BLANK-->
            <div class="categorie"></div>
        </div>
    </div>
</template>
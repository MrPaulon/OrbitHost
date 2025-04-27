<script setup lang="ts">
import '~/assets/css/AppNavigation.scss'
</script>
<template>
    <div class="navbar">
        <div class="content  bg-indigo-800 bg-muted opacity-90">
            <h1 class="title text-white font-bold text-3xl">Pterodactyl<span class=""></span> </h1>
            <div class="categorie text-indigo-150 text-xs font-extrabold">MENU
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:cloud-bold"
                >
                    Mes serveurs
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="ic:round-support"
                >
                    Support
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:settings-minimalistic-bold"
                >
                    Paramètres
                </UButton>
            </div>

            <!--CATEGORIE SERVER SETTINGS-->
            <div class="categorie text-indigo-150 text-xs font-extrabold">GESTION SERVEUR
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="material-symbols:space-dashboard"
                >
                    Dashboard
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:programming-bold"
                >
                    Console
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:spedometer-low-bold-duotone"
                >
                    Performance
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:database-bold-duotone"
                >
                    Base de données
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:folder-with-files-bold"
                >
                    Fichiers
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:rewind-back-bold-duotone"
                >
                    Backup
                </UButton>
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:document-text-bold"
                >
                    Logs
                </UButton>
            </div>


            <!--COMPTE-->
            <div class="categorie text-indigo-150 text-xs font-extrabold">COMPTE
                <UButton
                    color="secondary"
                    variant="ghost"
                    icon="solar:shield-user-bold"
                >
                    Mon compte
                </UButton>
                <UButton
                    color="error"
                    variant="ghost"
                    icon="solar:logout-2-bold"
                >
                    Deconnexion
                </UButton>
            </div>

            <!--BLANK-->
            <div class="categorie"></div>
        </div>
        </div>
</template>
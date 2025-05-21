<template>
    <div class="navigation">
        <div class="content">
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}`) }" icon="solar:programming-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}`">Console</UButton>
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}/files`) }" icon="solar:folder-with-files-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/files`">Fichiers</UButton>
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}/database`) }" icon="solar:database-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/database`">Base de données</UButton>
            <UButton class="button" :class="{ active: isActive(`/sever/${idServer}/actions`) }" icon="solar:alarm-play-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/actions`">Actions</UButton>
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}/users`) }" icon="solar:user-hands-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/users`">Utilisateurs</UButton>
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}/backups`) }" icon="solar:rewind-back-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/backups`">Backups</UButton>
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}/logs`) }" icon="solar:document-text-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/logs`">Logs</UButton>
            <UButton class="button" :class="{ active: isActive(`/server/${idServer}/settings`) }" icon="solar:settings-bold-duotone" size="xl" color="neutral" variant="subtle" :to="`/server/${idServer}/settings`">Paramètres</UButton>
        </div>
    </div>
</template>

<script setup lang="ts">
// Style
import "~/assets/css/components/navigation.scss"
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path: string) => route.path === path
const idServer = route.params.idServer as string
</script>
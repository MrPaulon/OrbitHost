<script setup lang="ts">
import { useRoute } from 'vue-router'
import "~/assets/css/components/navigation.scss"

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>
<template>
    <div class="navigation">
        <div class="content">
            <UButton class="button" :class="{ active: isActive('/admin') }" icon="solar:screencast-2-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin'">Dashboard</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/settings') }" icon="solar:settings-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/settings'">Paramètres</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/api') }" icon="solar:delivery-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/api'">API</UButton>
            <p>Gestion</p>
            <UButton class="button" :class="{ active: isActive('/admin/database') }" icon="solar:database-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/database'">Base de données</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/locations') }" icon="solar:earth-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/locations'">Emplacements</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/nodes') }" icon="solar:slash-square-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/nodes'">Nodes</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/servers') }" icon="solar:server-square-cloud-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/servers'">Serveurs</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/users') }" icon="solar:user-hands-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/users'">Utilisateurs</UButton>
        </div>
    </div>
</template>
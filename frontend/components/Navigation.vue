<template>
    <div class="navigation">
        <div class="content">
            <UButton class="button" :class="{ active: isActive('/admin') }" icon="solar:screencast-2-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin'">{{ navigationTexts.dashboard }}</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/settings') }" icon="solar:settings-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/settings'">{{ navigationTexts.settings }}</UButton>
            <UButton class="button" :class="{ active: isActive('/admin/api') }" icon="solar:delivery-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/api'">{{ navigationTexts.api }}</UButton>
            <template v-if="navigationTexts.manage">
                <p>{{ navigationTexts.manage.title }}</p>
                <UButton class="button" :class="{ active: isActive('/admin/database') }" icon="solar:database-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/database'">{{ navigationTexts.manage.database }}</UButton>
                <UButton class="button" :class="{ active: isActive('/admin/locations') }" icon="solar:earth-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/locations'">{{ navigationTexts.manage.locations }}</UButton>
                <UButton class="button" :class="{ active: isActive('/admin/nodes') }" icon="solar:slash-square-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/nodes'"> {{ navigationTexts.manage.nodes }} </UButton>
                <UButton class="button" :class="{ active: isActive('/admin/servers') }" icon="solar:server-square-cloud-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/servers'">{{ navigationTexts.manage.servers }}</UButton>
                <UButton class="button" :class="{ active: isActive('/admin/users') }" icon="solar:user-hands-bold-duotone" size="xl" color="neutral" variant="subtle" :to="'/admin/users'">{{ navigationTexts.manage.users }}</UButton>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
// Style
import "~/assets/css/components/navigation.scss"
import { useRoute } from 'vue-router'
import { getLang } from '~/utils/lang.ts'

// Langue
const lang = (await getLang())
const navigationTexts = ref({})

// Variables
const route = useRoute()
const isActive = (path: string) => route.path === path

onMounted(async () => {
  const data = await import(`@/assets/texts/${lang}/components/navigation.json`)
  navigationTexts.value = data.default
})
</script>
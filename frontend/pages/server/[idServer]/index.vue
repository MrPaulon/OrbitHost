<template>
    <div class="serverpage dark">
        <div class="content">
            <h1>Id: {{ idServer }}</h1>
        </div>
    </div>
</template>
  
<script setup lang="ts">
// Style
import "~/assets/css/server/index.scss"

// Layout admin
definePageMeta({
  layout: 'server'
})

const route = useRoute()
const idServer = route.params.idServer as string
</script>
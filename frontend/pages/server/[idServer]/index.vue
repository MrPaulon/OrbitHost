<template>
    <div>
      <h1>Id: {{ idServer }}</h1>
    </div>
</template>
  
<script setup lang="ts">
const route = useRoute()
const idServer = route.params.idServer as string
</script>
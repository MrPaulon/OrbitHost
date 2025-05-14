<template>
    <div class="listcard">
      <div class="header">
        <UInput
          class="searchbar"
          v-model="searchQuery"
          :placeholder="`Rechercher dans ${title}...`"
          icon="i-heroicons-magnifying-glass"
        />
        <UButton icon="solar:cloud-upload-bold-duotone" class="bouton" size="md" color="primary" :to="`${route.path}/create`">
          Créer
        </UButton>
      </div>
      <div class="table">
        <div class="tablecontent">
          <div v-for="item in paginatedItems" :key="item.id" class="server">
            <p>Id: {{ item.id }}</p>
            <p>Utilisateur: {{ item.user_id || '—' }}</p>
            <p>Nom: {{ item.name }}</p>
            <p>Ip: {{ item.ip_address }}</p>
            <p>Type: {{ item.os_type || 'VPS' }}</p>
            <div class="serverbtn">
              <UButton icon="solar:eye-bold-duotone" color="primary" variant="solid" :to="`/admin/servers/${item.id}`" />
              <UButton icon="solar:trash-bin-minimalistic-bold-duotone" color="error" variant="solid" @click="$emit('delete', item.id)" />
            </div>
          </div>
        </div>
        <div class="pagination flex gap-4 mt-4">
          <UButton icon="solar:alt-arrow-left-bold" :disabled="page === 1" @click="page--" />
          <UButton icon="solar:alt-arrow-right-bold" :disabled="page === pageCount" @click="page++" />
        </div>
      </div>
    </div>
</template>
  
<script setup>
const route = useRoute()
import "~/assets/css/components/ListTable.scss";
  const props = defineProps({
    title: String,
    data: Array,
    searchKeys: Array
  })
  
  const emit = defineEmits(['delete'])
  
  const searchQuery = ref('')
  const page = ref(1)
  const itemsPerPage = 4
  
  const filtered = computed(() => {
    if (!searchQuery.value) return props.data
    const q = searchQuery.value.toLowerCase()
    return props.data.filter(item =>
      props.searchKeys.some(key => item[key]?.toLowerCase?.().includes(q))
    )
  })
  
  const pageCount = computed(() => Math.ceil(filtered.value.length / itemsPerPage))
  const paginatedItems = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    return filtered.value.slice(start, start + itemsPerPage)
  })
</script>
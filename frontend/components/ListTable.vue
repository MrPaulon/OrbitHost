<template>
  <div class="listcard">
    <div class="header">
      <UInput
        class="searchbar"
        v-model="searchQuery"
        :placeholder="`Rechercher dans ${title}...`"
        icon="i-heroicons-magnifying-glass"
      />
      <UButton icon="solar:cloud-plus-bold-duotone" class="bouton" size="md" color="primary" :to="`${route.path}/create`">
        Créer
      </UButton>
    </div>
    <div class="table">
      <div class="tablecontent">
          <div v-if="paginatedItems.length === 0" class="text-center text-sm text-gray-500 py-4">
              Aucune donnée trouvée.
          </div>
          <div v-for="item in paginatedItems" :key="item.id" class="server">
              <UIcon :name="`${icon}`" class="size-8" />
              <p v-for="field in fields" :key="field">
              {{ field }}: {{ item[field] }}
              </p>
              <div class="serverbtn">
                  <UButton
                      icon="solar:eye-bold-duotone"
                      color="primary"
                      variant="solid"
                      :to="`/admin/${itemType}/${item.id}`"
                  />
                  <UPopover>
                    <UButton
                      icon="solar:trash-bin-minimalistic-bold-duotone"
                      color="error"
                      variant="solid"
                  />

                    <template #content>
                      <div class="contentPopOver" style="width: 220px; padding: 20px; border-radius: 8px; display: flex; flex-direction: column; align-items: center;">
                        <p style="text-align: center; margin-bottom: 10px;">Voulez-vous vraiment supprimer ?</p>
                        <UButton
                          icon="solar:trash-bin-minimalistic-bold-duotone"
                          color="error"
                          variant="solid"
                          @click="$emit('delete', item.id)"
                          style="color: var(--color-text);"
                        >
                        Confirmer
                        </UButton>
                      </div>
                    </template>
                  </UPopover>

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
// Style
import "~/assets/css/components/ListTable.scss";

const route = useRoute()
const props = defineProps({
  title: String,
  data: Array,
  itemType: String,
  fields: Array,
  icon: String
})

const emit = defineEmits(['delete'])

const searchQuery = ref('')
const page = ref(1)
const itemsPerPage = 4

const filtered = computed(() => {
    if (!searchQuery.value) return props.data
    const q = searchQuery.value.toLowerCase()
    return props.data.filter(item =>
        Object.values(item).some(val =>
        String(val).toLowerCase().includes(q)
        )
    )
})

const pageCount = computed(() => Math.ceil(filtered.value.length / itemsPerPage))
const paginatedItems = computed(() => {
    const start = (page.value - 1) * itemsPerPage
    return filtered.value.slice(start, start + itemsPerPage)
})
</script>
<template>
  <div class="create dark">
    <div class="content"> 
      <h1>Créer une node</h1>
      <div class="card">
        <UForm class="w-full" :state="form" @submit="handleSubmit">
          <UStepper v-model="currentStep" :items="stepperitems" class="w-full my-3" style="gap: 0px;">
            <template #configuration>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="justify-items: center;">

                  <UFormField label="Nom de la node">
                      <UInput v-model="form.name" icon="solar:text-square-bold-duotone" size="xl" placeholder="ex: node-paris-1" required class="mb-4" />
                  </UFormField>
                  <UFormField label="FQDN">
                      <UInput v-model="form.fqdn" icon="solar:diploma-verified-bold-duotone" size="xl" placeholder="ex: node1.exemple.com" required class="mb-4" />
                  </UFormField>
                  <UFormField label="Adresse IP">
                      <UInput v-model="form.ip_address" icon="solar:station-bold-duotone" size="xl" placeholder="ex: 192.168.1.10" required class="mb-4" />
                  </UFormField>
                  <UFormField label="Port">
                      <UInput v-model="form.port" icon="solar:shield-network-bold-duotone" size="xl" placeholder="ex: 8080" required class="mb-4" />
                  </UFormField>
                  <UFormField label="localisation">
                      <USelect class="btn" icon="solar:map-point-bold-duotone" size="xl" v-model="form.location_id" :items="itemsLocation" required/>
                  </UFormField>
                  <UFormField label="Méthode">
                      <USelect class="btn" icon="solar:slash-square-bold-duotone" size="xl" v-model="form.method" :items="itemsMethod" required/>
                  </UFormField>
              </div>

              <div class="createbtn">
                  <UButton icon="solar:cloud-upload-bold-duotone" class="btn submit" size="xl" type="button" @click="next" color="primary">Suivant</UButton>
              </div>
            </template>

            <template #settings>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="justify-items: center;">
                  <UFormField label="Capacité de stockage (Mb)">
                      <UInput type="number"v-model="form.storageValue" icon="solar:shield-network-bold-duotone" size="xl" placeholder="-1 = illimité" required class="mb-4" />
                  </UFormField>
                  <UFormField label="Mémoire vive (Mb)">
                      <UInput type="number" v-model="form.memoryValue" icon="solar:shield-network-bold-duotone" size="xl" placeholder="-1 = illimité" required class="mb-4" />
                  </UFormField>
                  <UFormField label="CPU (% / 100)">
                      <UInput type="number" v-model="form.cpuValue" icon="solar:shield-network-bold-duotone" size="xl" placeholder="-1 = illimité" max="100" required class="mb-4" />
                  </UFormField>
                  <UFormField label="Maintenance" style="width: 300px;">
                    <UCheckbox size="sm" color="primary" variant="card" v-model="form.maintenance" label="Actif" />
                  </UFormField>
              </div>
              <div class="createbtn">
                  <UButton icon="solar:check-square-bold-duotone" class="btn submit" size="xl" type="button" @click="createNode" color="primary">Créer</UButton>
              </div>
            </template>
          </UStepper>
        </UForm>
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
// Style
import "~/assets/css/admin/nodes/create.scss"

// Layout admin
definePageMeta({
  layout: 'admin'
})

// Importations des modules
import { ref } from 'vue'
import { useFetch } from '#app'
import type { StepperItem, CheckboxGroupItem } from '@nuxt/ui'


// Variables
const toast = useToast()
// Stepper
const stepperitems = [
  {
    slot: 'configuration' as const,
    title: 'Configuration',
    icon: 'solar:server-square-cloud-bold-duotone'
  }, {
    slot: 'settings' as const,
    title: 'Réglages',
    icon: 'solar:settings-bold-duotone'
  }
] satisfies StepperItem[]
const currentStep = ref(0)

const form = ref({
  name: '',
  fqdn: '',
  ip_address: '',
  port: '',
  location_id: '',
  method: '',
  storageValue: '',
  memoryValue: '',
  cpuValue: '',
  maintenance: true
})

const itemsMethod = ref(['HTTP', 'HTTPS'])
const itemsLocation = ref([])

function next() {
  currentStep.value = 1
}

function createNode() {
  console.log(form.value)
}

// Récupération liste des utilisateurs
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')

    // Récupération des location
    const locations = await $fetch('http://localhost:3001/api/locations/list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    itemsLocation.value = locations.map(location => ({
      label: location.name,
      value: location.id
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
  }
})

const handleSubmit = async () => {
  const { data, error } = await useFetch('/api/nodes/create', {
    method: 'POST',
    body: form.value
  })

  if (error.value) {
    console.error('Erreur lors de la création de la node :', error.value.data?.error)
    return
  }

  alert('Node créée avec succès !')
}
</script>
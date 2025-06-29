<template>
    <div class="viewpage">
        <div class="content">
            <h1>Node n°{{ nodeId }}</h1>
            <div class="card">
                <UTabs :items="tabsitems" class="w-full" >
                    <template #overview>
                        <div class="overview">
                            <h2>Informations de la node:</h2>
                            <div class="informations">
                                <div class="infocard">
                                    <h3>Status:</h3>
                                    <p :style="{ color: node.status === 'unknown' ? 'var(--color-green-400)' : 'var(--color-red-400)' }">
                                      {{ node.status === 'unknown' ? 'En ligne' : 'Hors ligne' }}
                                    </p>
                                </div>
                                <div class="infocard">
                                    <h3>PyAgent version:</h3>
                                    <p>dev-431</p>
                                </div>
                                <div class="infocard">
                                    <h3>Domaine (FQDN):</h3>
                                    <p>{{node.fqdn}}</p>
                                </div>
                                <div class="infocard">
                                    <h3>Adresse IP:</h3>
                                    <p>{{node.ip_address}}</p>
                                </div>
                                <div class="infocard">
                                    <h3>Port:</h3>
                                    <p>{{node.ssh_port}}</p>
                                </div>
                                <div class="infocard">
                                    <h3>Maintenance mode:</h3>
                                    <p>{{ node.maintenance ? 'Oui' : 'Non' }}</p>
                                </div>
                            </div>
                        </div>


                        <div class="stats" >
                            <UButton class="btn" @click="view_metrics">Afficher les statistiques</UButton>
                            <h2 v-if="node_metrics.cpu_percent">Utilisation des ressources</h2>
                            <div class="charts">
                                <StatsChart v-if="node_metrics.cpu_percent" class="graphique" color="#6690ff" label="Utilisation CPU (%)" :data="data_cpu" />
                                <StatsChart v-if="node_metrics.memory_percent" class="graphique" color="#c07efe" label="Utilisation RAM (%)" :data="data_memory" />
                                <PieChart
                                v-if="node_metrics.disk_total_gb"
                                class="graphique"
                                :labels="['Disque disponible', 'Disque utilisé']"
                                :values="[node_metrics.disk_total_gb, node_metrics.disk_used_gb]"
                                title="Répartition des ressources"
                                />
                            </div>
                        </div>
                    </template>

                    <template #settings>
                        <div class="settings">
                            <UForm class="w-full" :state="node_form" @submit="updateInfos">
                                <div class="flex flex-wrap">
                                    <div class="champs">
                                        <UFormField label="Nom de la node">
                                            <UInput v-model="node_form.name" icon="solar:text-square-bold-duotone" size="xl" placeholder="ex: node-paris-1" required />
                                        </UFormField>
                                        <UFormField label="Maintenance" style="width: 300px;">
                                            <UCheckbox size="sm" color="primary" variant="card" v-model="node_form.maintenance" label="Actif" />
                                        </UFormField>
                                    </div>
                                    <USeparator/>

                                    <div class="champs">
                                        <UFormField label="FQDN">
                                            <UInput v-model="node_form.fqdn" icon="solar:diploma-verified-bold-duotone" size="xl" placeholder="ex: node1.exemple.com" required  />
                                        </UFormField>
                                        <UFormField label="Adresse IP">
                                            <UInput v-model="node_form.ip_address" icon="solar:station-bold-duotone" size="xl" placeholder="ex: 192.168.1.10" required  />
                                        </UFormField>
                                        <UFormField label="Port">
                                            <UInput v-model="node_form.ssh_port" icon="solar:shield-network-bold-duotone" size="xl" placeholder="ex: 8080" required  />
                                        </UFormField>
                                        <UFormField label="localisation">
                                            <USelect class="btn" icon="solar:map-point-bold-duotone" size="xl" v-model="node_form.location_id" :items="itemsLocation" required/>
                                        </UFormField>
                                        <UFormField label="Méthode">
                                            <USelect class="btn" icon="solar:slash-square-bold-duotone" size="xl" v-model="node_form.method" default-value="HTTP" :items="itemsMethod" required/>
                                        </UFormField>
                                    </div>
                                    <USeparator/>

                                    <div class="champs">
                                        <UFormField label="Capacité de stockage (Mb)">
                                            <UInput type="number"v-model="node_form.storage_usage" icon="solar:shield-network-bold-duotone" size="xl" placeholder="-1 = illimité" required  />
                                        </UFormField>
                                        <UFormField label="Mémoire vive (Mb)">
                                            <UInput type="number" v-model="node_form.ram_usage" icon="solar:shield-network-bold-duotone" size="xl" placeholder="-1 = illimité" required  />
                                        </UFormField>
                                        <UFormField label="CPU (% / 100)">
                                            <UInput type="number" v-model="node_form.cpu_usage" icon="solar:shield-network-bold-duotone" size="xl" placeholder="-1 = illimité" max="100" required  />
                                        </UFormField>
                                    </div>
                                    <USeparator/>

                                    <div class="createbtn">
                                        <UButton icon="solar:refresh-square-bold-duotone" class="btn submit" size="xl" type="submit" color="primary">Mettre à jour</UButton>
                                    </div>
                                </div>
                            </UForm>
                        </div>
                    </template>
                </UTabs>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Layout admin
definePageMeta({
layout: 'admin'
})

// Style
import "~/assets/css/admin/nodes/view.scss"

// Importations des modules
import { useRoute } from 'vue-router'
import type { TabsItem } from '@nuxt/ui'
import { boolean } from "yup"


// Variables
const route = useRoute()
const toast = useToast()
const nodeId = route.params.nodeId as string
const node = ref([])
const node_metrics = ref([])
const data_cpu = ref([])
const data_memory= ref([])
const itemsMethod = ref(['HTTP', 'HTTPS'])
const itemsLocation = ref([])

const tabsitems = ref<TabsItem[]>([
  {
    label: 'Aperçu',
    icon: 'solar:gallery-send-bold-duotone',
    slot: 'overview' as const
  },
  {
    label: 'Paramèttres',
    icon: 'solar:settings-bold-duotone',
    slot: 'settings' as const
  },
  {
    label: 'Allocations',
    icon: 'solar:station-bold-duotone',
    slot: 'allocation' as const
  },
  {
    label: 'Serveurs',
    icon: 'solar:server-square-bold-duotone',
    slot: 'servers' as const
  },
  {
    label: 'Configuration',
    icon: 'solar:code-line-duotone',
    slot: 'configuration' as const
  }
])

// Variables du formulaire à envoyer à l'API
const node_form = ref({
  name: '',
  fqdn: '',
  ip_address: '',
  ssh_port: '',
  location_id: '',
  method: '',
  storage_usage: '',
  ram_usage: '',
  cpu_usage: '',
  maintenance: boolean
})


// Récupération de la liste de tous les node
onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const [result_node] = await $fetch(`http://localhost:3001/api/nodes/get/${nodeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    node.value = result_node
    node_form.value = node.value

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
    console.error('Erreur lors du chargement de la node :', error)
  }
})

function pushLimitedArray(arr: number[], value: number, maxLength: number) {
  if (arr.length >= maxLength) {
    arr.shift()
  }
  arr.push(value)
}

async function get_metrics() {
  const token = localStorage.getItem('token')
  if (!token) return
  const result_metrics = await $fetch(`http://localhost:3001/api/nodes/metrics/${nodeId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  node_metrics.value = result_metrics

  pushLimitedArray(data_cpu.value, result_metrics.cpu_percent, 8)
  pushLimitedArray(data_memory.value, result_metrics.memory_percent, 8)
}

async function view_metrics() {
  get_metrics()
  setInterval(() => {
      get_metrics()
  }, 5000)
}

// Fonction pour créer une node
const updateInfos = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token manquant');
    return;
  }
  
  try {
    await $fetch('http://localhost:3001/api/nodes/update', {
    method: 'POST',
    headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: node_form.value
    });
    toast.add({
      title: 'Mise à jour',
      description: `La Node à bien été modifié`,
      color: 'success'
    })
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la node :', error);
    toast.add({
      title: 'Erreur',
      description: `La Node à bien n'a pas été modifié`,
      color: 'error'
    })
  }
}
</script>
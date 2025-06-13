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

                        <div class="stats">
                            <h2>Utilisation des ressources</h2>
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


// Variables
const route = useRoute()
const nodeId = route.params.nodeId as string
const node = ref([])
const node_metrics = ref([])
const data_cpu = ref([])
const data_memory= ref([])

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

    get_metrics()
    setInterval(() => {
        get_metrics()
    }, 5000)
    
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

  console.log('CPU data:', data_cpu.value)
  console.log('Memory data:', data_memory.value)
}
</script>
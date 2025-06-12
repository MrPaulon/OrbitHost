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
                                <StatsChart class="graphique" color="#6690ff" label="Utilisation CPU (%)" :data="[12, 12, 12, 14, 15]" />
                                <StatsChart class="graphique" color="#c07efe" label="Utilisation RAM (%)" :data="[60, 62, 58, 70, 68]" />
                                <PieChart
                                class="graphique"
                                :labels="['Disque disponible', 'Disque utilisé']"
                                :values="[70, 30]"
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
  // Récupération du token
  const token = localStorage.getItem('token')
  if (!token) return

  try {
    const [result] = await $fetch(`http://localhost:3001/api/nodes/get/${nodeId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    node.value = result
  } catch (error) {
    console.error('Erreur lors du chargement de la node :', error)
  }
})
</script>
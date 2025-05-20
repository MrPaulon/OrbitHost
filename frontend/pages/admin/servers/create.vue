<template>
  <div class="create dark">
    <div class="content"> 
      <h1>Créer un serveur</h1>
      <div class="card">
        <UStepper v-model="currentStep" :items="stepperitems" class="w-full my-3" style="gap: 0px;">
          <template #configuration>
            <UForm :state="form" @submit="createServer" style="width: 100%;">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="justify-items: center;">
                  <UFormField label="Node:">
                      <USelect icon="solar:slash-square-bold-duotone" size="xl" v-model="form.node" :items="itemsnode" label="Node" placeholder="Nom du noeud" />
                  </UFormField>
                  <UFormField label="Nom du serveur:" required>
                      <UInput icon="solar:server-2-bold-duotone" size="xl" v-model="form.name" label="Nom du serveur" placeholder="ex: Mon VPS personnel" />
                  </UFormField>
                  <UFormField label="Utilisateur:">
                      <USelectMenu icon="solar:user-circle-bold-duotone" size="xl" v-model="form.user" :items="itemsuser" label="Utilisateur" placeholder="ex: Mrpaulon" />
                  </UFormField>
                  <UFormField label="Adresse Ip:" required>
                      <UInput icon="solar:wi-fi-router-bold-duotone" size="xl" v-model="form.ip_address" label="Adresse IP" placeholder="ex: 192.168.0.1" />
                  </UFormField>
                  <UFormField label="Port:" required>
                      <UInput icon="solar:shield-network-bold-duotone" size="xl" v-model="form.port" type="number" label="Port" placeholder="22" />
                  </UFormField>
                  <UFormField label="Type de serveur:" required>
                      <USelect icon="solar:hashtag-square-bold-duotone" size="xl" v-model="form.type" :items="itemstype" placeholder="Sélectionner un type" />
                  </UFormField>
              </div>
              <div class="createbtn">
                  <UButton icon="solar:cloud-upload-bold-duotone" class="submit" size="xl" type="submit" color="primary">Créer le serveur</UButton>
              </div>
            </UForm>
          </template>

          <template #deployement>
            <div class="deployementsection">
              <p>Copie/colle la commande suivante sur le terminal de ton serveur pour terminer la configuration: </p>
              <div class="copysection">
                <pre class="command">{{ commandtocpy }}</pre>
                <UButton class="btncpy" @click="copyCommand()" icon="solar:copy-bold-duotone" variant="solid" color="neutral"/>
              </div>
              <UButton class="btnclose" icon="solar:check-square-bold-duotone" size="xl" variant="solid" to="../servers">Terminer</UButton>
            </div>
          </template>
        </UStepper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

// Style
import "~/assets/css/admin/servers/create.scss"

// Layout admin
definePageMeta({
  layout: 'admin'
})

// Variables
const itemsnode = ref(['Node 01'])
const itemstype = ref(['VPS', 'Docker'])
const itemsuser = ref([])
const toast = useToast()
const form = ref({
  node: 'Node 01',
  name: '',
  user: '',
  ip_address: '',
  port: 22,
  type: 'VPS'
})
const stepperitems = [
  {
    slot: 'configuration' as const,
    title: 'Configuration',
    icon: 'solar:lock-password-unlocked-bold-duotone'
  }, {
    slot: 'deployement' as const,
    title: 'Déploiement',
    icon: 'solar:rocket-bold-duotone'
  }
] satisfies StepperItem[]

const currentStep = ref(0)

var commandtocpy = '';

// Récupération liste des utilisateurs
onMounted(async () => {
  try {
    const token = localStorage.getItem('token')
    const users = await $fetch('http://localhost:3001/api/users/list', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    itemsuser.value = users.map(user => ({
      label: user.pseudo,
      value: user.id
    }))
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
    toast.add({
      title: 'Erreur',
      description: "Impossible de charger les utilisateurs",
      color: 'error'
    })
  }
})


// Fonction de création de serveur
async function createServer() {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token manquant.')

    if (!form.value.name || !form.value.ip_address || !form.value.user.value) {
      throw new Error('veuillez remplir tous les champs obligatoires.')
    }

    // Vérification des champs du form

    const response = await $fetch('http://localhost:3001/api/servers/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        name: form.value.name,
        ip_address: form.value.ip_address,
        ownerId: form.value.user.value
      }
    })

    commandtocpy = response.command;

    currentStep.value = 1

    console.log('Serveur créé :', response)
    toast.add({
      title: 'Serveur créé',
      description: `Le serveur: ${form.value.name} à été créé`,
      color: 'success'
    })
  } catch (error) {
    console.error('Erreur lors de la création du serveur :', error)
    toast.add({
      title: 'Erreur',
      description: `Problème à la création du serveur: ${error.message}`,
      color: 'error'
    })
  }
}

function copyCommand() {
  navigator.clipboard.writeText(commandtocpy);
  toast.add({
    title: 'Presse-papier',
    description: `La commande a été copié`,
    color: 'info'
  })
}

</script>
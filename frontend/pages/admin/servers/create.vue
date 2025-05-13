<template>
    <div class="create">
        <Navbar />
        <div class="content">
            <div class="card">
                <h1>Créer un serveur</h1>

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
            </div>
        </div>
    </div>
</template>

<script setup>
import { USelect } from "#components"
import "~/assets/css/admin/servers/create.scss"
const itemsnode = ref(['Node 01'])
const itemstype = ref(['VPS', 'Docker'])
const itemsuser = ref([])

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
      color: 'red'
    })
  }
})

const toast = useToast()

const form = ref({
  node: 'Node 01',
  name: '',
  user: '',
  ip_address: '',
  port: 22,
  type: 'VPS'
})

async function createServer() {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token manquant.')

    if (!form.value.name || !form.value.ip_address || !form.value.user.value) {
      throw new Error('Veuillez remplir tous les champs obligatoires.')
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


</script>
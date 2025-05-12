<template>
    <div class="create">
        <Navbar />
        <div class="content">
            <div class="card">
                <h1>Créer un serveur</h1>

                <UForm :state="form" @submit="submit" style="width: 100%;">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="justify-items: center;">
                        <UFormField label="Node:">
                            <USelect icon="solar:server-path-bold-duotone" size="xl" v-model="form.node" :items="itemsnode" label="Node" placeholder="Nom du noeud" />
                        </UFormField>
                        <UFormField label="Nom du serveur:" required>
                            <UInput icon="solar:server-2-bold-duotone" size="xl" v-model="form.name" label="Nom du serveur" placeholder="ex: Mon VPS personnel" />
                        </UFormField>
                        <UFormField label="Utilisateur:">
                            <UInput icon="solar:user-circle-bold" size="xl" v-model="form.username" label="Utilisateur" placeholder="ex: root" />
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
import "~/assets/css/admin/servers/create.scss"
const itemsnode = ref(['🇫🇷 Node 01'])
const itemstype = ref(['VPS', 'Docker'])

const form = ref({
  node: '🇫🇷 Node 01',
  name: '',
  username: '',
  ip_address: '',
  port: 22,
  type: 'VPS'
})

function submit() {
  console.log('Création du serveur avec les données :', form.value)
}
</script>
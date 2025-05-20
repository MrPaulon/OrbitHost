<template>
    <div class="create dark">
        <div class="content">
            <h1>Créer un emplacement</h1>
             <div class="card">
                <UForm :state="form" @submit="createLocation" style="width: 100%;">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="justify-items: center;">
                        <UFormField label="Nom:" required>
                            <UInput icon="solar:earth-bold-duotone" size="xl" v-model="form.name" type="text" label="Nom" placeholder="ex: France n°1" required />
                        </UFormField>
                        <UFormField label="Description:">
                            <UInput icon="solar:document-text-bold-duotone" size="xl" v-model="form.description" type="text" label="Description" placeholder="Datacenter Paris" />
                        </UFormField>
                    </div>
                    <div class="createbtn">
                        <UButton icon="solar:cloud-upload-bold-duotone" class="submit" size="xl" type="submit" color="primary">Créer l'emplacement</UButton>
                    </div>
                </UForm>
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
import "~/assets/css/admin/locations/create.scss"

// Variables
const toast = useToast()
const form = ref({
  name: '',
  description: '',
})


// Fonction de création d'emplacement
async function createLocation() {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token manquant.')

    if (!form.value.name) {
      throw new Error('veuillez remplir le champ obligatoire.')
    }
    // Fonction création location
    const response = await $fetch('http://localhost:3001/api/locations/create', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        name: form.value.name,
        ip_address: form.value.description
      }
    })

    console.log('Emplacement créé :', response)
    toast.add({
      title: 'Emplacement créé',
      description: `Le Emplacement: ${form.value.name} à été créé`,
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
<template>
    <div class="flex gap-2 items-center">
      <UButton
        v-for="l in langs"
        :key="l.code"
        :color="currentLang === l.code ? 'primary' : 'gray'"
        variant="solid"
        size="sm"
        @click="changeLang(l.code)"
      >
        {{ l.label }}
      </UButton>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { setLang, getLang } from '~/utils/lang'

const router = useRouter()

const langs = [
    { code: 'fr', label: '🇫🇷 Français' },
    { code: 'en', label: '🇬🇧 English' }
]

const currentLang = ref(getLang())

function changeLang(lang: 'fr' | 'en') {
    setLang(lang)
    currentLang.value = lang
    location.reload() // recharge la page pour recharger les bons textes
}
</script>
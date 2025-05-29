<template>
  <div style="position: fixed; z-index: 101; bottom: 10px; left: 10px;">
    <USelectMenu
      style="width: 80px;"
      v-model="currentLang"
      :items="langs"
      value-attribute="code"
      option-attribute="label"
      class="w-48"
      @update:modelValue="changeLang"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setLang, getLang } from '~/utils/lang'

const router = useRouter()

const langs = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' }
]

const currentLang = ref(getLang())

function changeLang(lang: 'fr' | 'en') {
  setLang(lang.code)
  currentLang.value = lang.code
  location.reload()
}
</script>
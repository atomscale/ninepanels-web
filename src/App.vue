<template>
  <div>
    <RouterView />


  </div>
  <div class="flex flex-col items-start fixed bottom-2 right-2 z-50 " v-if="mainStore.messages">
    <FlashMessage v-for="message in mainStore.messages" :key="message.message" :message="message.message"
      :error="message.error" />
  </div>


</template>

<script setup>
import FlashMessage from '@/components/FlashMessage.vue'
import { useMainStore } from '@/stores/mainStore.js'
import {useRouter} from 'vue-router'


import VueCookies from 'vue-cookies'


const mainStore = useMainStore()
const router = useRouter()

console.log("ninepanels running in env:", import.meta.env.VITE_NINEPANELS_ENV)


</script>
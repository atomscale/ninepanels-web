<template>
  <div>
    <LeftNav />


  </div>
  <div class="flex flex-col items-start fixed bottom-2 right-2 z-50 " v-if="Store.messages">
    <FlashMessage v-for="message in Store.messages" :key="message.message" :message="message.message"
      :error="message.error" />
  </div>


</template>

<script setup>
import FlashMessage from '@/components/FlashMessage.vue'
import { useStore } from '@/stores/Store.js'
import LeftNav from '@/components/LeftNav.vue'

const Store = useStore()

</script>
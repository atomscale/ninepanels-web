<template>

    <div>
      <LeftNav />
    </div>

  <div class="flex flex-col items-start fixed top-2 left-12 z-50" v-if="Store.messages">
    <FlashMessage v-for="message in Store.messages" :key="message.message" :message="message.message"
      :error="message.error" />
      <!-- <div class="bg-white mt-1 text-sm border-2 border-red-800 shadow-lg px-2 mx-2 rounded-lg text-gray-600">9P's server hosting platform is currently experiencing an outage (it's them, not us!). Last updated: 14:09 UK</div> -->
  </div>


</template>

<script setup>
import FlashMessage from '@/components/FlashMessage.vue'
import { useStore } from '@/stores/store.js'
import LeftNav from '@/components/LeftNav.vue'

const Store = useStore()


</script>

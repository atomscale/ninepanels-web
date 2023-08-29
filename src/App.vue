<template>


    <div>
      <LeftNav />


    </div>

  <div class="flex flex-col items-start fixed top-2 left-12 z-50" v-if="Store.messages">
    <FlashMessage v-for="message in Store.messages" :key="message.message" :message="message.message"
      :error="message.error" />
  </div>


</template>

<script setup>
import FlashMessage from '@/components/FlashMessage.vue'
import { useStore } from '@/stores/store.js'
import LeftNav from '@/components/LeftNav.vue'

const Store = useStore()



</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
</style>
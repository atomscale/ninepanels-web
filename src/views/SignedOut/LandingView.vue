<template>

  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <transition name="fade" appear>
        <CTA />
      </transition>
      </div>
    </div>
</template>

<script>
import CTA from '@/components/CTA.vue'
import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
    CTA,
  },
}

</script>

<style scoped>
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 3.5s ease;
}
</style>
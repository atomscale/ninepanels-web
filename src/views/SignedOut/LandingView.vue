<template>
  <div class="flex flex-col ">
    <div class="flex-grow">
      <transition name="fade" appear>
        <CTA />
      </transition>
    </div>
  </div>
</template>

<script>
import CTA from '@/components/landing/CTA.vue'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    CTA,
  },
}

</script>


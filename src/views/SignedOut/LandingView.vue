<template>
  <div class="h-full w-full flex flex-col overflow-y-auto">
    <div class="w-full">

        <Landing :class="Store.theme" />

    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import CTA from '@/components/landing/CTA.vue'
import Landing from '@/components/landing/Landing.vue'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    CTA,
    Landing
  },
}

</script>


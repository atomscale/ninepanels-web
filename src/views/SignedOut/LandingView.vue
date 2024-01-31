<template>
  <div class="h-full w-full flex flex-col align-middle items-center overflow-y-scroll overflow-x-hidden">
    <div class="w-full md:w-2/3">

        <Landing :class="Store.theme" />

    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import CTA from '@/components/landing/CTA.vue'
import Landing from '@/components/landing/Landing.vue'
import Landing2 from '@/components/landing/Landing2.vue'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    CTA,
    Landing,
    Landing2
  },
}

</script>


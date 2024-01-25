<template >
  <div class="flex flex-col justify-start  space-y-4 h-full text-sm text-np-base font-light mb-4">

    <div class="text-xl text-np-base font-bold">Latest release:</div>
    <div class="">Refreshed UI: surfacing your consistency </div>

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
  },
  components: {
  },
  data() {
    return {
    }
  }
}

</script>
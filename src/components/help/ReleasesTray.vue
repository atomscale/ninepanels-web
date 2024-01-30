<template >
  <div class="flex h-full flex-col mx-auto justify-between overflow-scroll">

<div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
  <div class="bg-np-base   sm:rounded-lg  mt-2">
    <div class="text-np-base pb-3 text-sm space-y-3 mx-4 font-light">
      <div class="text-2xl font-bold">Latest Features </div>
      <div class="text-xl font-semibold">
        Version 5.1: refresh UI and passwordless!
      </div>
      <div>

        Exciting stuff
      </div>



    </div>
  </div>
</div>
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
<template >
       <div class="flex items-center justify-center">
        <div>Pane OSrter</div>
        <PlusCircleIcon class="h-8 w-8 text-gray-400 " />

      </div>

  </template>

  <script>

  import { useStore } from '@/stores/store.js'
  import { mapStores } from 'pinia'
  import { PlusCircleIcon } from '@heroicons/vue/24/outline'

  export default {
    computed: {
      ...mapStores(useStore),

    },
    components: {
      PlusCircleIcon
    }

  }

  </script>
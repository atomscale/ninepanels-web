<template >
  <div  class="flex flex-col justify-between h-full">
    <div class="border">Welcome</div>
    <!-- <button @click="this.toggleDeleteResetBox()" class="flex w-full justify-between items-center mt-5 mb-4">
      <div class="data-heading">An area</div>
      <div>

        <ChevronLeftIcon v-if="!this.Store.user.deleteResetBoxIsOpen" class="h-5 w-5 text-gray-400"></ChevronLeftIcon>
        <ChevronDownIcon v-else class="h-5 w-5 text-gray-400"></ChevronDownIcon>
      </div>
    </button> -->



  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  PencilIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),

  },
  methods: {

  },
  components: {
    PencilIcon
  },


}

</script>
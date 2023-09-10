<template>
  <div class="pt-3  ">
    <div class="flex justify-between">

      <router-link @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false" :to="{ name: 'Landing' }"><img
          class="h-8 ml-5 w-auto" src="/android-chrome-512x512.png" alt="9P logo" />
      </router-link>
      <button @click="Store.reloadApp">

        <ArrowPathIcon class="h-5 w-5 text-gray-300 mr-4 mb-1" />
      </button>
    </div>
    <div class="m-2 mt-3 space-y-1" aria-labelledby="projects-headline">
      <router-link v-if="Store.user" @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false"
        :to="{ name: 'Panels' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <GlobeAltIcon class="h-6 w-6" /><span class="ml-3">Your panels</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  GlobeAltIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'


export default {
  computed: {
    ...mapStores(useStore),
  },
  components: {
    GlobeAltIcon,
    ArrowPathIcon,
  }
}

</script>
<template>
  <div class="pt-3  ">
    <div class="flex justify-between">

      <router-link @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false" :to="{ name: 'Landing' }"><img
          class="h-8 ml-5 w-auto" src="/9p-logo-empty-filled-sq.png" alt="the nine panels logo" />
      </router-link>

      <div>


        <button @click="Store.reloadApp">
          <ArrowPathIcon class="h-5 w-5 text-np-inverted mr-4 mb-0.5" />
        </button>
      </div>
    </div>
    <div class="m-2 mt-3 space-y-1" aria-labelledby="projects-headline">
      <router-link v-if="Store.user" @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false"
        :to="{ name: 'Panels' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <GlobeAltIcon class="h-6 w-6" /><span class="ml-3">My panels</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import HelpTray from '@/components/help/HelpTray.vue'

import {
  GlobeAltIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon
} from '@heroicons/vue/24/outline'


export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {

    openHelpTray() {
      this.Store.leftNavIsOpen = false
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'HelpTray'
      this.Store.primaryComponentProps = null
    },
  },
  components: {
    GlobeAltIcon,
    ArrowPathIcon,
    HelpTray,
    QuestionMarkCircleIcon
  }
}

</script>
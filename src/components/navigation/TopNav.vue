<template>
  <div class="flex flex-col items-center w-full">
    <div class="sticky top-0 pl-1 pt-1 z-40  w-full  " :class="isProd ? 'bg-gray-800' : 'bg-blue-700'">
      <div class="flex justify-between">
        <button type="button" aria-label="Open sidebar"
          class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none "
          @click="Store.leftNavIsOpen = true">
          <img loading="eager" class="h-8 ml-3 mb-1" src="/android-chrome-512x512.png" alt="9P logo" />
        </button>

        <div class="mt-2.5">
          <button v-if="!Store.isPWA && Store.isMobile" @click="openPWATray" type="button" aria-label="Open help"
            class="pb-1 pr-4 animate-install-bounce">
            <ArrowDownOnSquareIcon class="text-gray-300 h-5" />
          </button>
          <button v-if="Store.isPWA && Store.isMobile" @click="reloadApp" type="button" aria-label="Open help"
            class="pb-1 pr-4">
            <ArrowPathIcon class="h-5 w-5 text-gray-300" />
          </button>
          <button v-if="Store.user" @click="openHelpTray" type="button" aria-label="Open help" class="pb-1 pr-4">
            <QuestionMarkCircleIcon class="text-gray-300 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import HelpTray from '@/components/help/HelpTray.vue'
import InstallPWATray from '@/components/help/InstallPWATray.vue'

import {
  QuestionMarkCircleIcon,
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'


export default {
  computed: {
    ...mapStores(useStore),
    isProd() {
      return import.meta.env.VITE_NINEPANELS_ENV === "PRODUCTION"
    }
  },
  methods: {
    openHelpTray() {
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'HelpTray'
      this.Store.primaryComponentProps = null
    },
    openPWATray() {
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'InstallPWATray'
      this.Store.primaryComponentProps = null
    },
    reloadApp() {
      window.location.reload()
    },
  },
  components: {
    QuestionMarkCircleIcon,
    HelpTray,
    ArrowDownOnSquareIcon,
    ArrowPathIcon,
    InstallPWATray,
  }
}

</script>
<template>
  <div class="flex flex-col items-center w-full">
    <div class="sticky top-0 pl-1  z-40  w-full  bg-np-fill">
      <div class="flex justify-between items-center">
        <button type="button" aria-label="Open sidebar"
          class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-np-base hover:text-gray-900 focus:outline-none "
          @click="Store.leftNavIsOpen = true">
          <img loading="eager" class="h-8 ml-3 " src="/9p-logo-empty-filled-sq.png" alt="9P logo" />
        </button>

        <AnnouncementBar v-if="Store.canShow" />
        <div class=" flex ">
          <button v-if="!Store.isPWA && Store.isMobile" @click="openPWATray" type="button" aria-label="Open help"
            class=" pr-3 animate-install-bounce">
            <ArrowDownOnSquareIcon class="text-np-inverted h-5" />
          </button>
          <button v-if="Store.isPWA && Store.isMobile" @click="reloadApp" type="button" aria-label="Open help"
            class=" pr-3">
            <ArrowPathIcon class="h-5 w-5 text-np-inverted" />
          </button>
          <button v-if="Store.user" @click="openHelpTray" type="button" aria-label="Open help" class=" pr-4">
            <QuestionMarkCircleIcon class="text-np-inverted h-5" />
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
import AnnouncementBar from '@/components/utilities/AnnouncementBar.vue'

import {
  QuestionMarkCircleIcon,
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'


export default {
  computed: {
    ...mapStores(useStore),
    canShow() {
      return this.Store.canShow
    }
  },
  mounted() {
    if (localStorage.getItem('hiddenAnnoucementVersion') < this.Store.currentAnnouncementVersion) {
      this.Store.canShow = true
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
    AnnouncementBar
  }
}

</script>
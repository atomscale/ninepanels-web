<template>
  <div class="viewport-height" :class="Store.theme">
    <LeftTray :class="Store.theme" />
    <RightTray :class="Store.theme" class="z-50" />
    <div id="mainbody" class="h-full flex flex-col bg-np-base ">

      <div class="flex flex-col h-full justify-center items-center w-full ">
        <RouterView class="max-w-md w-full " />
      </div>
      <div v-if="Store.user" class="fixed w-12 " :class="Store.isPWA ? 'bottom-7 left-1' : 'bottom-1'">
        <button type="button" aria-label="Open sidebar"
          class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-np-base hover:text-gray-900 focus:outline-none "
          @click="Store.leftNavIsOpen = true">
          <Bars3Icon class=" text-np-base ml-4" :class="Store.isPWA ? 'h-9 w-9' : 'h-9 w-9'" />
        </button>
      </div>
    </div>

    <div class="flex flex-col items-start fixed bottom-2 right-2 z-50" v-if="Store.messages">
      <FlashMessage v-for="message in Store.messages" :key="message.message" :message="message.message"
        :error="message.error" />
      <!-- <div class="bg-np-base mt-1 text-sm border-2  border-red-800 shadow-lg w-1/3 px-2 mx-2 rounded-lg text-np-base">Outage message here. Last updated: 14:09 UK</div> -->
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import FlashMessage from '@/components/utilities/FlashMessage.vue'
import LeftTray from '@/components/navigation/LeftTray.vue'
import RightTray from '@/components/navigation/RightTray.vue'

import { Bars3Icon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
  },

  methods: {

  },
  mounted() {
    this.Store.readUserAction(),
    this.Store.readTheme()
    console.log('app reads theme:', this.Store.theme)
  },
  components: {
    FlashMessage,
    LeftTray,
    RightTray,
    Bars3Icon
  }
}


</script>

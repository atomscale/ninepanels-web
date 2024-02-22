<template>
  <div class="viewport-height" :class="mainStore.theme">
    <LeftTray :class="mainStore.theme" />
    <RightTray :class="mainStore.theme" class="z-40" />
    <div id="mainbody" class="h-full flex flex-col bg-np-base ">

      <div class="flex flex-col h-full justify-center items-center w-full ">
        <RouterView class=" w-full " />
      </div>
      <div v-if="mainStore.user" class="fixed w-12 " :class="mainStore.isPWA ? 'bottom-7 left-1' : 'bottom-1'">
        <button type="button" aria-label="Open sidebar"
          class="-ml-0.5 -mt-0.5 flex h-12 items-center   justify-center rounded-md text-np-base hover:text-gray-900 focus:outline-none "
          @click="mainStore.leftNavIsOpen = true">
          <Bars3Icon class=" text-np-base ml-4" :class="mainStore.isPWA ? 'h-9 w-9' : 'h-9 w-9'" />
        </button>
      </div>
    </div>

    <div class="flex flex-col items-start fixed bottom-2 right-2 z-50" v-if="mainStore.messages">
      <FlashMessage v-for="message in mainStore.messages" :key="message.message" :message="message.message"
        :error="message.error" />
      <!-- <div class="bg-np-base mt-1 text-sm border-2  border-red-800 shadow-lg w-1/3 px-2 mx-2 rounded-lg text-np-base">Currently investigating an outage. last update 0710</div> -->
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import FlashMessage from '@/components/general/FlashMessage.vue'
import LeftTray from '@/components/navigation/LeftTray.vue'
import RightTray from '@/components/navigation/RightTray.vue'

import { Bars3Icon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useMainStore),
  },

  methods: {

  },
  mounted() {
    this.mainStore.readUserAction(),
    this.mainStore.readTheme()
  },
  components: {
    FlashMessage,
    LeftTray,
    RightTray,
    Bars3Icon
  }
}


</script>

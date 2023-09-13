<template>
  <div class="viewport-height" :class="Store.theme">
    <LeftNav :class="Store.user ? Store.theme : null" />
    <PrimaryTray :class="Store.user ? Store.theme : null" />
    <div id="mainbody" class="h-full flex flex-col bg-np-base" >
      <TopNav />
      <div class="flex flex-col h-full justify-center items-center w-full">
        <RouterView class="max-w-md w-full"/>
      </div>
    </div>

    <div class="flex flex-col items-start fixed top-2 left-12 z-50" v-if="Store.messages">
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
import LeftNav from '@/components/navigation/LeftNav.vue'
import TopNav from '@/components/navigation/TopNav.vue'
import PrimaryTray from '@/components/navigation/PrimaryTray.vue'

import NProgress from 'nprogress'

export default {
  computed: {
    ...mapStores(useStore),
  },
  watch: {
    'Store.loadingBar'(newVal) {
      if (newVal) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    },
  },
  mounted() {
    this.Store.readUserAction(),
    this.Store.readTheme()
  },
  components: {
    FlashMessage,
    LeftNav,
    TopNav,
    PrimaryTray
  }
}


</script>

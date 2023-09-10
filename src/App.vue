<template>
  <div class="viewport-height">
    <LeftNav />
    <PrimaryTray />
    <div id="mainbody" class="h-full flex flex-col">
      <TopNav />
      <div class="flex flex-col h-full border justify-center items-center w-full">
        <RouterView class="max-w-md w-full"/>
      </div>
    </div>

    <div class="flex flex-col items-start fixed top-2 left-12 z-50" v-if="Store.messages">
      <FlashMessage v-for="message in Store.messages" :key="message.message" :message="message.message"
        :error="message.error" />
      <!-- <div class="bg-white mt-1 text-sm border-2 border-red-800 shadow-lg px-2 mx-2 rounded-lg text-gray-600">9P's server hosting platform is currently experiencing an outage (it's them, not us!). Last updated: 14:09 UK</div> -->
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import FlashMessage from '@/components/FlashMessage.vue'
import LeftNav from '@/components/navigation/LeftNav.vue'
import TopNav from '@/components/navigation/TopNav.vue'
import PrimaryTray from '@/components/PrimaryTray.vue'

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
    this.Store.getUserAction()
  },
  components: {
    FlashMessage,
    LeftNav,
    TopNav,
    PrimaryTray
  }
}


</script>

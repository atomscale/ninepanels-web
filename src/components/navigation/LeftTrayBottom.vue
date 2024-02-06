<template>
  <div class="" :class="{ 'mb-4': mainStore.isPWA }">
    <div class="m-2 space-y-1" aria-labelledby="projects-headline">
      <router-link v-if="mainStore.user && mainStore.user.is_admin"
        @click="mainStore.leftNavIsOpen = false; mainStore.shareBoxIsOpen = false" :to="{ name: 'Admin' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <BoltIcon class="h-6 w-6" /><span class="ml-3">Admin</span>
      </router-link>
      <button @click="shareApp"
        class="group flex w-full items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <ShareIcon class="h-6 w-6" /><span class="ml-3">Share</span>
      </button>
      <ShareBox v-if="mainStore.shareBoxIsOpen">
      </ShareBox>
      <button @click="mainStore.openRightTray('HowToGuide')"
        class="group flex w-full items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <QuestionMarkCircleIcon class="h-6 w-6" /><span class="ml-3">Guide</span>
      </button>
      <router-link v-if="mainStore.user" @click="this.mainStore.leftNavIsOpen = false; mainStore.shareBoxIsOpen = false"
        :to="{ name: 'Settings' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <CogIcon class="h-6 w-6" /><span class="ml-3">Settings</span>
      </router-link>
      <router-link v-if="mainStore.user" @click="signOut()" :to="{ name: 'Landing' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <ArrowLeftEndOnRectangleIcon class="h-6 w-6" /><span class="ml-3">Sign Out</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { signOutAllStores } from '@/utils/utils.js'

import ShareBox from '@/components/general/ShareBox.vue'

import {
  CogIcon,
  UserPlusIcon,
  UserCircleIcon,
  QuestionMarkCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  ShareIcon,
  BoltIcon
} from '@heroicons/vue/24/outline'


export default {

  computed: {
    ...mapStores(useMainStore),
  },
  methods: {

    async shareApp() {
      if (navigator.share) {
        try {

          await navigator.share({
            title: 'Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life.',
            text: 'Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life.',
            url: "https://ninepanels.com",
          })
          if (this.mainStore.user) {
            rollbar.info(`app: shared using WebShare by ${this.mainStore.user.name}`)
          } else {
            rollbar.info(`app: shared using WebShare API by a logged out visitor or this.mainStore.user unavailbale`)
          }

        } catch (error) {
          // console.log(`web share error`)
        }
      } else {
        this.toggleShareBox()
      }
    },
    async signOut() {
      await signOutAllStores()
      this.mainStore.showMessage('Signed out.')
    },
    toggleShareBox() {
      this.mainStore.shareBoxIsOpen = !this.mainStore.shareBoxIsOpen
    },


  },
  components: {
    CogIcon,
    QuestionMarkCircleIcon,
    ArrowLeftEndOnRectangleIcon,
    UserPlusIcon,
    ShareIcon,
    ShareBox,
    UserCircleIcon,
    BoltIcon
  }
}

</script>
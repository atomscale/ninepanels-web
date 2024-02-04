<template>
  <div class="" :class="{ 'mb-4': Store.isPWA }">
    <div class="m-2 space-y-1" aria-labelledby="projects-headline">
      <router-link v-if="Store.user && Store.user.is_admin"
        @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false" :to="{ name: 'Admin' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <BoltIcon class="h-6 w-6" /><span class="ml-3">Admin</span>
      </router-link>
      <button @click="shareApp"
        class="group flex w-full items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <ShareIcon class="h-6 w-6" /><span class="ml-3">Share</span>
      </button>
      <ShareBox v-if="Store.shareBoxIsOpen">
      </ShareBox>
      <button @click="Store.openRightTray('HowToGuide')"
        class="group flex w-full items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <QuestionMarkCircleIcon class="h-6 w-6" /><span class="ml-3">Guide</span>
      </button>
      <router-link v-if="Store.user" @click="this.Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false"
        :to="{ name: 'Settings' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <CogIcon class="h-6 w-6" /><span class="ml-3">Settings</span>
      </router-link>
      <router-link v-if="Store.user" @click="signOut()" :to="{ name: 'Landing' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-np-inverted  hover:bg-np-accent hover:text-white">
        <ArrowLeftOnRectangleIcon class="h-6 w-6" /><span class="ml-3">Sign Out</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import ShareBox from '@/components/general/ShareBox.vue'

import {
  CogIcon,
  UserPlusIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon,
  ShareIcon,
  BoltIcon
} from '@heroicons/vue/24/outline'


export default {

  computed: {
    ...mapStores(useStore),
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
          if (this.Store.user) {
            rollbar.info(`app: shared using WebShare by ${this.Store.user.name}`)
          } else {
            rollbar.info(`app: shared using WebShare API by a logged out visitor or this.Store.user unavailbale`)
          }

        } catch (error) {
          // console.log(`web share error`)
        }
      } else {
        this.toggleShareBox()
      }
    },
    signOut() {
      this.Store.signUserOutAction()
      this.Store.showMessage('Signed out.')
    },
    toggleShareBox() {
      this.Store.shareBoxIsOpen = !this.Store.shareBoxIsOpen
    },


  },
  components: {
    CogIcon,
    ArrowLeftOnRectangleIcon,
    QuestionMarkCircleIcon,
    UserPlusIcon,
    ShareIcon,
    ShareBox,
    UserCircleIcon,
    BoltIcon
  }
}

</script>
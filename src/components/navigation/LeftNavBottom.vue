<template>
  <div class="" :class="{ 'mb-4': Store.isPWA }">
    <div class="m-2 space-y-1" aria-labelledby="projects-headline">

      <button @click="shareApp"
        class="group flex w-full items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <ShareIcon class="h-6 w-6" /><span class="ml-3">Share</span>
      </button>
      <ShareBox v-if="Store.shareBoxIsOpen">
      </ShareBox>
      <router-link @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false" :to="{ name: 'About' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <QuestionMarkCircleIcon class="h-6 w-6" /><span class="ml-3">About</span>
      </router-link>
      <router-link v-if="Store.user" @click="this.Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false"
        :to="{ name: 'Account' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <UserCircleIcon class="h-6 w-6" /><span class="ml-3">Account</span>
      </router-link>
      <router-link v-if="Store.user" @click="signUserOut" :to="{ name: 'Landing' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <ArrowLeftOnRectangleIcon class="h-6 w-6" /><span class="ml-3">Sign Out</span>
      </router-link>
      <router-link v-if="!Store.user" @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false"
        :to="{ name: 'SignIn' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <UserCircleIcon class="h-6 w-6" /><span class="ml-3">Sign In</span>
      </router-link>
      <router-link v-if="!Store.user" @click="Store.leftNavIsOpen = false; Store.shareBoxIsOpen = false"
        :to="{ name: 'SignUp' }"
        class="group flex items-center text-sm rounded-md px-3 py-2 font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        <UserPlusIcon class="h-6 w-6" /><span class="ml-3">Sign Up</span>
      </router-link>

    </div>
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import ShareBox from '@/components/navigation/ShareBox.vue'

import {
  UserCircleIcon,
  UserPlusIcon,
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon,
  ShareIcon,

} from '@heroicons/vue/24/outline'


export default {

  computed: {
    ...mapStores(useStore),
  },
  methods: {
    signUserOut() {
      this.Store.signUserOutAction()
      this.Store.leftNavIsOpen = false; this.Store.shareBoxIsOpen = false
      this.Store.$reset()
      this.$router.push({ name: "Landing" })
    },

    async shareApp() {
      if (navigator.share) {
        try {

          await navigator.share({
            title: 'Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life.',
            text: 'Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life.',
            url: "https://ninepanels.com",
          })
          if (this.Store.user) {
            rollbar.info("shared using WebShare by " + this.Store.user.name)
          } else {
            rollbar.info("shared using WebShare API by a logged out visitor or this.Store.user unavailbale")
          }

        } catch (error) {
          console.log(error)
        }
      } else {
        this.toggleShareBox()
      }
    },
    toggleShareBox() {
      this.Store.shareBoxIsOpen = !this.Store.shareBoxIsOpen
    },


  },
  components: {
    UserCircleIcon,
    ArrowLeftOnRectangleIcon,
    QuestionMarkCircleIcon,
    UserPlusIcon,
    ShareIcon,
    ShareBox,

  }
}

</script>
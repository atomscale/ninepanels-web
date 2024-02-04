<template>
  <div class="flex px-4 flex-col w-full sm:w-2/3 md:w-2/3 lg:w-1/3 justify-between h-full ">

    <div>
      <!-- <div class=" border-b border-np-base"></div> -->
      <button @click="toggleAccountBox()" class="flex w-full justify-between items-center mb-5 ">
        <div class="text-sm sm:text-sm font-semibold h-5 text-np-base mt-4">Your Account</div>
        <div>

          <ChevronLeftIcon v-if="!accountBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
        </div>
      </button>
      <div>
        <Account class="m-2 mt-4 mb-5" v-if="accountBoxIsOpen" />
      </div>
      <!-- <div class=" border-b border-np-base  "></div> -->


      <button @click="togglePrefsBox()" class="flex w-full justify-between items-center mb-5">
        <div class="text-sm sm:text-sm font-semibold h-5 text-np-base mt-4">Preferences</div>
        <div>
          <ChevronLeftIcon v-if="!prefsBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
        </div>
      </button>
      <div>
        <Preferences class="m-2 mt-4 mb-5" v-if="prefsBoxIsOpen" />
      </div>
      <!-- <div class=" border-b border-np-base "></div> -->


      <!-- <div class=" border-b border-np-base  "></div> -->

      <button @click="toggleAppInfoBox()" class="flex w-full justify-between items-center mb-5 ">
        <div class="text-sm sm:text-sm font-semibold h-5 text-np-base mt-4">App Info</div>
        <div>

          <ChevronLeftIcon v-if="!appInfoBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
        </div>
      </button>
      <div>
        <AppInfo class="m-2 mt-4 mb-5" v-if="appInfoBoxIsOpen" />
      </div>

      <button @click="togglePolicyBox()" class="flex w-full justify-between items-center mb-5 ">
        <div class="text-sm sm:text-sm font-semibold h-5 text-np-base mt-4">Policies</div>
        <div>

          <ChevronLeftIcon v-if="!policyBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
        </div>
      </button>
      <div>
        <Policies class="m-2 mt-4 mb-5" v-if="policyBoxIsOpen" />
      </div>



      <!-- <div class=" border-b border-np-base"></div> -->
      <button @click="toggleDangerBox()" class="flex w-full justify-between items-center mb-4 ">
        <div class="text-sm sm:text-sm font-semibold h-5 text-np-base mt-4">Danger Zone</div>
        <div>
          <ChevronLeftIcon v-if="!dangerBoxIsOpen" class="h-5 w-5 text-np-base mt-4"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-base mt-4"></ChevronDownIcon>
        </div>
      </button>


      <div class="flex flex-col justify-between items-center" :class="Store.isPWA ? 'mb-16' : 'mb-6'">
        <!-- <DynamicButton v-if="dangerBoxIsOpen" class="w-4/5 mb-3" :parentMethod="sendUserDelete" :confirmRequired="true" :buttonText="'Reset All Panels'"
          :confirmText="'Are you sure?'" />
          <DynamicButton v-if="dangerBoxIsOpen" class="w-4/5 mb-3" :parentMethod="sendUserDelete" :confirmRequired="true" :buttonText="'Delete All Panels'"
          :confirmText="'Are you sure?'" /> -->
        <DynamicButton v-if="dangerBoxIsOpen" class="w-full mt-4" :class="Store.isPWA ? 'mb-14' : 'mb-6'" :parentMethod="sendUserDelete" :confirmRequired="true"
          :buttonText="'Delete Your Account'" :confirmText="'Are you sure?'" />
      </div>

    </div>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import DynamicButton from '@/components/utilities/DynamicButton.vue'
import Account from '@/components/settings/Account.vue'
import Policies from '@/components/settings/Policies.vue'
import Preferences from '@/components/settings/Preferences.vue'
import AppInfo from '@/components/settings/AppInfo.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore)
  },
  methods: {
    togglePrefsBox() {
      this.prefsBoxIsOpen = !this.prefsBoxIsOpen
    },
    toggleAccountBox() {
      this.accountBoxIsOpen = !this.accountBoxIsOpen
    },
    togglePolicyBox() {
      this.policyBoxIsOpen = !this.policyBoxIsOpen
    },
    toggleAppInfoBox() {
      this.appInfoBoxIsOpen = !this.appInfoBoxIsOpen
    },
    toggleDangerBox() {
      this.dangerBoxIsOpen = !this.dangerBoxIsOpen
    },
    async sendUserDelete() {
      await this.Store.deleteUserAction()
      this.$router.push('/')
    },
  },
  components: {
    DynamicButton,
    ChevronDownIcon,
    ChevronLeftIcon,
    Account,
    Policies,
    Preferences,
    AppInfo
  },
  data() {
    return {
      accountBoxIsOpen: false,
      prefsBoxIsOpen: false,
      policyBoxIsOpen: false,
      appInfoBoxIsOpen: false,
      dangerBoxIsOpen: false,

    }
  }
}
</script>


<template>
  <div class="flex px-4 flex-col  justify-start h-full space-y-2 mt-5">


    <div class=" border-b border-np-base "></div>


    <button @click="togglePrefsBox()" class="flex w-full justify-between items-center ">
      <div class="sm:text-sm text-base font-semibold h-5 text-np-light mt-2">Preferences</div>
      <div>

        <ChevronLeftIcon v-if="!prefsBoxIsOpen" class="h-5 w-5 text-np-light mt-2"></ChevronLeftIcon>
        <ChevronDownIcon v-else class="h-5 w-5 text-np-light mt-2"></ChevronDownIcon>
      </div>
    </button>

    <div>
      <Preferences class="m-2" v-if="prefsBoxIsOpen" />
    </div>


    <div class=" border-b border-np-base "></div>


    <button @click="toggleAccountBox()" class="flex w-full justify-between items-center ">
      <div class="text-sm font-semibold h-5 text-np-light mt-2">Your Account</div>
      <div>

        <ChevronLeftIcon v-if="!accountBoxIsOpen" class="h-5 w-5 text-np-light mt-2"></ChevronLeftIcon>
        <ChevronDownIcon v-else class="h-5 w-5 text-np-light mt-2"></ChevronDownIcon>
      </div>
    </button>

    <div>
      <Account class="m-2" v-if="accountBoxIsOpen" />
    </div>


    <div class=" border-b border-np-base  "></div>


  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import DynamicButton from '@/components/utilities/DynamicButton.vue'
import Account from '@/components/settings/Account.vue'
import Preferences from '@/components/settings/Preferences.vue'
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
  },
  components: {
    DynamicButton,
    ChevronDownIcon,
    ChevronLeftIcon,
    Account,
    Preferences
  },
  data() {
    return {
      prefsBoxIsOpen: true,
      accountBoxIsOpen: false,
    }
  }
}
</script>


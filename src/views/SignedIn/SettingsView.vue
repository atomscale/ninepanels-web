<template>
  <div class="flex flex-col  justify-start h-full space-y-2 mt-5">
    <button @click="toggleAccountBox()" class="flex w-full justify-between items-center">
      <div :style="{ 'font-variant': 'small-caps' }" class="data-heading">Your Account</div>
      <div>

        <ChevronLeftIcon v-if="!accountBoxIsOpen" class="h-5 w-5 text-np-light"></ChevronLeftIcon>
        <ChevronDownIcon v-else class="h-5 w-5 text-np-light"></ChevronDownIcon>
      </div>
    </button>

    <div>
      <Account class="mb-4 mt-4" v-if="accountBoxIsOpen" />
    </div>

    <button @click="togglePrefsBox()" class="flex w-full justify-between items-center">
      <div :style="{ 'font-variant': 'small-caps' }" class="data-heading">Preferences</div>
      <div>

        <ChevronLeftIcon v-if="!prefsBoxIsOpen" class="h-5 w-5 text-np-light"></ChevronLeftIcon>
        <ChevronDownIcon v-else class="h-5 w-5 text-np-light"></ChevronDownIcon>
      </div>
    </button>

    <div>
      <Preferences class="mb-4 mt-4" v-if="prefsBoxIsOpen" />
    </div>

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
    toggleAccountBox() {
      this.accountBoxIsOpen = !this.accountBoxIsOpen
    },
    togglePrefsBox() {
      this.prefsBoxIsOpen = !this.prefsBoxIsOpen
    }
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
      accountBoxIsOpen: true,
      prefsBoxIsOpen: true
    }
  }
}
</script>


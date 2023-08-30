<template >
  <div class="flex justify-evenly text-gray-200 pt-3 pb-3 text-sm">
    <button class="flex w-1/2 justify-center h-full " @click="whatsApp()" >
      <img class="h-7" src="@/assets/icons8-whatsapp-50.png" alt="9P logo" />
    </button>
    <button class="flex justify-center w-1/2  h-full " @click="email()" >
      <EnvelopeIcon class="h-7 text-gray-300"></EnvelopeIcon>
    </button>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { EnvelopeIcon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
  },
  components: {
    EnvelopeIcon
  },
  methods: {
    whatsApp() {
      const msg = encodeURIComponent("A consistent, balanced life with Nine Panels. [https://ninepanels.com]")
      window.location.href = `whatsapp://send?text=${msg}`
    },
    email() {
      const subject = encodeURIComponent("A consistent, balanced life with Nine Panels. [https://ninepanels.com]");
      const body = encodeURIComponent("Hey, I found this and thought you might enjoy it. [https://ninepanels.com]");
      window.location.href = `mailto:?subject=${subject}&body=${body}`
    }
  }
}

</script>
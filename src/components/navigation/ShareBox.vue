<template >
  <div class="flex justify-evenly text-np-inverted pt-3 pb-3 text-sm">
    <button class="flex w-1/2 justify-center h-full " @click="whatsApp()" aria-label="Whatsapp sharing button" >
      <img loading="eager" class="h-7" src="@/assets/icons8-whatsapp-50.png" alt="Whatsapp logo" />
    </button>
    <button class="flex justify-center w-1/2  h-full " @click="email()" aria-label="Email sharing button">
      <EnvelopeIcon class="h-7 text-np-inverted"></EnvelopeIcon>
    </button>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import rollbar from '@/rollbarClient.js'
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
      const msg = encodeURIComponent("Daily balance, long-term consistency.\nNine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life. [https://ninepanels.com]")
      window.location.href = `whatsapp://send?text=${msg}`
      if (this.Store.user) {

        rollbar.info(`app: shared to whatsapp not using WebShare by ${this.Store.user.name}`)
      } else {
        rollbar.info(`app: shared to whatsapp not using WebShare by a logged out visitor`)
      }
    },
    email() {
      const subject = encodeURIComponent("Daily balance, long-term consistency.");
      const body = encodeURIComponent("Nine Panels brings visibility to your daily consistency, nurturing awareness and connection to the most important areas of your life. [https://ninepanels.com]");
      window.location.href = `mailto:?subject=${subject}&body=${body}`
      if (this.Store.user) {
        rollbar.info(`app: shared to email not using WebShare by ${this.Store.user.name}`)

      } else {
        rollbar.info(`app: shared to whatsapp not using WebShare by a logged out visitor`)
      }
    }
  }
}

</script>
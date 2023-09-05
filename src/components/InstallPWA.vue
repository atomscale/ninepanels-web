<template >
  <div class="flex flex-col justify-start  space-y-4 h-full text-sm text-gray-500 font-light">

    <div class="text-xl text-gray-600 font-bold mb-4">Install Nine Panels as an app:</div>

    <div class="flex flex-col justify-between items-center">
      <img src="@/assets/example_install.jpg" class="h-48 border border-gray-400 rounded-xl mb-4" />
    </div>
    <div class="text-gray-500 text-">FYI: You'll need to sign in again, just like you would if you installed the app via your App or
      Play Store.</div>
    <div class="text-lg text-gray-600 font-bold">Chrome:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center">
      <img src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl" />
    </div>

    <div class="text-lg text-gray-600 font-bold">Safari:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center">
      <img src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl" />
    </div>

    <div class="text-lg text-gray-600 font-bold">Firefox:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center mb-6">
      <img src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl" />
    </div>



  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
  },
  components: {
  },
  data() {
    return {
    }
  }
}

</script>
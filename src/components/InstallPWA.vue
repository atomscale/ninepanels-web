<template >
  <div class="flex flex-col justify-start  space-y-4 h-full text-sm text-gray-500 font-light mb-4">

    <div class="text-xl text-gray-600 font-bold">You can install Nine Panels as an app on your phone!</div>
    <div class="text-gray-500">This way it will be easier to find at update your panels. And, in the future, will allow notifications and reminders.</div>
    <div class="text-lg text-gray-600 font-bold">Chrome:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center">
      <img src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4"  />
      <img src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl"  />
    </div>

    <div class="text-lg text-gray-600 font-bold">Safari:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center">
      <img src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4"  />
      <img src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl"  />
    </div>

    <div class="text-lg text-gray-600 font-bold">Firefox:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center mb-6">
      <img src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4"  />
      <img src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl"  />
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
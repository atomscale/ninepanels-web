<template >
  <div class="text-xl text-np-base font-bold mb-4">Install Nine Panels as an app!</div>
  <div class="flex flex-col justify-start  space-y-3 h-full text-sm text-np-base font-light">

    <div class="text-np-base ">Easier to find. App-like experience. Android and iOS.</div>
    <div class="flex flex-col justify-between items-center">
      <div class="flex flex-col mb-2">

        <img loading="eager" alt="screenshot of nine panels PWA installed on iOS" src="@/assets/ios_installed.jpg" class="h-32 border border-gray-400 rounded-xl mt-2" />
        <div class="text-xs text-gray-400">Apple iOS</div>
      </div>
      <div class="flex flex-col mb-2">

        <img loading="eager" alt="screenshot of nine panels installed on Android" src="@/assets/android_installed.png" class="h-32  border border-gray-400 rounded-xl mt-2" />
        <div class="text-xs text-gray-400">Android</div>

      </div>
    </div>
    <div class="text-np-base">FYI: You'll maybe need to sign in again, just like you might if you installed the app via your
      App or
      Play Store.</div>
    <div class="text-lg text-np-base font-bold">Chrome on Android:</div>
    <div class="">Tap the ellipis top-right, find the 'Install app' button. Install the app. *Requires latest Chrome (v115
      +) and Android 13</div>
    <div class="flex flex-col justify-between items-center">
      <img loading="eager" alt="screenshot of open Chrome menu showing the 'Install app' option to choose." src="@/assets/android_chrome_1.png" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img loading="eager" alt="screenshot of open Chrome menu showing the 'Install app' option to choose." src="@/assets/android_chrome_2.png" class="h-36 border border-gray-400 rounded-xl" />
    </div>
    <div class="text-lg text-np-base font-bold">Chrome on iOS:</div>
    <div class="">Tap share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center">
      <img loading="eager" alt="screenshot of open Chrome menu showing the 'Install app' option to choose." src="@/assets/chrome_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img loading="eager" alt="screenshot of open Chrome menu showing the 'Install app' option to choose." src="@/assets/chrome_2.jpg" class="h-36 border border-gray-400 rounded-xl" />
    </div>


    <div class="text-lg text-np-base font-bold">Safari on iOS:</div>
    <div class="">Tap share on bottom menu, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center">
      <img loading="eager" alt="screenshot of open Safari menu showing the 'Install app' option to choose." src="@/assets/safari_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img loading="eager" alt="screenshot of open Safari menu showing the 'Install app' option to choose." src="@/assets/safari_2.jpg" class="h-36 border border-gray-400 rounded-xl" />
    </div>

    <div class="text-lg text-np-base font-bold">Firefox on iOS:</div>
    <div class="">Tap menu bottom left, tap Share, find the 'Add to Home Screen' button. Add the app.</div>
    <div class="flex flex-col justify-between items-center mb-6">
      <img loading="eager" alt="screenshot of open Firefox menu showing the 'Install app' option to choose." src="@/assets/firefox_1.jpg" class="h-36 border border-gray-400 rounded-xl mb-4" />
      <img loading="eager" alt="screenshot of open Firefox menu showing the 'Install app' option to choose." src="@/assets/firefox_2.jpg" class="h-36 border border-gray-400 rounded-xl" />
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
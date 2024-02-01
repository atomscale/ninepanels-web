<template >
  <div class="flex flex-col justify-start  space-y-4 h-full text-sm text-np-base font-light">
    <div class="text-2xl font-bold">Welcome to Ninepanels 👋 </div>
    <div>A quick how-to might be in order...?</div>
    <video class="w-56 mx-auto rounded-xl border border-np-matchbgfill" src="@/assets/v5/demo.mp4" type="video/mp4" autoplay muted
      loop playsinline></video>
    <div class="text-xl text-np-base font-bold ">1. Establish your daily balance:</div>
    <div class="">Create panels for important areas of your life. </div>
    <div class="">You decide what a panel means to you. Most people pick areas 'above' the level of to-do lists and 'getting things done'.
      Perhaps think "life-level" and "meaningful engagement" not "frenetic activity" and "completion".</div>
    <div class="">A good question to ask yourself is: "What makes a great day for me?" </div>
    <div class="font-bold">But it's up to you.</div>
    <div class="text-xl text-np-base font-bold">2. Tap:</div>
    <div class="">Simply tap the panel to see your recent consitency.</div>
    <div class="">Tap the panel again to complete or uncomplete it. </div>
    <div class="">Don't worry if you miss a day, this is about the long-term. </div>

    <div class="">You decide when a panel should be 'complete' (and what that means).</div>
    <div class="text-xl text-np-base font-bold">3. Observe your patterns:</div>
    <div class="">This is where perception meets reality.  </div>

    <div class="">

      Filter timeframes or tap infinity ∞ to see everything.
    </div>
    <div class="">Vertical patterns can be as illuminating as horizontal.  </div>
    <div class="pb-10 font-extrabold">Good luck.  </div>

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
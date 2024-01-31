<template >
  <div class="flex flex-col justify-start  space-y-4 h-full text-sm text-np-base font-light">
    <div class="text-2xl font-bold">Welcome to NinePanels </div>
    <div class="text-xl font-semibold">
            Let's get you on your way to long term consistency
          </div>
    <div class="text-xl text-np-base font-bold">Establish daily balance:</div>
    <div class="">Create panels for important areas of your life. Simply tap the panel when done.</div>
    <video class="h-80" src="@/assets/help_tray_demo.mp4" type="video/mp4" autoplay muted loop playsinline></video>



    <div class="text-xl text-np-base font-bold">See long-term consistency:</div>
    <div class="">Tap the consistency grid to toggle between simple colour indicators, days completed / total days, or %</div>
    <video src="@/assets/consistency_grid_demo.mp4" type="video/mp4" autoplay muted loop playsinline></video>
    <div class=" font-semibold">Panel Order - tap the new location</div>
    <video class="h-80" src="@/assets/panel_ordering_slower.mp4" type="video/mp4" autoplay muted loop playsinline></video>
    <div class=" font-semibold">Resetting a panel's history</div>
    <div class="mb-4">You can reset the panels history or delete the panel in the <span class="italic">danger
        zone:</span></div>

    <video class="h-80" src="@/assets/reset_panel.mp4" type="video/mp4" autoplay muted loop playsinline></video>
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
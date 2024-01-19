<template >


  <!-- <div class="grid grid-cols-3 gap-1 w-5/12 sm:w-2/5  mx-auto mt-1">
    <div v-for="i in 9" :key="i" class="rounded-lg">
      <div class="aspect-content">
        <button @click="panelTap(i)" :class="panelStyle(i)" class="flex items-center justify-center rounded-lg ">
        </button>
      </div>
    </div>
  </div> -->
  <div class="flex flex-col justify-start  h-full  relative">


    <div class="flex justify-start items-start  mb-2 ">
      <button type="button" class="w-10 rounded-md  text-np-base hover:text-np-base" @click="this.returnToPanelTray()">
        <span class="sr-only">Return to panel</span>
        <ChevronLeftIcon class="h-6 w-6 text-np-base " aria-hidden="true" />
      </button>

      <div class="text-np-base w-full h-14 text-center">
        {{ Store.consistency.find(panel_consist =>
          panel_consist.panel_id === panel_id).title }}
      </div>
      <div class="w-10"></div>
    </div>



    <DailyPattern class="relative  overflow-scroll" :panelId="this.panel_id" :onHome="false"/>


  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'

import DailyPattern from '@/components/visgrid/DailyPattern.vue'

export default {
  computed: {
    ...mapStores(useStore),

  },
  methods: {
    // panelStyle(i) {
    //   if (this.Store.consistency[i - 1]) {
    //     const shade = this.panelShading(i)
    //     const format = 'border border-gray-300 '
    //     if (this.Store.consistency[i - 1].panel_id === this.panel_id) {
    //       if (this.Store.theme === 'night') {
    //         return format + ' ' + shade + ' ' + 'border-4 border-white scale-110'
    //       } else {
    //         return format + ' ' + shade + ' ' + 'border-4 border-np-matchbgfill scale-110'
    //       }
    //     } else {

    //       return format + ' ' + shade + ' ' + 'opacity-90'
    //     }
    //   } else {
    //     return 'border border-dashed border-gray-300'
    //   }
    // },
    // panelShading(i) {
    //   const consistency_value = this.Store.consistency[i - 1].consistency
    //   for (let ind = 0; ind < this.shading.length; ind++) {
    //     if (consistency_value <= this.shading[ind].threshold) {
    //       return this.shading[ind].color_value
    //     }
    //   }
    // },
    // panelTap(i) {
    //   this.panel_id = this.Store.consistency[i - 1].panel_id

    // },
    returnToPanelTray() {

      this.Store.primaryTrayIsOpen = false
      this.Store.primaryComponentName = ''
      this.Store.primaryComponentProps = ''
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'PanelTray'
      this.Store.primaryComponentProps = { panel: this.Store.panels.find(panel => panel.id === this.panel_id) }
    },


  },
  components: {
    DailyPattern,
    ChevronDownIcon,
    ChevronLeftIcon,

  },
  mounted() {
  },
  props: {
    panelId: {
      required: true
    }
  },
  data() {
    return {
      shading: [
        { threshold: 0.1, color_value: 'bg-np-base text-gray-500' },
        { threshold: 0.2, color_value: 'bg-green-50 text-gray-500' },
        { threshold: 0.3, color_value: 'bg-green-100 text-gray-500' },
        { threshold: 0.4, color_value: 'bg-green-200 text-gray-500' },
        { threshold: 0.5, color_value: 'bg-green-300 text-gray-500' },
        { threshold: 0.6, color_value: 'bg-green-400 text-gray-500' },
        { threshold: 0.7, color_value: 'bg-green-500 text-gray-500' },
        { threshold: 0.8, color_value: 'bg-green-600 text-white' },
        { threshold: 0.9, color_value: 'bg-green-700 text-white' },
        { threshold: 1.0, color_value: 'bg-green-700 text-white' },
      ],
      showFraction: false,
      showPercentage: false,
      cycleCounter: 0,
      panel_id: this.panelId,
      from_panel_id: this.fromPanelId,
    }
  }

}

</script>
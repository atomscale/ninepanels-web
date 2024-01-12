<template>
  <transition name="fade" appear>
    <div class="flex flex-col justify-start w-full h-full">
      <div class="mb-4">
        <PanelGridFrame />
      </div>
      <div class="flex flex-col justify-center h-full items-center">

        <DailyPattern v-if="Store.selectedPanel" :panelId="Store.selectedPanel" />
      </div>
      <!-- <div class="h-full flex flex-col justify-end mb-2" >
        <div :class="!Store.visGridIsOpen ? 'scale-vis h-24 ' : 'mb-8'">
          <ConsistencyGrid :class="{'animate-visgrid-bounce' : !Store.visGridIsOpen}"/>
        </div>
      </div> -->
    </div>
  </transition>
</template>

<script>
import PanelGridFrame from '@/components/panels/grid/PanelGridFrame.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import DailyPattern from '@/components/visgrid/DailyPattern.vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {

  },
  components: {
    PanelGridFrame,
    ChevronDownIcon,
    ChevronUpIcon,
    DailyPattern
  },
}
</script>
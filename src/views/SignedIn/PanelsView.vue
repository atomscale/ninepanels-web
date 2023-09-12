<template>
  <div class="flex flex-col justify-between  h-full">
    <div>
      <PanelGridFrame />
    </div>
    <div :class="{'mb-8': this.Store.isPWA}">

      <button @click="this.toggleVisGrid()" class="animate-visgrid-bounce flex w-full justify-between items-center ml-1 pl-2 pr-2 pb-3">
        <div class="h-5 text-np-light" :class="{ 'font-semibold text-np-light': this.Store.isPWA, 'font-light text-sm': !this.Store.isPWA} "  >Consistency</div>
        <div>
          <ChevronUpIcon v-if="!this.Store.visGridIsOpen" class="h-5 w-5 mr-1 text-np-base"></ChevronUpIcon>
          <ChevronDownIcon v-else class="h-5 w-5 mr-1 text-np-base"></ChevronDownIcon>
        </div>
      </button>
      <div v-if="this.Store.visGridIsOpen" class="pt-2 mb-6">
        <ConsistencyGrid />
      </div>
    </div>
  </div>
</template>

<script>
import PanelGridFrame from '@/components/panels/grid/PanelGridFrame.vue'
import ConsistencyGrid from '@/components/visgrid/ConsistencyGrid.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
    toggleVisGrid() {
      this.Store.visGridIsOpen = !this.Store.visGridIsOpen
    }
  },
  mounted() {
    this.Store.readUserAction()
  },
  components: {
    PanelGridFrame,
    ConsistencyGrid,
    ChevronDownIcon,
    ChevronUpIcon
  },
}
</script>
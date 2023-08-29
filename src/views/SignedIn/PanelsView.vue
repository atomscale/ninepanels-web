<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <PanelGridFrame />
    </div>
    <div>

      <button @click="this.toggleVisGrid()" class="animate-visgrid-bounce flex w-full justify-between items-center mb-2">
        <div class="data-heading">Consistency</div>
        <div>
          <ChevronUpIcon v-if="!this.Store.visGridIsOpen" class="h-5 w-5 text-gray-400"></ChevronUpIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-gray-400"></ChevronDownIcon>
        </div>
      </button>
      <div v-if="this.Store.visGridIsOpen" class="mb-6">
        <ConsistencyGrid />
      </div>
    </div>
  </div>
</template>

<script>
import PanelGridFrame from '@/components/PanelGridFrame.vue'
import ConsistencyGrid from '@/components/ConsistencyGrid.vue'
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
  components: {
    PanelGridFrame,
    ConsistencyGrid,
    ChevronDownIcon,
    ChevronUpIcon
  },
}
</script>
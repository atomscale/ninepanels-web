<template >
  <div class="relative">

    <button type="submit" @click="this.Store.toggleEntryOptimistically(this.panel.id)" :disabled="this.Store.entryLoading"
      class="h-full w-full rounded-lg border  text-xs "
      :class="isComplete ? 'bg-gray-800 text-gray-100 ' : 'bg-white border-gray-300 text-gray-600'">
      <div class="m-2">
        {{ this.panel.title }}
      </div>
    </button>
    <button @click="this.openPrimaryTray()" class="absolute   top-1 right-1 p-6 "
      :class="panel.entries && panel.entries.length > 0 && panel.entries[panel.entries.length - 1].is_complete ? ' text-gray-300' : 'text-gray-600'">
      <InformationCircleIcon class="absolute top-0.5 right-0.5 h-6 text-gray-400" />
    </button>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
    isComplete() {
      const userPanel = this.Store.panels.find(panel => panel.id === this.panel.id)
      if (userPanel){
        return userPanel.is_complete
      }
    }
  },
  props: {
    panel: { type: Object }
  },
  methods: {
    openPrimaryTray() {
      this.Store.getPanelsAction()
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'PanelDetail'
      this.Store.primaryComponentProps = { panel: this.panel }
    }
  },
  components: {
    InformationCircleIcon
  }
}

</script>
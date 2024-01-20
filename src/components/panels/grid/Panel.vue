<template >
  <div class="relative" >

    <button type="submit" @click="handlePanelTap(panel.id)" :disabled="Store.panelIsDisabled"
      class="h-full w-full rounded-lg text-xs "
      :aria-label="panel.title"
      :class="[isComplete ? 'bg-np-fill text-np-inverted  scale-100 shadow-none' : 'border-np-base border shadow-md scale-103 text-np-base', {'border-4 border-green-600 shadow-lg scale-105': Store.selectedPanel === panel.id && isComplete}, {'border-4 border-np-matchbgfill shadow-lg scale-105': Store.selectedPanel === panel.id && !isComplete}]">
      <div class="m-2">
        {{ this.panel.title }}
      </div>
    </button>
    <button aria-label="open panel detail" @click="openPrimaryTray" class="absolute   top-1 right-1 p-6 "

      :class="isComplete ? 'text-np-inverted opacity-70' : 'text-np-base opacity-60'">
      <ArrowTopRightOnSquareIcon class="absolute top-0.5 right-0.5 h-4 " />
    </button>
    <CheckIcon v-if="isComplete" class="absolute top-1.5 text-green-500 left-2 h-4 " />

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

// panel.entries && panel.entries.length > 0 && panel.entries[panel.entries.length - 1].is_complete
export default {
  computed: {
    ...mapStores(useStore),
    isComplete() {
      const userPanel = this.Store.panels.find(panel => panel.id === this.panel.id)
      if (userPanel){
        return userPanel.is_complete
      }
    },

  },
  props: {
    panel: { type: Object }
  },
  methods: {
    openPrimaryTray() {
      this.Store.readPanelsAction()
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'PanelTray'
      this.Store.primaryComponentProps = { panel: this.panel }
    },
    handlePanelTap(panelId) {
      if (this.Store.selectedPanel === panelId) {
        console.log(`toggle panel ${panelId}`)
        this.Store.toggleEntryOptimistically(panelId)
      } else {
        console.log(`focus to panel ${panelId}`)
        this.Store.selectedPanel = panelId
      }
    }
  },
  components: {
    InformationCircleIcon,
    ArrowTopRightOnSquareIcon,
    CheckIcon
  }
}

</script>
<template >
  <div class="relative">
    <button type="submit" @click="handlePanelTap(panel.id)" :disabled="panelStore.panelIsDisabled"
      class="h-full w-full rounded-lg text-xs " :aria-label="panel.title" :class="[
        isComplete ? 'bg-np-fill text-np-inverted  scale-100 shadow-none' : 'border-np-base border shadow-md scale-100 text-np-base',
        // mainStore.selectedPanel === panel.id ? 'p-0': 'p-1',
        { 'border-4 border-green-600 shadow-lg scale-110': mainStore.selectedPanel === panel.id && isComplete },
        { 'border-4 border-np-matchbgfill shadow-lg scale-110': mainStore.selectedPanel === panel.id && !isComplete },
        { 'p-0.5': mainStore.selectedPanel != panel.id },
        { 'p-x-1': mainStore.selectedPanel === panel.id },
      ]">
      <div class="m-2">
        {{ this.panel.title }}
      </div>
    </button>
    <button aria-label="open panel detail" @click="mainStore.openRightTray('PanelTray', { panelId: panel.id })"
      class="absolute  p-6 rounded-bl-full" :class="[
        isComplete ? 'text-np-inverted opacity-70' : 'text-np-base opacity-60',
        mainStore.selectedPanel === panel.id ? 'top-0 right-0' : 'top-0.5 right-0.5'
      ]">
      <ArrowsPointingOutIcon class="absolute top-0.5 right-0.5 h-3 " />
    </button>
    <CheckIcon v-if="isComplete" class="absolute  text-green-500  h-4 " :class="[

      mainStore.selectedPanel === panel.id ? 'top-0 left-0' : 'top-0.5 left-1'
    ]" />
  </div>
</template>

<script>
import { useMainStore } from '@/stores/store.js'
import { usePanelStore } from "@/stores/panelStore.js"

import { mapStores } from 'pinia'

import {
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  ArrowsPointingOutIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useMainStore, usePanelStore),
    isComplete() {
      const userPanel = this.panelStore.panels.find(panel => panel.id === this.panel.id)
      if (userPanel) {
        return userPanel.is_complete
      }
    },
  },
  props: {
    panel: { type: Object }
  },
  methods: {
    handlePanelTap(panelId) {
      if (this.mainStore.selectedPanel === panelId) {
        this.panelStore.toggleEntryOptimistically(panelId)
      } else {
        this.mainStore.selectedPanel = panelId
      }
    }
  },
  components: {
    InformationCircleIcon,
    ArrowTopRightOnSquareIcon,
    CheckIcon,
    ArrowsPointingOutIcon
  }
}
</script>
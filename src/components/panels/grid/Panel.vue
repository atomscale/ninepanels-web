<template >
  <div class="relative">
    <button type="submit" @click="handlePanelTap(panel.id)" :disabled="Store.panelIsDisabled"
      class="h-full w-full rounded-lg text-xs "
      :aria-label="panel.title"
      :class="[
        isComplete ? 'bg-np-fill text-np-inverted  scale-100 shadow-none' : 'border-np-base border shadow-md scale-100 text-np-base',
        Store.selectedPanel === panel.id ? '': 'p-1',
        {'border-4 border-green-600 shadow-lg scale-110': Store.selectedPanel === panel.id && isComplete},
        {'border-4 border-np-matchbgfill shadow-lg scale-110': Store.selectedPanel === panel.id && !isComplete},
        ]">
      <div class="m-2">
        {{ this.panel.title }}
      </div>
    </button>
    <button aria-label="open panel detail" @click="openPrimaryTray" class="absolute  p-6 rounded-bl-full"
      :class="[
        isComplete ? 'text-np-inverted opacity-70' : 'text-np-base opacity-60',
        Store.selectedPanel === panel.id ? 'top-0 right-0': 'top-0.5 right-0.5'
        ]">
      <ArrowsPointingOutIcon class="absolute top-0.5 right-0.5 h-3 " />
    </button>
    <CheckIcon v-if="isComplete" class="absolute  text-green-500  h-4 "
    :class="[

        Store.selectedPanel === panel.id ? 'top-0 left-0': 'top-0.5 left-1'
        ]" />
  </div>
</template>

<script>
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
  CheckIcon,
  ArrowsPointingOutIcon
} from '@heroicons/vue/24/outline'

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
        this.Store.toggleEntryOptimistically(panelId)
      } else {
        this.Store.selectedPanel = panelId
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
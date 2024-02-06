<template>
  <transition name="fade" appear>
    <div class="flex flex-col justify-start w-full h-full">
      <div class="mb-4">
        <PanelGridFrame @click.stop />
      </div>
      <button @click="clearFocus" class="flex flex-col justify-center h-full items-center">
        <div v-if="panelStore.panels && panelStore.panels.length > 0"
          class="flex flex-col justify-start h-full items-center">
          <Graph v-if="mainStore.selectedPanel && panelStore.panels && panelStore.panels.length > 0"
            :panelId="mainStore.selectedPanel" :onHome="true" @click.stop />
        </div>
        <div v-else class="flex justify-center items-center">
          <button aria-label="add a new panel" type="submit"
            @click="mainStore.openRightTray('PanelCreateForm', { emptySlotIndex: 0 })" class="
              text-xs text-np-base">
            <div class="flex items-center justify-center">
              <div class="text-sm text-np-base mr-4">create a panel to start</div>
              <PlusIcon class="h-8 w-8 text-np-base opacity-60 " />

            </div>
          </button>
        </div>
      </button>
    </div>
  </transition>
</template>

<script>
import { useMainStore } from '@/stores/store.js'
import { usePanelStore } from "@/stores/panelStore.js"

import { mapStores } from 'pinia'

import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from '@heroicons/vue/24/outline'

import PanelGridFrame from '@/components/panels/PanelGridFrame.vue'
import Graph from '@/components/panels/Graph.vue'

export default {
  computed: {
    ...mapStores(useMainStore, usePanelStore),
  },
  methods: {
    clearFocus() {
      this.mainStore.selectedPanel = null
    }
  },
  mounted() {
    this.mainStore.checkAppVersion()
  },
  components: {
    PanelGridFrame,
    ChevronDownIcon,
    ChevronUpIcon,
    Graph,
    PlusIcon
  },
}
</script>
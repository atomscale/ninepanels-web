<template>
  <transition name="fade" appear>
    <div class="flex flex-col justify-start w-full h-full">
      <div class="mb-4">
        <PanelGridFrame @click.stop />
      </div>
      <button @click="clearFocus" class="flex flex-col justify-center h-full items-center">





        <div v-if="Store.panels && Store.panels.length > 0" class="flex flex-col justify-start h-full items-center">
          <Graph v-if="Store.selectedPanel && Store.panels && Store.panels.length > 0"
            :panelId="Store.selectedPanel" :onHome="true" @click.stop />
        </div>
        <div v-else class="flex justify-center items-center">

          <button aria-label="add a new panel" type="submit" @click="this.openCreatePanelTray()" class="
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
import PanelGridFrame from '@/components/panels/PanelGridFrame.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { PlusIcon } from '@heroicons/vue/24/outline'
import Graph from '@/components/panels/Graph.vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {

    openCreatePanelTray() {
      this.Store.rightTrayIsOpen = true
      this.Store.rightTrayComponentName = 'PanelCreateForm'
      this.Store.rightTrayComponentProps = { emptySlotIndex: 0 }
    },
    clearFocus() {
      this.Store.selectedPanel = null
    }
  },
  mounted() {
    this.Store.checkAppVersion()
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
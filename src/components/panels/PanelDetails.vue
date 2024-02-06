<template >
  <div class="flex flex-col justify-between h-full">

    <div class="sticky z-10 top-0 bg-np-base opacity-95">
      <component :is="mainStore.panelTitleEditState ? 'PanelTitleEdit' : 'PanelTitleDisplay'" :panelId="panel.id"
        :title="panel.title">
      </component>
    </div>

    <div class="flex flex-col justify-between h-full">
      <div class="mb-6 h-full">
        <component :is="mainStore.panelDescEditState ? 'PanelDescEdit' : 'PanelDescDisplay'" :panelId="panel.id"
          :description="panel.description">
        </component>
      </div>

      <div :class="{ 'mb-4': mainStore.isPWA }">
        <div class="flex w-full justify-between items-center">
          <button
            @click="mainStore.openRightTray('Graph', { panelId: panel.id, onHome: false }, 'PanelTray', { panelId: panel.id })"
            class="flex w-full justify-between items-start">
            <div class="font-light text-np-base text-sm">Consistency Pattern</div>
            <ChevronRightIcon class="h-5 w-5 text-gray-400 hover:text-np-base"></ChevronRightIcon>
          </button>
        </div>
        <button @click="this.togglePanelSortBox()" class="flex w-full justify-between items-center mt-5">
          <div class="text-sm font-light h-5 text-np-base">Order</div>
          <div>
            <ChevronLeftIcon v-if="!mainStore.panelSortBoxIsOpen" class="h-5 w-5 text-gray-400 hover:text-np-base">
            </ChevronLeftIcon>
            <ChevronDownIcon v-else class="h-5 w-5 text-gray-400 hover:text-np-base"></ChevronDownIcon>
          </div>
        </button>

        <component class="overflow-hidden transition-all ease-in-out duration-300"
          :is="mainStore.panelSortBoxIsOpen ? 'PanelSort' : null " :panel="this.panel">
        </component>

        <button @click="this.toggleDeleteResetBox()" class="flex w-full justify-between items-center mt-5 ">
          <div class="text-sm font-light h-5 text-np-base">Danger Zone</div>
          <div>

            <ChevronLeftIcon v-if="!mainStore.deleteResetBoxIsOpen" class="h-5 w-5 text-gray-400 hover:text-np-base">
            </ChevronLeftIcon>
            <ChevronDownIcon v-else class="h-5 w-5 text-gray-400 hover:text-np-base"></ChevronDownIcon>
          </div>
        </button>
        <div v-if="mainStore.deleteResetBoxIsOpen" class="flex flex-col items-center">
          <div class="text-xs text-np-base font-light mt-2 w-full">Need a fresh start on this panel? Reset the completion
            history
            and clear all your stats:</div>
          <DynamicButton class="mt-2 mb-2 w-full" :parentMethod="sendEntriesDelete" :buttonText="'Reset stats history'"
            :confirmRequired="true" :confirmText="'Reset all stats?'" />
          <div class="text-xs text-np-base font-light  w-full">Delete the entire panel, including all completion history:
          </div>
          <DynamicButton class="mt-2 mb-4 w-full " :parentMethod="sendPanelDelete" :buttonText="'Delete panel'"
            :confirmRequired="true" :confirmText="'Delete forever?'" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import { useMainStore } from '@/stores/store.js'
import { usePanelStore } from "@/stores/panelStore.js"
import { mapStores } from 'pinia'
import PanelDescDisplay from '@/components/panels/PanelDescDisplay.vue'
import PanelDescEdit from '@/components/panels/PanelDescEdit.vue'
import PanelTitleDisplay from '@/components/panels/PanelTitleDisplay.vue'
import PanelTitleEdit from '@/components/panels/PanelTitleEdit.vue'
import Graph from '@/components/panels/Graph.vue'
import DynamicButton from '@/components/general/DynamicButton.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import PanelSort from '@/components/panels/PanelSort.vue'
import { Switch } from '@headlessui/vue'

export default {
  computed: {
    ...mapStores(useMainStore, usePanelStore),
    panel() {
      return this.panelStore.panels.find(panel => panel.id === this.panelId)
    }
  },
  watch: {
    'mainStore.panelDescEditState': function (newVal, oldVal) {
      console.log(`panelDescEditState = ${newVal}, was ${oldVal}`)
    }
  },
  methods: {
    async sendPanelDelete() {

      this.mainStore.closeRightTray()
      await this.panelStore.deletePanelAction(this.panel.id)

      await this.panelStore.readPanelConsistencyAction()

      this.mainStore.selectedPanel = null

      const localFilterMRU = JSON.parse(localStorage.getItem('localFilterMRU'))


      if (localFilterMRU) {

        delete localFilterMRU[this.panel.id]
      }
      localStorage.setItem('localFilterMRU', JSON.stringify(localFilterMRU))
    },
    async sendEntriesDelete() {

      this.mainStore.closeRightTray()
      await this.panelStore.deleteEntriesAction(this.panel.id)

      await this.panelStore.readPanelConsistencyAction()
    },
    togglePanelSortBox() {
      this.mainStore.panelSortBoxIsOpen = !this.mainStore.panelSortBoxIsOpen
    },
    toggleDeleteResetBox() {
      this.mainStore.deleteResetBoxIsOpen = !this.mainStore.deleteResetBoxIsOpen
    },

  },
  components: {
    PanelDescDisplay,
    PanelDescEdit,
    PanelTitleDisplay,
    PanelTitleEdit,
    DynamicButton,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PanelSort,
    Graph,
    Switch
  },
  props: {
    panelId: {
      type: Number,
      required: true
    }
  }
}

</script>
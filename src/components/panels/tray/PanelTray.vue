<template >
  <div class="flex flex-col justify-between h-full">

    <div class="sticky z-10 top-0 bg-np-base opacity-95">

      <component :is="this.Store.panelTitleEditState ? 'PanelTitleEdit' : 'PanelTitleDisplay'" :panelId="this.panel.id"
        :title="this.panel.title">
      </component>
    </div>


    <div class="flex flex-col justify-between h-full">


      <div class="mb-6">

        <component :is="this.Store.panelDescEditState ? 'PanelDescEdit' : 'PanelDescDisplay'" :panelId="this.panel.id"
          :description="this.panel.description">
        </component>
      </div>





      <div :class="{ 'mb-4': this.Store.isPWA }">
        <div class="flex w-full justify-between items-center">


          <button @click="this.togglePatternTray()" class="flex w-full justify-between items-start">
            <div class="font-light text-np-base text-sm">Consistency Graph</div>



            <ChevronRightIcon class="h-5 w-5 text-gray-400 hover:text-np-base"></ChevronRightIcon>
          </button>


        </div>


        <button @click="this.togglePanelSortBox()" class="flex w-full justify-between items-center mt-5">
          <div class="text-sm font-light h-5 text-np-base">Order</div>
          <div>

            <ChevronLeftIcon v-if="!this.panelSortBoxIsOpen" class="h-5 w-5 text-gray-400 hover:text-np-base">
            </ChevronLeftIcon>
            <ChevronDownIcon v-else class="h-5 w-5 text-gray-400 hover:text-np-base"></ChevronDownIcon>
          </div>
        </button>


        <component class="overflow-hidden transition-all ease-in-out duration-300"
          :is="this.panelSortBoxIsOpen ? 'PanelSort' : null " :panel="this.panel">
        </component>

        <button @click="this.toggleDeleteResetBox()" class="flex w-full justify-between items-center mt-5 ">
          <div class="text-sm font-light h-5 text-np-base">Danger Zone</div>
          <div>

            <ChevronLeftIcon v-if="!this.deleteResetBoxIsOpen" class="h-5 w-5 text-gray-400 hover:text-np-base">
            </ChevronLeftIcon>
            <ChevronDownIcon v-else class="h-5 w-5 text-gray-400 hover:text-np-base"></ChevronDownIcon>
          </div>
        </button>
        <div v-if="this.deleteResetBoxIsOpen" class="flex flex-col items-center">
          <div class="text-xs text-np-base font-light mt-2 w-full">Need a fresh start on this panel? Reset the completion
            history
            and clear all your stats:</div>
          <DynamicButton class="mt-2 mb-2 w-4/5" :parentMethod="sendEntriesDelete" :buttonText="'Reset stats history'"
            :confirmRequired="true" :confirmText="'Reset all stats?'" />
          <div class="text-xs text-np-base font-light  w-full">Delete the entire panel, including all completion history:
          </div>
          <DynamicButton class="mt-2 mb-4 w-4/5 " :parentMethod="sendPanelDelete" :buttonText="'Delete panel'"
            :confirmRequired="true" :confirmText="'Delete forever?'" />
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import PanelDescDisplay from '@/components/panels/tray/PanelDescDisplay.vue'
import PanelDescEdit from '@/components/panels/tray/PanelDescEdit.vue'
import PanelTitleDisplay from '@/components/panels/tray/PanelTitleDisplay.vue'
import PanelTitleEdit from '@/components/panels/tray/PanelTitleEdit.vue'
import DailyPattern from '@/components/visgrid/DailyPattern.vue'
import DynamicButton from '@/components/utilities/DynamicButton.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
import PanelSort from '@/components/panels/tray/PanelSort.vue'
import { Switch } from '@headlessui/vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
    async sendPanelDelete() {

      this.Store.primaryTrayIsOpen = false
      this.deleteResetBoxIsOpen = false
      await this.Store.deletePanelAction(this.panel.id)
      this.Store.primaryComponentName = null
      this.Store.primaryComponentProps = {}
      this.Store.readPanelConsistencyAction()
    },
    async sendEntriesDelete() {

      this.Store.primaryTrayIsOpen = false
      this.deleteResetBoxIsOpen = false
      await this.Store.deleteEntriesAction(this.panel.id)
      this.Store.primaryComponentName = null
      this.Store.primaryComponentProps = {}
      this.Store.readPanelConsistencyAction()
    },
    togglePanelSortBox() {
      this.panelSortBoxIsOpen = !this.panelSortBoxIsOpen
    },
    toggleDeleteResetBox() {
      this.deleteResetBoxIsOpen = !this.deleteResetBoxIsOpen
    },
    togglePatternTray() {
      this.Store.primaryTrayIsOpen = false
      this.Store.primaryComponentName = ''
      this.Store.primaryComponentProps = ''
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'PatternTray'
      this.Store.primaryComponentProps = { panelId: this.panel.id }
    }
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
    DailyPattern,
    Switch
  },
  props: {
    panel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      enabled: false,
      panelSortBoxIsOpen: false,
      deleteResetBoxIsOpen: false,
      historyBoxIsOpen: false,
    }
  }

}

</script>
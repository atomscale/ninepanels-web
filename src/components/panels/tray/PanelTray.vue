<template >
  <div class="flex flex-col justify-between h-full">
    <div>

      <component :is="this.Store.panelTitleEditState ? 'PanelTitleEdit' : 'PanelTitleDisplay'" :panelId="this.panel.id"
        :title="this.panel.title">
      </component>


      <component :is="this.Store.panelDescEditState ? 'PanelDescEdit' : 'PanelDescDisplay'" :panelId="this.panel.id"
        :description="this.panel.description">
      </component>


      <button @click="this.togglePanelSortBox()" class="flex w-full justify-between items-center mt-5">
        <div :style="{'font-variant': 'small-caps'}" class="data-heading">Order</div>
        <div>

          <ChevronLeftIcon v-if="!this.Store.panelSortBoxIsOpen" class="h-5 w-5 text-gray-400"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-gray-400"></ChevronDownIcon>
        </div>
      </button>


      <component class="overflow-hidden transition-all ease-in-out duration-300"
        :is="this.Store.panelSortBoxIsOpen ? 'PanelSort' : null " :panel="this.panel">
      </component>

      <!-- <div class="mt-6 flex justify-between align-middle">
        <div class="text-xs text-np-base">Lock panel</div>
        <Switch @click="this.togglePanelLock()" v-model="enabled"
          :class="[enabled ? 'bg-gray-600' : 'bg-gray-100', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ']">
          <span class="sr-only">Use setting</span>
          <span aria-hidden="true"
            :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
        </Switch>
      </div> -->


    </div>
    <div :class="{ 'mb-4': this.Store.isPWA}">
      <button @click="this.toggleDeleteResetBox()" class="flex w-full justify-between items-center mt-5 " >
        <div :style="{'font-variant': 'small-caps'}" class="data-heading">Danger Zone</div>
        <div>

          <ChevronLeftIcon v-if="!this.Store.deleteResetBoxIsOpen" class="h-5 w-5 text-np-light"></ChevronLeftIcon>
          <ChevronDownIcon v-else class="h-5 w-5 text-np-light"></ChevronDownIcon>
        </div>
      </button>
      <div v-if="this.Store.deleteResetBoxIsOpen" >
        <div class="text-xs text-np-base font-light mt-2">Need a fresh start on this panel? Reset the completion history and clear all your stats:</div>
        <DynamicButton class="mt-2 mb-2" :parentMethod="sendEntriesDelete" :buttonText="'Reset stats history'"
          :confirmRequired="true" :confirmText="'Reset all stats?'" />
        <div class="text-xs text-np-base font-light">Delete the entire panel, including all completion history:</div>
        <DynamicButton class="mt-2 mb-4 " :parentMethod="sendPanelDelete" :buttonText="'Delete panel'"
          :confirmRequired="true" :confirmText="'Delete forever?'" />
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
import DynamicButton from '@/components/utilities/DynamicButton.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
import PanelSort from '@/components/panels/tray/PanelSort.vue'
import { Switch } from '@headlessui/vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
    async sendPanelDelete() {

      this.Store.primaryTrayIsOpen = false
      this.Store.deleteResetBoxIsOpen = false
      await this.Store.deletePanelAction(this.panel.id)
      this.Store.primaryComponentName = null
      this.Store.primaryComponentProps = {}
      this.Store.readPanelConsistencyAction()
    },
    async sendEntriesDelete() {

      this.Store.primaryTrayIsOpen = false
      this.Store.deleteResetBoxIsOpen = false
      await this.Store.deleteEntriesAction(this.panel.id)
      this.Store.primaryComponentName = null
      this.Store.primaryComponentProps = {}
      this.Store.readPanelConsistencyAction()
    },
    togglePanelSortBox() {
      this.Store.panelSortBoxIsOpen = !this.Store.panelSortBoxIsOpen
    },
    togglePanelLock() {
      console.log("dispatch panel lock")
    },
    toggleDeleteResetBox() {
      this.Store.deleteResetBoxIsOpen = !this.Store.deleteResetBoxIsOpen
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
    PanelSort,
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
      enabled: false
    }
  }

}

</script>
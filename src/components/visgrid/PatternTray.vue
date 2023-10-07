<template >
  <div class="flex flex-col justify-between h-full">



  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import PanelDescDisplay from '@/components/panels/tray/PanelDescDisplay.vue'
import PanelDescEdit from '@/components/panels/tray/PanelDescEdit.vue'
import PanelTitleDisplay from '@/components/panels/tray/PanelTitleDisplay.vue'
import PanelTitleEdit from '@/components/panels/tray/PanelTitleEdit.vue'
import PanelHistory from '@/components/panels/tray/PanelHistory.vue'
import DynamicButton from '@/components/utilities/DynamicButton.vue'
import PanelSort from '@/components/panels/tray/PanelSort.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
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
    toggleHistoryBox() {
      this.historyBoxIsOpen = !this.historyBoxIsOpen
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
    PanelHistory,
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
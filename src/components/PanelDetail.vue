<template >
  <div class="ml-4 flex flex-col justify-between h-full">
    <div>

      <component :is="this.Store.panelTitleEditState ? 'PanelTitleEdit' : 'PanelTitleDisplay'" :panelId="this.panel.id">
      </component>

      <div v-if="this.panel.entries.length > 0" class="mt-4">
        <div v-if="this.panel.entries[this.panel.entries.length - 1].is_complete" class="mt-2"> Complete for today.
        </div>
        <div v-else class="mt-2 flex flex-col">
          <div class="items-center flex mr-4">You can still complete this today.</div>
          <div class="flex mt-4">
            <div class=" mr-2 items-center flex text-xs text-gray-500">(Tap the panel to be </div>
            <div class="h-4 w-4 rounded  bg-gray-500"></div>
            <div class=" ml-2 items-center flex text-xs text-gray-500">to mark it as done)</div>
          </div>
        </div>
      </div>

      <div v-else class="mt-2 flex flex-col">
        <div class="items-center flex mr-4">You can still complete this today.</div>
        <div class="flex mt-4">
          <div class=" mr-2 items-center flex text-xs text-gray-500">(Tap the panel to be </div>
          <div class="h-4 w-4 rounded  bg-gray-500"></div>
          <div class=" ml-2 items-center flex text-xs text-gray-500">to mark it as done)</div>
        </div>
      </div>

    </div>
    <DeleteButton  :parentMethod="sendPanelDelete" :buttonText="'Delete panel'" :confirmText="'Are you sure?'" />
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'
import PanelTitleDisplay from '@/components/PanelTitleDisplay.vue'
import PanelTitleEdit from '@/components/PanelTitleEdit.vue'
import DeleteButton from '@/components/DeleteButton.vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
    sendPanelDelete() {
      NProgress.start()
      this.Store.deletePanelAction(this.panel.id)
      NProgress.done()
      this.Store.trayIsOpen = false
      this.Store.componentName = null
      this.Store.componentProps = {}
    }
  },
  components: {
    PanelTitleDisplay,
    PanelTitleEdit,
    DeleteButton
  },
  props: {
    panel: {
      type: Object,
      required: true
    }
  }

}

</script>
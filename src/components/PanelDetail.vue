<template >
  <div class="ml-1 flex flex-col justify-between h-full">
    <div>

      <component :is="this.Store.panelTitleEditState ? 'PanelTitleEdit' : 'PanelTitleDisplay'" :panelId="this.panel.id" :title="this.panel.title">
      </component>

      <component :is="this.Store.panelDescEditState ? 'PanelDescEdit' : 'PanelDescDisplay'" :panelId="this.panel.id" :description="this.panel.description">
      </component>

    </div>
    <DeleteButton  :parentMethod="sendPanelDelete" :buttonText="'Delete panel'" :confirmText="'Are you sure?'" />
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'
import PanelDescDisplay from '@/components/PanelDescDisplay.vue'
import PanelDescEdit from '@/components/PanelDescEdit.vue'
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
    PanelDescDisplay,
    PanelDescEdit,
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
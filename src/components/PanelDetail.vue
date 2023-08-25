<template >
  <div class="ml-1 flex flex-col justify-between h-full">
    <div>

      <component :is="this.Store.panelTitleEditState ? 'PanelTitleEdit' : 'PanelTitleDisplay'" :panelId="this.panel.id"
        :title="this.panel.title">
      </component>


      <component :is="this.Store.panelDescEditState ? 'PanelDescEdit' : 'PanelDescDisplay'" :panelId="this.panel.id"
        :description="this.panel.description">
      </component>

      <div class="flex justify-between items-center mt-5">
        <div class="text-xs text-gray-500">Order</div>
        <button @click="this.togglePanelSortBox()">
          <ChevronDownIcon v-if="!this.Store.panelSortBoxIsOpen" class="h-5 w-5 text-gray-400"></ChevronDownIcon>
          <ChevronUpIcon v-else class="h-5 w-5 text-gray-400"></ChevronUpIcon>
        </button>
      </div>

      <component class="overflow-hidden transition-all ease-in-out duration-300"
        :is="this.Store.panelSortBoxIsOpen ? 'PanelSort' : null " :panelId="this.panel.id">
      </component>

      <div class="mt-6 flex justify-between align-middle">
        <div class="text-xs text-gray-500">Lock panel</div>
        <Switch v-model="enabled"
          :class="[enabled ? 'bg-gray-600' : 'bg-gray-100', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ']">
          <span class="sr-only">Use setting</span>
          <span aria-hidden="true"
            :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
        </Switch>
      </div>


    </div>
    <DeleteButton :parentMethod="sendPanelDelete" :buttonText="'Delete panel'" :confirmText="'Are you sure?'" />
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
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ChevronUpIcon } from '@heroicons/vue/24/outline'
import PanelSort from '@/components/PanelSort.vue'
import { Switch } from '@headlessui/vue'

export default {
  computed: {
    ...mapStores(useStore),
  },
  methods: {
    sendPanelDelete() {
      NProgress.start()
      this.Store.deletePanelAction(this.panel.id)
      NProgress.done()
      this.Store.primaryTrayIsOpen = false
      this.Store.primaryComponentName = null
      this.Store.primaryComponentProps = {}
    },
    togglePanelSortBox() {
      this.Store.panelSortBoxIsOpen = !this.Store.panelSortBoxIsOpen
    }
  },
  components: {
    PanelDescDisplay,
    PanelDescEdit,
    PanelTitleDisplay,
    PanelTitleEdit,
    DeleteButton,
    ChevronDownIcon,
    ChevronUpIcon,
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
      enabled: true
    }
  }

}

</script>
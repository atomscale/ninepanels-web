<template >
  <div class="ml-4">
    <div class="text-2xl font-bold">{{ this.panel.title }}</div>
    <div v-if="this.panel.entries.length > 0" class="mt-4">
      <div v-if="this.panel.entries[this.panel.entries.length - 1].is_complete" class="mt-2"> Complete for today. Good job.
      </div>
      <div v-else class="mt-2 flex">
      <div class="items-center flex mr-4">You can still complete this today.</div>
      <div class="flex">
        <div class="h-8 w-8 rounded  bg-gray-500"></div>
        <div class=" ml-2 items-center flex text-xs text-gray-500">= done</div>
      </div>
    </div>
    </div>
    <div v-else class="mt-2 flex">
      <div class="items-center flex mr-4">You can still complete this today.</div>
      <div class="flex">
        <div class="h-8 w-8 rounded  bg-gray-500"></div>
        <div class=" ml-2 items-center flex text-xs text-gray-500">= done</div>
      </div>
    </div>
    <button type="submit"
      class="flex justify-center border border-gray-200 rounded-md w-full mt-8 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm"
      @click="sendPanelDelete(data)">
      Delete panel
    </button>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'

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
  },
  props: {
    panel: {
      type: Object,
      required: true
    }
  }

}

</script>
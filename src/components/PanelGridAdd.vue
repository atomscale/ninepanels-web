<template >
  <button type="submit" @click="this.openCreatePanelTray()" class="h-full w-full rounded-md border border-gray-300 border-dashed text-xs text-gray-600">
    <div class="flex items-center justify-center">
      <PlusCircleIcon class="h-8 w-8 text-gray-400 " />

    </div>
  </button>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),

  },

  methods: {
    openCreatePanelTray() {
      this.Store.trayIsOpen = true
      this.Store.componentName = 'PanelCreateForm'
      // this.Store.componentProps = {title: "Panel Create Form from props"}
    }
  },
  components: {
    PlusCircleIcon
  }

}

</script>
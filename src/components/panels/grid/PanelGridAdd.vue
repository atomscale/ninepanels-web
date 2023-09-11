<template >
  <button aria-label="add a new panel" type="submit" @click="this.openCreatePanelTray()" class="h-full w-full rounded-lg border border-gray-300 border-dashed text-xs text-gray-600">
    <div class="flex items-center justify-center">
      <PlusIcon class="h-6 w-6 text-gray-400 " />

    </div>
  </button>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { PlusIcon } from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),

  },


  methods: {
    openCreatePanelTray() {
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'PanelCreateForm'
      this.Store.primaryComponentProps = {emptySlotIndex: this.slotIndex}
    }
  },
  components: {
    PlusIcon
  },
  props: {
    slotIndex: {
      type: Number,
      required: true
    }
  }

}

</script>
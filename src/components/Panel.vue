<template >
  <div class="relative">

    <button type="submit" @click="sendEntry()"
      class="h-full w-full rounded-lg border  text-xs "
      :class="panel.entries && panel.entries.length > 0 && panel.entries[panel.entries.length - 1].is_complete ? 'bg-gray-800 text-gray-100 ' : 'bg-gray-100 border-gray-300 text-gray-600'">
      <div class="m-2">
        {{ this.panel.title }}
      </div>
    </button>
    <button @click="this.openPanelDetail()" class="absolute top-0.5 right-0.5 p-1.5 "
      :class="panel.entries && panel.entries.length > 0 && panel.entries[panel.entries.length - 1].is_complete ? ' text-gray-300' : 'text-gray-600'">
      <InformationCircleIcon class="h-4 text-gray-400" />
    </button>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  InformationCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
    // entry() {
    //   const store = useStore();
    //   return store.entries.find(entry => entry.panel_id === this.panel.id);
    // }
  },
  props: {
    panel: { type: Object }
  },
  methods: {
    sendEntry() {
      // const store = useStore();

      // const entry = this.entry
      if (this.panel.entries && this.panel.entries.length > 0) {
        this.Store.postEntryAction(this.panel.id, !this.panel.entries[this.panel.entries.length - 1].is_complete)
        // console.log(entry.panel_id, entry.is_complete)
      } else {
        this.Store.postEntryAction(this.panel.id, true)
      }
    },
    openPanelDetail() {
      this.Store.getPanelsAction()
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'PanelDetail'
      this.Store.primaryComponentProps = { panel: this.panel }
    }
  },
  components: {
    InformationCircleIcon
  }
}

</script>
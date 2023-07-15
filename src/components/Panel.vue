<template >


    <button type="submit" @click="sendEntry()" class="h-full w-full rounded-md border border-gray-300 text-xs text-gray-600" :class="entry && entry.is_complete ? 'bg-green-300' : 'bg-white'">
      <div class="m-2">

        <div v-if="entry">
          {{ this.panel.title }}
        </div>
        <div v-else>
          {{ this.panel.title }}
        </div>
      </div>
    </button>

</template>

<script>

import { useStore } from '@/stores/Store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore),
    entry() {
      const store = useStore();
      return store.entries.find(entry => entry.panel_id === this.panel.id);
    }
  },
  props: {
    panel: { type: Object }
  },
  methods: {
    sendEntry() {
      const store = useStore();

      const entry = this.entry
      if (entry) {
        store.postEntryAction(this.panel.id, !entry.is_complete)
        console.log(entry.panel_id, entry.is_complete)
      } else {
        store.postEntryAction(this.panel.id, true)
      }
    }
  },
  // setup(props) {
  //   const store = useStore()

  //   const entry = computed(() => {
  //     return store.entries.find(entry => entry.panel_id === props.panel.id)
  //   })

  //   return {
  //     entry
  //   }
  // }

}

</script>
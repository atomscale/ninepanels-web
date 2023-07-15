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

import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore),
    entry() {
      const store = useMainStore();
      return store.entries.find(entry => entry.panel_id === this.panel.id);
    }
  },
  props: {
    panel: { type: Object }
  },
  methods: {
    sendEntry() {
      const store = useMainStore();

      const entry = this.entry
      if (entry) {
        store.postEntry(this.panel.id, !entry.is_complete)
        console.log(entry.panel_id, entry.is_complete)
      } else {
        store.postEntry(this.panel.id, true)
      }
    }
  },
  // setup(props) {
  //   const store = useMainStore()

  //   const entry = computed(() => {
  //     return store.entries.find(entry => entry.panel_id === props.panel.id)
  //   })

  //   return {
  //     entry
  //   }
  // }

}

</script>
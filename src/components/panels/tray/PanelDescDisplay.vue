<template >
  <div class="flex-col">

    <div class="flex justify-between items-center mb-2">
      <div   class="text-sm font-light h-5 text-np-light">About</div>
      <div>

        <button class="" @click="toggleEditState()">
          <PencilIcon v-if="this.panel.description" class="h-4 w-4 text-np-base" />
          <PlusIcon v-else class="h-5 w-5 text-np-light hover:text-np-base" />
        </button>
      </div>
    </div>

    <!-- <div class="text-sm w-auto whitespace-pre-line">{{ panel.description }}</div> -->
    <VueShowdown class="text-sm max-h-80 text-np-base w-auto whitespace-pre-line overflow-hidden overflow-y-auto" flavor="vanilla" :options="{ emoji: true }"
      :markdown="this.panel.description"></VueShowdown>

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import { VueShowdown } from 'vue-showdown'

import {
  PencilIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
    panel() {
      return this.Store.panels.find(panel => panel.id === this.panelId)
    }
  },
  methods: {
    toggleEditState() {
      this.Store.panelDescEditState = !this.Store.panelDescEditState
    }
  },
  components: {
    PencilIcon,
    PlusIcon,
    VueShowdown
  },

  props: {
    description: {
      type: String,
      required: false
    },
    panelId: {
      type: Number,
      required: true
    }
  }

}

</script>
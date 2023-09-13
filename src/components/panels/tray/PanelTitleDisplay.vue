<template >
  <div class="flex-col mb-4">

    <div class="flex justify-between items-center">
      <div   class="text-sm font-light h-5 text-np-base">Panel</div>
      <div>

        <button class="ml-4 " @click="toggleEditState()">
          <PencilIcon class="h-4 w-4 text-np-base hover:text-np-base" />
        </button>
      </div>
    </div>

    <div class="text-xl font-bold text-np-base w-auto">{{ panel.title }}</div>

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import {
  PencilIcon
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
      this.Store.panelTitleEditState = !this.Store.panelTitleEditState
    }
  },
  components: {
    PencilIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    panelId: {
      type: Number,
      required: true
    }
  }

}

</script>
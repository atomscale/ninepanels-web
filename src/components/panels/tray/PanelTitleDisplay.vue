<template >
  <div class="mb-2 pb-2">

    <div class="flex justify-between">
      <!-- <div   class="text-sm font-light h-5 text-np-base">p</div> -->
      <div class="text-xl mr-1 font-bold text-np-base w-auto">{{ panel.title }}</div>


      <div class="h-full pt-1">

        <button class="ml-4" @click="toggleEditState()">
          <PencilIcon class="h-4 w-4 text-gray-400 hover:text-np-base" />
        </button>

      </div>
    </div>


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
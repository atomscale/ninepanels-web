<template >
  <div class="">

    <div class="flex justify-between ">
      <!-- <div   class="text-sm font-light h-5 text-np-base">About</div> -->
      <VueShowdown v-if="this.panel.description" class="text-sm mr-2 max-h-64 font-light text-np-base w-auto whitespace-pre-line overflow-hidden overflow-y-auto" flavor="vanilla" :options="{ emoji: true }"
        :markdown="this.panel.description">
      </VueShowdown>
      <div v-else class="italic font-extralight text-gray-400 text-sm">Why is this important to you?</div>
      <div>
        <button class="" @click="toggleEditState()">
          <PencilIcon v-if="this.panel.description" class="h-4 w-4 text-gray-400 hover:text-np-base" />
          <PlusIcon v-else class="h-5 w-5 text-gray-400 hover:text-np-base" />
        </button>
      </div>
    </div>


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
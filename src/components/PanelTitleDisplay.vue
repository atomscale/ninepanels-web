<template >
  <div class="flex-col mb-4">

    <div class="flex justify-between items-center">
      <div class="text-xs font-semibold h-5 text-gray-500">Panel</div>
      <div>

        <button class="ml-4 mr-2" @click="toggleEditState()">
          <PencilIcon class="h-4 w-4 text-gray-400 " />
        </button>
      </div>
    </div>

    <div class="text-2xl font-bold w-auto">{{ panel.title }}</div>

  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'
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
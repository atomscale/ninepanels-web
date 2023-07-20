<template >
  <div class="flex relative">



    <div class="text-2xl font-bold py-2">{{ panel.title }}</div>

    <button class="absolute right-0 top-4 px-2" @click="toggleEditState()">

      <PencilIcon class="h-4 w-4 text-gray-400 " />
    </button>

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
    // title: {
    //   type: String,
    //   required: true
    // },
    panelId: {
      type: Number,
      required: true
    }
  }

}

</script>
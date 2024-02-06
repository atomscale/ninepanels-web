<template >
  <div class="realtive h-full">

    <div class="flex justify-end items-center mb-2">

      <div class="flex">
        <button class="px-2" @click="dispatchUpdatePanelAction()">
          <CheckIcon class="h-5 w-5 text-gray-400 hover:text-np-base" />
        </button>
        <button class="ml-2" @click="toggleEditState()">
          <XMarkIcon class="h-5 w-5 text-gray-400 hover:text-np-base" />
        </button>
      </div>
    </div>

    <div class="flex h-full pb-6">
      <textarea @input="updateLen()" v-model="localDescription" type="text" required="true"
        class="block resize-none  w-full h-full text-np-base bg-np-base appearance-none text-sm rounded-md border border-np-base px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
    </div>
  </div>
</template>

<script>

import { useMainStore } from '@/stores/store.js'
import { usePanelStore } from "@/stores/panelStore.js"

import { mapStores } from 'pinia'

import {
  XMarkIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useMainStore, usePanelStore),
    panel() {
      const panelFromStore = this.panelStore.panels.find(panel => panel.id === this.panelId)
      if (panelFromStore.description) {
        this.currentFieldLen = panelFromStore.description.length
      } else {
        this.currentFieldLen = 0
      }

      return { ...panelFromStore }
    }
  },
  methods: {
    toggleEditState() {
      this.mainStore.panelDescEditState = !this.mainStore.panelDescEditState
    },
    async dispatchUpdatePanelAction() {
      try {
        await this.panelStore.updatePanelAction(this.panelId, { description: this.localDescription })
        this.mainStore.panelDescEditState = false
      } catch (error) {
        this.mainStore.panelDescEditState = false
      }
    },
    updateLen() {
      this.currentFieldLen = this.localDescription.length
    }
  },
  mounted() {
    if (this.description === this.panel.description) {

      this.localDescription = this.description
    } else {
      this.localDescription = this.panel.description
    }
  },
  data() {
    return {
      localDescription: '',
      maxFieldLen: 300,
      currentFieldLen: null
    }
  },
  components: {
    XMarkIcon,
    CheckIcon
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
  },

}

</script>
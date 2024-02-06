<template >
  <div class="flex justify-end items-center mb-2">

    <div class="flex ">
      <button class="px-2" @click="dispatchUpdatePanelAction()">
        <CheckIcon class="h-5 w-5 text-gray-400 hover:text-np-base " />
      </button>
      <button class="ml-2" @click="toggleEditState()">
        <XMarkIcon class="h-5 w-5 text-gray-400 hover:text-np-base" />
      </button>
    </div>
  </div>


  <textarea @input="updateLen()" v-model="this.localTitle" type="text" required="true" :maxlength="maxFieldLen"
    class="block resize-none  h-auto w-full bg-np-base text-np-base appearance-none rounded-md border border-np-base px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />


  <div class="text-xs mt-1 mb-4 ml-2" :class="currentFieldLen === maxFieldLen ? 'text-red-900' : 'text-np-base'"> {{
    currentFieldLen }}/{{
    maxFieldLen }}</div>
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
      if (panelFromStore.title) {
        this.currentFieldLen = panelFromStore.title.length
      } else {
        this.currentFieldLen = 0
      }
      return { ...panelFromStore }
    }
  },
  methods: {
    toggleEditState() {
      this.mainStore.panelTitleEditState = !this.mainStore.panelTitleEditState
    },
    async dispatchUpdatePanelAction() {
      if (this.localTitle.length === 0) {
        this.mainStore.showMessage("Please make sure your panel has a title.")
        return
      } else {
        await this.panelStore.updatePanelAction(this.panelId, { title: this.localTitle })
        this.mainStore.panelTitleEditState = false
      }
    },
    updateLen() {
      this.currentFieldLen = this.localTitle.length
    }
  },
  data() {
    return {
      localTitle: '',
      maxFieldLen: 65,
      currentFieldLen: null
    }
  },
  mounted() {
    if (this.title === this.panel.title) {

      this.localTitle = this.title
    } else {
      this.localTitle = this.panel.title
    }
  },
  components: {
    XMarkIcon,
    CheckIcon
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
  },

}

</script>
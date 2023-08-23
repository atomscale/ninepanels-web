<template >
  <div class="flex justify-between items-center mb-2 h-5">
    <div class="text-xs font-semibold text-gray-500">About</div>
    <div class="flex ">
      <button class="px-2" @click="dispatchUpdatePanelAction()">
        <CheckIcon class="h-5 w-5 text-gray-400 " />
      </button>
      <button class="ml-2" @click="toggleEditState()">
        <XMarkIcon class="h-5 w-5 text-gray-400 " />
      </button>
    </div>
  </div>

  <div class="flex h-auto">
    <textarea @input="updateLen()" v-model="panel.description" type="text" required="true" :maxlength="maxFieldLen"
      class="block resize-none h-80 w-full appearance-none text-sm rounded-md border border-gray-200 px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
  </div>


  <div class="text-xs mt-1" :class="currentFieldLen === maxFieldLen ? 'text-red-900' : 'text-gray-400'"> {{
    currentFieldLen }}/{{
    maxFieldLen }}
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'
import {
  XMarkIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

export default {
  computed: {
    ...mapStores(useStore),
    panel() {
      const panel = this.Store.panels.find(panel => panel.id === this.panelId)
      if (panel.description) {
        this.currentFieldLen = panel.description.length
      } else {
        this.currentFieldLen = 0
      }

      return { ...panel }
    }
  },
  methods: {
    toggleEditState() {
      this.Store.panelDescEditState = !this.Store.panelDescEditState
    },
    async dispatchUpdatePanelAction() {
      try {
        NProgress.start()
        await this.Store.updatePanelAction(this.panelId, { description: this.panel.description })
        this.Store.panelDescEditState = false
        NProgress.done()
      } catch (error) {
        this.Store.messages.push({ message: "title not updated" })
        setTimeout(() => this.Store.messages.pop, 5000)
        this.Store.panelDescEditState = false
        NProgress.done()
      }
    },
    updateLen() {
      this.currentFieldLen = this.panel.description.length
    }
  },
  data() {
    return {
      maxFieldLen: 300,
      currentFieldLen: null
    }
  },
  components: {
    XMarkIcon,
    CheckIcon
  },
  props: {
    panelId: {
      type: Number,
      required: true
    }
  },

}

</script>
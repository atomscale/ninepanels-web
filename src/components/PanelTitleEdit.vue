<template >
  <div class="flex justify-between items-center mb-2">
    <div class="data-heading">Panel</div>
    <div class="flex ">
      <button class="px-2" @click="dispatchUpdatePanelAction()">
        <CheckIcon class="h-5 w-5 text-gray-400 hover:text-gray-500 " />
      </button>
      <button class="ml-2" @click="toggleEditState()">
        <XMarkIcon class="h-5 w-5 text-gray-400 hover:text-gray-500" />
      </button>
    </div>
  </div>


  <textarea @input="updateLen()" v-model="this.localTitle" type="text" required="true" :maxlength="maxFieldLen"
    class="block resize-none text-gray-600 h-auto w-full appearance-none rounded-md border border-gray-200 px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />


  <div class="text-xs mt-1 mb-4" :class="currentFieldLen === maxFieldLen ? 'text-red-900' : 'text-gray-400'"> {{
    currentFieldLen }}/{{
    maxFieldLen }}</div>
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
      const panelFromStore = this.Store.panels.find(panel => panel.id === this.panelId)
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
      this.Store.panelTitleEditState = !this.Store.panelTitleEditState
    },
    async dispatchUpdatePanelAction() {
      if (this.localTitle.length === 0) {
        this.Store.messages.push({ message: "Please make sure your panel has a title.", error: true })
        setTimeout(() => this.Store.messages.shift(), 5000)
        return
      } else {

        NProgress.start()
        await this.Store.updatePanelAction(this.panelId, { title: this.localTitle })
        this.Store.panelTitleEditState = false
        NProgress.done()
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
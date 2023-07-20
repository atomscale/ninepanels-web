<template >
  <div class="flex h-auto">



    <textarea @input="updateLen()" v-model="panel.title" id="password" name="password" type="text"
      :placeholder="panel.title" required="true" :maxlength="maxFieldLen"
      class="block resize-none h-auto w-full appearance-none rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />


    <div class="flex ">

      <button class=" top-3 px-2" @click="dispatchUpdatePanelAction()">

        <CheckIcon class="h-5 w-5 text-gray-400 " />
      </button>
      <button class=" top-3 px-2" @click="toggleEditState()">

        <XMarkIcon class="h-5 w-5 text-gray-400 " />
      </button>
    </div>
  </div>
  <div class="text-xs mt-1" :class="currentFieldLen === 50 ? 'text-red-900' : 'text-gray-400'"> {{ currentFieldLen }}/{{
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
      const panel = this.Store.panels.find(panel => panel.id === this.panelId)
      this.currentFieldLen = panel.title.length
      return { ...panel }
    }
  },
  methods: {
    toggleEditState() {
      this.Store.panelTitleEditState = !this.Store.panelTitleEditState
    },
    async dispatchUpdatePanelAction() {
      try {
        NProgress.start()
        await this.Store.updatePanelAction(this.panelId, { title: this.panel.title })
        this.Store.panelTitleEditState = false
        NProgress.done()
      } catch (error) {
        this.Store.messages.push({ message: "title not updated" })
        setTimeout(() => this.Store.messages.pop, 5000)
        this.Store.panelTitleEditState = false
        NProgress.done()
      }
    },
    updateLen() {
      this.currentFieldLen = this.panel.title.length
    }
  },
  data() {
    return {
      maxFieldLen: 50,
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
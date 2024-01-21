<template >
  <div class="flex flex-col justify-between h-full pb-4">

    <div>

      <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
        <div>
          <label   class="text-sm font-light h-5 text-np-base">Your panel</label>
          <div class="mt-1">
            <textarea @input="updateLen()" v-model="title" id="title" name="title" type="text" required="true"
              :maxlength="maxTitleLen"
              class="block w-full resize-none text-sm  bg-np-base appearance-none max-w-sm text-np-base rounded-md border border-np-base px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
          </div>
          <div class="text-xs mt-1" :class="currentTitleLen === maxTitleLen ? 'text-red-900' : 'text-np-base'">
            {{ currentTitleLen }}/{{ maxTitleLen }}</div>
        </div>

        <div>
          <label   class="text-sm font-light h-5 text-np-base">About your panel (optional)</label>
          <div class="mt-1">
            <textarea v-model="description" id="description" name="description" type="text"
              class="block w-full h-80 resize-none text-sm bg-np-base text-np-base  appearance-none max-w-sm rounded-md border border-np-base px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
          </div>

        </div>


      </form>
    </div>
    <div>
      <DynamicButton :parentMethod="sendCreatePanel" :buttonText="'Create panel'" :confirmRequired="false" />
    </div>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

import DynamicButton from '@/components/utilities/DynamicButton.vue'


export default {
  computed: {
    ...mapStores(useStore),
  },
  data() {
    return {
      title: '',
      description: '',
      maxTitleLen: 65,
      currentTitleLen: 0,
    }
  },
  methods: {
    async sendCreatePanel() {
      if (this.title.length === 0) {
        return
      } else {
        this.Store.primaryTrayIsOpen = false
        try {
          await this.Store.createPanelAction(this.emptySlotIndex, this.title, this.description)
          this.Store.readPanelConsistencyAction()
        } finally {

          this.Store.primaryComponentName = null
          this.Store.primaryComponentProps = {}
          this.Store.selectedPanel = null
        }
      }
    },
    updateLen() {
      this.currentTitleLen = this.title.length
    }
  },
  components: {
    DynamicButton
  },
  props: {
    emptySlotIndex: {
      type: Number,
      required: true
    }
  }

}

</script>
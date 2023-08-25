<template >
  <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
    <div>
      <label class="block font-light text-xs text-gray-600">Panel title</label>
      <div class="mt-1">
        <textarea @input="updateLen()" v-model="title" id="title" name="title" type="text" required="true"
          :maxlength="maxTitleLen"
          class="block w-full resize-none text-sm appearance-none max-w-sm rounded-md border border-gray-200 px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
      </div>
      <div class="text-xs mt-1" :class="currentTitleLen === maxTitleLen ? 'text-red-900' : 'text-gray-400'">
        {{ currentTitleLen }}/{{ maxTitleLen }}</div>
    </div>

    <div>
      <label class="block font-light text-xs text-gray-600">Description (optional)</label>
      <div class="mt-1">
        <textarea @input="updateLen()" v-model="description" id="description" name="description" type="text"
          required="false" :maxlength="maxDescLen"
          class="block w-full h-80 resize-none text-sm appearance-none max-w-sm rounded-md border border-gray-200 px-2 py-1 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
      </div>
      <div class="text-xs mt-1" :class="currentDescLen === maxDescLen ? 'text-red-900' : 'text-gray-400'">
        {{ currentDescLen }}/{{ maxDescLen }}</div>
    </div>


    <div>
      <button type="submit"
        class="flex justify-center border border-gray-200 rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm"
        @click="sendCreatePanel()">
        Create Panel
      </button>
    </div>
  </form>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'

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
      maxDescLen: 300,
      currentDescLen: 0,

    }
  },
  methods: {
    async sendCreatePanel() {
      if (this.title.length == 0) {
        return
      } else {
        NProgress.start()
        await this.Store.createPanelAction(this.title, this.description)
        NProgress.done()
        this.Store.primaryTrayIsOpen = false
        this.Store.primaryComponentName = null
        this.Store.primaryComponentProps = {}
      }
    },
    updateLen() {
      this.currentTitleLen = this.title.length
      this.currentDescLen = this.description.length
    }
  },
  components: {
  },
  props: {
  }

}

</script>
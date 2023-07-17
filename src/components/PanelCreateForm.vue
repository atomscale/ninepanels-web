<template >
  <form @submit.prevent="onSubmit" class="space-y-4" action="#" method="POST">
    <div>
      <label for="email" class="block font-light text-xs text-gray-800">Title</label>
      <div class="mt-1">
        <input v-model="title" id="title" name="title" type="text" required="true"
          class="block w-full appearance-none max-w-sm rounded-md border border-gray-200 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 " />
      </div>
    </div>



    <div>
      <button type="submit"
        class="flex justify-center border border-gray-200 rounded-md w-full mt-3 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm"
        @click="sendCreatePanel(title)">
        Create Panel
      </button>
    </div>
  </form>
  <!-- <div name="how-to" class="border flex flex-col max-w-sm justify-end ">

    <div class="flex border justify-evenly mt-24 ">
      <div class="flex">
        <div class="h-8 w-8 rounded  bg-gray-500"></div>
        <div class=" ml-2 items-center flex text-xs text-gray-500">= done</div>
      </div>
      <div class="flex">
        <div class="h-8 w-8 rounded  border border-gray-500"></div>
        <div class=" ml-2 items-center flex text-xs text-gray-500">= not done</div>
      </div>
    </div>
  </div> -->
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
      title: ''
    }
  },
  methods: {
    async sendCreatePanel(title) {
      NProgress.start()
      await this.Store.createPanelAction(title)
      NProgress.done()
      this.Store.trayIsOpen = false
      this.Store.componentName = null
      this.Store.componentProps = {}
    }
  },
  components: {
  },
  props: {
  }

}

</script>
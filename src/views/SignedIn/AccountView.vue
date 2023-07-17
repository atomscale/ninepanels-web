<template>
  <div class="flex min-h-full flex-col mx-auto justify-center py-6 sm:px-6 lg:px-8">

    <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-4 px-4  sm:rounded-lg sm:px-10 ">
        <div v-if="this.Store.user">
          <div class="font-light text-sm mt-5">Name</div>
          <div class="font-medium text-xl mt-2">{{ this.Store.user.name }}</div>
          <div class="font-light text-sm mt-5">Email</div>
          <div class="font-medium text-xl mt-2">{{ this.Store.user.email }}</div>
        </div>
        <button type="submit"
          class="flex justify-center mb-4 border border-gray-200 rounded-md w-full mt-8 max-w-sm  py-2 px-4 text-sm bg-gray-800 text-gray-50 hover:bg-white hover:text-gray-600  shadow-sm"
          @click="sendUserDelete(data)">
          Delete account
        </button>

      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'

export default {
  computed: {
    ...mapStores(useStore)
  },
  methods: {
    async sendUserDelete() {
      NProgress.start()
      await this.Store.deleteUserAction()
      NProgress.done()
      this.$router.push('/')
    }
  }
}
</script>

<style>
.main-content {
  height: calc(100vh - 60px);
}
</style>

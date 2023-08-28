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
        <DynamicButton :parentMethod="sendUserDelete" :buttonText="'Delete Account'" :confirmText="'Are you sure?'" />
      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import NProgress from 'nprogress'
import DynamicButton from '@/components/DynamicButton.vue'

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
    },
    async getUserActionMethod() {
      await this.Store.getUserAction()
    }
  },
  created() {
    this.getUserActionMethod()
  },
  components: {
    DynamicButton
  }
}
</script>

<style>
.main-content {
  height: calc(100vh - 60px);
}
</style>

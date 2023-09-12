<template>
  <!-- <div class="flex min-h-full flex-col mx-auto justify-between py-6 sm:px-6 lg:px-8"> -->
  <div class="flex flex-col justify-between h-full px-4 pt-4 ">
    <div class="mt-4 mx-auto w-full">
      <div class="bg-white  ">
        <div v-if="this.Store.user">
          <div class="data-heading">Name</div>
          <div class="font-light text-xl mb-2 text-np-base">{{ this.Store.user.name }}</div>
          <div class="data-heading">Email</div>
          <div class="font-light text-xl mb-2 text-np-base">{{ this.Store.user.email }}</div>
        </div>
      </div>
    </div>
    <DynamicButton class="mb-4" :parentMethod="sendUserDelete" :confirmRequired="true" :buttonText="'Delete Account'" :confirmText="'Are you sure?'" />
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import rollbar from '@/rollbarClient.js'

import DynamicButton from '@/components/utilities/DynamicButton.vue'

export default {
  computed: {
    ...mapStores(useStore)
  },
  methods: {
    async sendUserDelete() {
      this.Store.loadingBar = true
      await this.Store.deleteUserAction()
      this.Store.loadingBar = false
      this.$router.push('/')
    },
    async getUserActionMethod() {
      await this.Store.readUserAction()
    }
  },
  mounted() {
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

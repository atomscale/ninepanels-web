<template>
  <div class="m-4 text-gray-800 flex flex-col justify-between">
    <div v-if="this.mainStore.user">
      <div class="font-light text-sm mt-5">Name</div>
      <div class="font-medium text-xl mt-2">{{ this.mainStore.user.name }}</div>
      <div class="font-light text-sm mt-5">Email</div>
      <div class="font-medium text-xl mt-2">{{ this.mainStore.user.email }}</div>
    </div>
    <button type="submit"
      class="flex justify-center mt-8 mb-8 border border-gray-200 rounded-md w-full max-w-sm  py-2 px-4 text-sm hover:bg-gray-800 text-gray-600 hover:text-gray-50"
      @click="sendUserDelete(data)">
      Delete account
    </button>
  </div>
</template>

<script>

import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
  },
  methods: {
    sendUserDelete() {
      this.mainStore.deleteUserAction()
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
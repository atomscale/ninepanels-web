<template>
  <div class="h-full w-full flex flex-col align-middle items-center overflow-y-scroll overflow-x-hidden">
    <div class="w-full bg-np-fill">

        <Landing :class="mainStore.theme" />

    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import Landing from '@/components/landing/Landing.vue'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
    Landing,
  },
}

</script>


<template>
    <SideNav />
</template>

<script>
import SideNav from '@/components/SideNav.vue'
import ConsoleDataDisplay from '@/components/ConsoleDataDisplay.vue'
import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
    SideNav,
    ConsoleDataDisplay
  }
}
</script>
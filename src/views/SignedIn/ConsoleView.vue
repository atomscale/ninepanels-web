<template>
    <SideNav />
</template>

<script>
import SideNav from '@/components/SideNav.vue'
import DailyPanelFrame from '@/components/DailyPanelFrame.vue'
import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
    SideNav,
    DailyPanelFrame
  }
}
</script>
<template>
    <DailyPanelFrame />
</template>

<script>
import DailyPanelFrame from '@/components/DailyPanelFrame.vue'
import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  components: {
    DailyPanelFrame
  }
}
</script>
<template>
    <DailyPanelFrame />
</template>

<script>
import DailyPanelFrame from '@/components/DailyPanelFrame.vue'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    DailyPanelFrame
  }
}
</script>
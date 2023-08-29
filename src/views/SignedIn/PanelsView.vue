<template>
  <PanelGridFrame />
  <ConsistencyGrid />
</template>

<script>
import PanelGridFrame from '@/components/PanelGridFrame.vue'
import ConsistencyGrid from '@/components/ConsistencyGrid.vue'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    PanelGridFrame,
    ConsistencyGrid
  }
}
</script>
<template>
    <PanelGridFrame />
</template>

<script>
import PanelGridFrame from '@/components/PanelGridFrame.vue'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    PanelGridFrame
  }
}
</script>
<template>
    <PanelFrame />
</template>

<script>
import PanelFrame from '@/components/PanelFrame.vue'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    PanelFrame
  }
}
</script>
<template>
    <div>
        <Panel v-for="panel in mainStore.panels" :key="panel.id" :panel="panel" />
    </div>
</template>

<script>

import { useMainStore } from '@/stores/mainStore.js'
import { mapStores } from 'pinia'
import Panel from '@/components/Panel.vue'

export default {
  computed: {
    ...mapStores(useMainStore)
  },
  created() {
    this.mainStore.getPanels()
  },
  components: {
    Panel,
  }
}

</script>
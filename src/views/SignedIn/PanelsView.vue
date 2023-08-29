<template>
  <PanelGridFrame />
  <ConsistencyGrid />
</template>

<script>
import PanelGridFrame from '@/components/PanelGridFrame.vue'
import ConsistencyGrid from '@/components/ConsistencyGrid.vue'
import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import Welcome from '@/components/Welcome.vue'

export default {
  computed: {
    ...mapStores(useStore)
  },
  components: {
    PanelGridFrame,
    ConsistencyGrid,
    Welcome
  },
  methods: {
    openPrimaryTray() {
      // this.Store.getPanelsAction()
      this.Store.primaryTrayIsOpen = true
      this.Store.primaryComponentName = 'Welcome'
      this.Store.primaryComponentProps = ''
    },
  },
  mounted() {
    if (this.Store.showWelcome) {
      this.openPrimaryTray()
    }
  }
}
</script>
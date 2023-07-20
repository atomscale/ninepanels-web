<template>
  <div class="grid grid-cols-3 gap-1 px-2 py-2 md:px-0 md:w-3/5 mx-auto">
    <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-md">
      <div class="aspect-content">

        <Panel v-if="this.Store.panels[i - 1]" :panel="this.Store.panels[i - 1]" />
        <PanelAdd v-else-if="this.Store.panels.length == (i -1)"/>
        <div v-else class="flex items-center justify-center text-gray-500 border border-dashed border-gray-300 text-sm rounded-md">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import Panel from '@/components/Panel.vue'
import PanelAdd from '@/components/PanelAdd.vue'


export default {
  computed: {
    ...mapStores(useStore),
  },
  created() {
    this.Store.getPanelsAction()
    // this.Store.getEntriesAction()
  },
  components: {
    Panel,
    PanelAdd
  },

}

</script>

<style scoped>
.aspect-content {
  position: relative;
  width: 100%;
}

.aspect-content::before {
  content: "";
  display: block;
  padding-top: 100%;
}

.aspect-content > * {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>
<template>
  <transition name="fade" appear>

    <div class="grid grid-cols-3 gap-2 px-2 pt-2 md:px-0 w-full mx-auto">
      <div v-for="i in 9" :key="i" class="aspect-w-1 aspect-h-1 rounded-lg">
        <div class="aspect-content">

          <Panel v-if="this.Store.panels[i - 1]" :panel="this.Store.panels[i - 1]" />
          <PanelGridAdd v-else-if="this.Store.panels.length == (i - 1)" :slotIndex="(i - 1)" />
          <div v-else
            class="flex items-center justify-center text-np-base border border-dashed border-np-base text-sm rounded-lg">
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>

import { useStore } from '@/stores/store.js'
import { mapStores } from 'pinia'
import Panel from '@/components/panels/grid/Panel.vue'
import PanelGridAdd from '@/components/panels/grid/PanelGridAdd.vue'



export default {
  computed: {
    ...mapStores(useStore),
  },
  mounted() {
    this.Store.readPanelsAction()
  },
  components: {
    Panel,
    PanelGridAdd
  },

}

</script>
